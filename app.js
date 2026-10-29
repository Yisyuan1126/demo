/*
 * VRAM & GPU cost calculator (FastGPU's Hugging Face Space).
 *
 * Runs entirely in the visitor's browser. Two public, keyless reads:
 *   1. the Hugging Face Hub API, for the model's own metadata (parameter count from its safetensors or GGUF
 *      header, its weight format, its task) and, for a GGUF repo, the size of each build it holds;
 *   2. FastGPU's match API (https://fastgpu.co/api/v1/match), which sizes the job and ranks the GPU setups
 *      that hold it at live prices. All sizing is FastGPU's, so this page and fastgpu.co never disagree.
 * The model list (catalog.js with the page, catalog-more.js right after the first answer) only powers search
 * and quick picks; every selection is re-read live. A name the list does not hold is searched on the Hub.
 */
(function () {
  "use strict";

  const SITE = "https://fastgpu.co";
  const API = SITE + "/api/v1/match";
  const GPUS_API = SITE + "/api/v1/gpus";
  const HUB = "https://huggingface.co";
  const SPACE_PAGE = HUB + "/spaces/fastgpu/vram-and-gpu-cost-calculator";
  const UTM = { utm_source: "huggingface", utm_medium: "space", utm_campaign: "gpu-cost-calculator" };
  const DEFAULT_MODEL = "Qwen/Qwen3-32B";
  const PICKS = window.FASTGPU_PICKS || [];
  const CATALOG = (window.FASTGPU_CATALOG || []).map(function (r) {
    return { id: r[0], p: r[1], task: r[2], dl: r[3], q: r[4], low: r[0].toLowerCase() };
  });
  const BY_ID = new Map(CATALOG.map(function (m) { return [m.low, m]; }));
  const MORE_JOBS = ["inference", "generate", "transcribe", "embed"];
  // The rest of the list arrives most-downloaded first without a downloads column, and every row in it has
  // fewer downloads than the rows above, so its place in the file ranks it (a negative, falling "dl").
  function addModels(rows) {
    (rows || []).forEach(function (r, i) {
      const low = r[0].toLowerCase();
      if (BY_ID.has(low)) return;
      const m = { id: r[0], p: r[1], task: MORE_JOBS[r[2]] || "inference", dl: -1 - i, q: r[3] || null, low: low };
      CATALOG.push(m);
      BY_ID.set(low, m);
    });
  }

  const TASKS = {
    inference: "Run / serve it",
    "finetune-lora": "Fine-tune with LoRA",
    "finetune-full": "Full fine-tune",
    generate: "Generate images or video",
    transcribe: "Transcribe speech",
    embed: "Embed text",
  };
  const PIPELINE_TASK = {
    "text-generation": "inference", "image-text-to-text": "inference", "any-to-any": "inference",
    "text2text-generation": "inference", "visual-question-answering": "inference", "text-to-speech": "inference",
    "text-to-image": "generate", "image-to-image": "generate", "text-to-video": "generate", "image-to-video": "generate",
    "automatic-speech-recognition": "transcribe",
    "feature-extraction": "embed", "sentence-similarity": "embed", "text-ranking": "embed",
  };
  const PRECISION_TEXT = { fp16: "16-bit", int8: "8-bit", int4: "4-bit" };
  const BYTES = { fp16: 2, int8: 1, int4: 0.5 };

  const $ = function (id) { return document.getElementById(id); };
  const el = {
    form: $("calc"), input: $("model"), list: $("suggestions"), picks: $("picks"),
    task: $("task"), prec: $("precision"), region: $("region"), spot: $("spot"),
    out: $("result"), status: $("status"),
  };

  const state = {
    sel: null,        // { id, paramsB, paramsSource, bits, format, pipeline, gated, builds } or { size: N }
    result: null,     // last match API answer
    sort: "price",
    gpuMemory: null,  // { "H100 SXM": 80, ... } from FastGPU's GPU list
    seq: 0,           // request counter, so a slow answer never overwrites a newer one
    active: -1,       // highlighted suggestion
    options: [],
    hubSeq: 0,        // Hub search counter, so a late answer never lands on newer text
    hubTimer: null,
  };

  // ---------------------------------------------------------------- helpers
  function link(url) {
    const u = new URL(url, SITE);
    if (u.hostname.endsWith("fastgpu.co")) Object.keys(UTM).forEach(function (k) { u.searchParams.set(k, UTM[k]); });
    return u.toString();
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }
  function usd(n) {
    if (n == null || !isFinite(n)) return "n/a";
    const digits = n < 100 ? 2 : 0;
    return "$" + n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }
  function gb(n) {
    if (n >= 100) return Math.round(n).toLocaleString("en-US");
    if (n >= 1) return n.toFixed(1).replace(/\.0$/, "");
    return n.toFixed(2).replace(/0$/, "");
  }
  // The parameter count as shown (32.76 -> 32.8), so every figure derived on screen uses the number on screen.
  function shownParams(p) {
    if (p >= 1000) return Math.round(p / 10) * 10;
    if (p >= 10) return Math.round(p * 10) / 10;
    return Math.round(p * 100) / 100;
  }
  function sizeText(p) {
    const v = shownParams(p);
    return v >= 1000 ? (v / 1000).toString() + "T" : v.toString() + "B";
  }
  function ago(iso) {
    const t = Date.parse(iso);
    if (!isFinite(t)) return null;
    const min = Math.max(0, Math.round((Date.now() - t) / 60000));
    if (min < 1) return "just now";
    if (min < 60) return min + " min ago";
    const h = Math.round(min / 60);
    return h + (h === 1 ? " hour ago" : " hours ago");
  }
  function timeout(ms) {
    const c = new AbortController();
    setTimeout(function () { c.abort(); }, ms);
    return c.signal;
  }
  async function getJson(url, ms) {
    const r = await fetch(url, { signal: timeout(ms) });
    if (!r.ok) {
      const e = new Error("HTTP " + r.status);
      e.status = r.status;
      throw e;
    }
    return r.json();
  }

  // The total size a repo name states ("Qwen3-30B-A3B" -> 30), skipping the active ("A3B") and expert ("8x7B") forms.
  function nameSizeB(id) {
    const name = (id.split("/").pop() || "").replace(/_/g, "-");
    const m = name.match(/(?<![\w.])(\d+(?:\.\d+)?)[Bb](?![a-zA-Z0-9])/);
    return m ? parseFloat(m[1]) : null;
  }

  // Bits the published weights are stored at (4 or 8), from the repo's quantization config, its tensors, or its name.
  function weightBits(meta, id) {
    const qc = (meta.config && meta.config.quantization_config) || {};
    const method = String(qc.quant_method || "").toLowerCase();
    if (["awq", "gptq", "hqq", "aqlm", "quark"].indexOf(method) >= 0) return (qc.bits || qc.w_bit || qc.nbits) === 8 ? 8 : 4;
    if (method === "bitsandbytes") return qc.load_in_4bit ? 4 : qc.load_in_8bit ? 8 : null;
    if (method === "mxfp4" || method === "nvfp4") return 4;
    if (["fp8", "fbgemm_fp8", "eetq"].indexOf(method) >= 0) return 8;
    if (method === "compressed-tensors") {
      const bits = Object.values(qc.config_groups || {}).map(function (g) { return g && g.weights && g.weights.num_bits; }).filter(Boolean);
      if (bits.length) { const b = Math.min.apply(null, bits); if (b === 4 || b === 8) return b; }
    }
    const top = dominantDtype(meta);
    if (top && top.indexOf("F8") === 0) return 8;
    if (/(^|[-_./])(fp16|f16|bf16|fp32|f32)([-_./]|$)/i.test(id)) return null;
    if (meta.gguf && !meta.safetensors) return 4;
    const n = id.toLowerCase();
    if (/(^|[-_./])(4bit|4-bit|int4|w4a16|awq|gptq|nf4|mxfp4|nvfp4|q4)/.test(n)) return 4;
    if (/(^|[-_./])(8bit|8-bit|int8|w8a8|w8a16|fp8)/.test(n)) return 8;
    return null;
  }
  function dominantDtype(meta) {
    const p = meta.safetensors && meta.safetensors.parameters;
    if (!p) return null;
    let best = null;
    Object.keys(p).forEach(function (k) { if (!best || p[k] > p[best]) best = k; });
    return best;
  }
  function formatName(meta, bits) {
    const qc = (meta.config && meta.config.quantization_config) || {};
    const method = String(qc.quant_method || "").toUpperCase();
    if (meta.gguf && !meta.safetensors) return "GGUF";
    if (method && method !== "COMPRESSED-TENSORS" && method !== "BITSANDBYTES") return method + (bits ? " " + bits + "-bit" : "");
    if (bits) return bits + "-bit";
    const top = dominantDtype(meta);
    return top || null;
  }

  // ---------------------------------------------------------------- GGUF builds
  // A GGUF repo holds one file (or one set of split files) per build: Q4_K_M, Q5_K_M, Q8_0... Each has its
  // own size, and that size is the weights a GPU has to hold, so a GGUF repo is sized from the build's file
  // rather than from a nominal bit count (a "4-bit" Q4_K_M stores close to 5 bits per parameter).
  const BUILD_TOKEN = /(?:^|[-_.])((?:I?Q\d+(?:_[A-Z0-9]+)*)|BF16|FP?16|FP?32)(?=[-_.]|$)/i;
  // The build most people load, then the nearest ones, when the visitor has not picked.
  const BUILD_PREFERENCE = ["Q4_K_M", "Q4_K_S", "Q4_0", "Q4_K_L", "Q4_K_XL", "IQ4_XS", "Q5_K_M", "Q5_K_S", "Q3_K_M", "Q6_K", "Q8_0"];
  const STORED_BITS = [1, 40]; // what a published weight file can hold per parameter; FastGPU's API checks the same range
  function ggufBuilds(files, paramsB) {
    const byFile = new Map();
    (files || []).forEach(function (f) {
      if (!f || f.type !== "file" || !/\.gguf$/i.test(f.path)) return;
      const parts = f.path.split("/");
      const name = parts.pop().replace(/\.gguf$/i, "");
      if (/mmproj|imatrix|vocab|tokenizer/i.test(name)) return; // projectors and calibration data, not weights
      const base = name.replace(/-\d{5}-of-\d{5}$/, "");        // a split build is one build
      const token = (base.match(BUILD_TOKEN) || parts.join("/").match(BUILD_TOKEN) || [])[1];
      if (!token) return;
      const key = parts.join("/") + "/" + base;
      const size = (f.lfs && f.lfs.size) || f.size || 0;
      const b = byFile.get(key) || { quant: token.toUpperCase(), file: base, bytes: 0 };
      b.bytes += size;
      byFile.set(key, b);
    });
    // Keep the builds that can be this model's weights (another model's file, or an empty pointer, is not).
    const real = [];
    byFile.forEach(function (b) {
      const gbSize = b.bytes / 1e9;
      const bits = paramsB ? (gbSize * 8) / paramsB : 0;
      if (bits >= STORED_BITS[0] && bits <= STORED_BITS[1]) real.push({ quant: b.quant, file: b.file, gb: gbSize, bits: bits });
    });
    // Two real files with the same build name are two models in one repo: tell them apart by file name.
    const seen = new Map();
    real.forEach(function (b) { seen.set(b.quant, (seen.get(b.quant) || 0) + 1); });
    const out = real.map(function (b) {
      return { key: seen.get(b.quant) > 1 ? b.file : b.quant, quant: b.quant, gb: b.gb, bits: b.bits };
    });
    out.sort(function (a, b) { return a.gb - b.gb; });
    return out.slice(0, 60);
  }
  function defaultBuild(builds) {
    for (let i = 0; i < BUILD_PREFERENCE.length; i++) {
      const hit = builds.find(function (b) { return b.quant === BUILD_PREFERENCE[i]; });
      if (hit) return hit;
    }
    return builds[0] || null;
  }
  function chosenBuild() {
    const s = state.sel;
    if (!s || !s.builds || !s.builds.length || el.prec.value.indexOf("build:") !== 0) return null;
    const key = el.prec.value.slice(6);
    return s.builds.find(function (b) { return b.key === key; }) || null;
  }
  // The "Weights" menu: a GGUF repo's own builds with their sizes, otherwise the precision classes.
  const PRECISION_OPTIONS = el.prec.innerHTML;
  function setWeightOptions(builds, wanted) {
    if (!builds || !builds.length) {
      if (el.prec.getAttribute("data-kind") === "builds") { el.prec.innerHTML = PRECISION_OPTIONS; el.prec.value = "auto"; }
      el.prec.removeAttribute("data-kind");
      return;
    }
    el.prec.innerHTML = builds.map(function (b) {
      return '<option value="build:' + esc(b.key) + '">' + esc(b.key) + " · " + esc(gb(b.gb)) + " GB</option>";
    }).join("");
    el.prec.setAttribute("data-kind", "builds");
    const pick = (wanted && builds.find(function (b) { return b.key.toLowerCase() === wanted.toLowerCase(); })) || defaultBuild(builds);
    el.prec.value = "build:" + pick.key;
  }
  async function readBuilds(id, paramsB) {
    const path = id.split("/").map(encodeURIComponent).join("/");
    try {
      const files = await getJson(HUB + "/api/models/" + path + "/tree/main?recursive=true&expand=false&limit=1000", 8000);
      return ggufBuilds(files, paramsB);
    } catch (e) {
      return []; // the repo is then sized by its parameter count, as a non-GGUF repo is
    }
  }

  // ---------------------------------------------------------------- model metadata
  async function readModel(id) {
    const path = id.split("/").map(encodeURIComponent).join("/");
    const q = ["safetensors", "gguf", "config", "pipeline_tag", "library_name", "gated", "downloads", "likes"]
      .map(function (k) { return "expand[]=" + k; }).join("&");
    const meta = await getJson(HUB + "/api/models/" + path + "?" + q, 8000);
    const total = ((meta.safetensors && meta.safetensors.total) || (meta.gguf && meta.gguf.total) || 0) / 1e9;
    const stated = nameSizeB(meta.id || id);
    let paramsB = null, source = null;
    if (total && stated && total < 0.6 * stated) { paramsB = stated; source = "name"; }
    else if (total) { paramsB = total; source = meta.safetensors && meta.safetensors.total ? "safetensors" : "gguf"; }
    else if (stated) { paramsB = stated; source = "name"; }
    const bits = weightBits(meta, meta.id || id);
    // Builds are read for a repo that is GGUF only, whose size came from its GGUF header (the files then
    // belong to the model that count describes).
    const builds = meta.gguf && !meta.safetensors && source === "gguf" ? await readBuilds(meta.id || id, paramsB) : [];
    return {
      id: meta.id || id,
      paramsB: paramsB,
      paramsSource: source,
      bits: bits,
      format: formatName(meta, bits),
      pipeline: meta.pipeline_tag || null,
      library: meta.library_name || null,
      gated: !!meta.gated,
      builds: builds,
    };
  }

  // ---------------------------------------------------------------- search box
  // "https://huggingface.co/org/name/tree/main" (the address bar of a model page) names the repo org/name.
  const HUB_PAGES = /^(models|spaces|datasets|docs|blog|posts|collections|settings|organizations|new|join|login|pricing|tasks|papers|learn|chat|api)$/i;
  function repoFromText(text) {
    const m = text.trim().match(/^(?:https?:\/\/)?(?:www\.)?(?:huggingface\.co|hf\.co)\/([\w.-]+)\/([\w.-]+)/i);
    return m && !HUB_PAGES.test(m[1]) ? m[1] + "/" + m[2] : null;
  }
  function sizeQuery(text) {
    const m = text.trim().match(/^~?(\d+(?:\.\d+)?)\s*([bt])?(?:\s*(?:params?|parameters?))?$/i);
    if (!m) return null;
    const n = parseFloat(m[1]) * (m[2] && m[2].toLowerCase() === "t" ? 1000 : 1);
    return n >= 0.05 && n <= 5000 ? n : null;
  }
  function suggest(text) {
    const pasted = repoFromText(text);
    if (pasted) text = pasted;
    const t = text.trim().toLowerCase();
    const out = [];
    if (!t) {
      PICKS.forEach(function (id) { const m = BY_ID.get(id.toLowerCase()); if (m) out.push({ kind: "model", m: m }); });
      return out.slice(0, 8);
    }
    const size = sizeQuery(t);
    if (size) out.push({ kind: "size", size: size });
    const words = t.split(/[\s/]+/).filter(Boolean);
    const scored = [];
    for (let i = 0; i < CATALOG.length; i++) {
      const m = CATALOG[i];
      if (!words.every(function (w) { return m.low.indexOf(w) >= 0; })) continue;
      const name = m.low.split("/").pop();
      const score = (m.low === t ? 4 : 0) + (name.indexOf(t) === 0 ? 2 : 0) + (m.low.indexOf(t) >= 0 ? 1 : 0);
      scored.push({ m: m, score: score });
    }
    scored.sort(function (a, b) { return b.score - a.score || b.m.dl - a.m.dl; });
    scored.slice(0, 8).forEach(function (s) { out.push({ kind: "model", m: s.m }); });
    if (/^[\w.-]+\/[\w.-]+$/.test(text.trim()) && !BY_ID.has(t)) out.unshift({ kind: "hub", id: text.trim() });
    else if (pasted && BY_ID.has(t)) { const hit = BY_ID.get(t); return [{ kind: "model", m: hit }]; }
    return out.slice(0, 9);
  }
  // Names the list does not hold are searched on the Hub itself, a moment after typing stops (or at once on
  // Enter). Its answers join the open list under the ones already there; picking one reads that repo like
  // any other. `asked` is set when the visitor pressed Enter with nothing to pick, so an empty answer says so.
  function hubSearch(text, asked) {
    clearTimeout(state.hubTimer);
    const seq = ++state.hubSeq;
    const q = (repoFromText(text) || text).trim();
    if (q.length < 3 || sizeQuery(q) || state.options.filter(function (o) { return o.kind === "model"; }).length >= 8) {
      if (asked) el.status.textContent = "";
      return;
    }
    const none = "Hugging Face has no public model matching " + esc(q) + ". Paste the model's org/name or its page address, or type a size such as 70B.";
    state.hubTimer = setTimeout(function () {
      getJson(HUB + "/api/models?search=" + encodeURIComponent(q) + "&sort=downloads&direction=-1&limit=8", 6000).then(function (rows) {
        if (seq !== state.hubSeq || !Array.isArray(rows)) return;
        if (!asked && document.activeElement !== el.input) return; // the visitor has left the box
        const shown = new Set(state.options.map(function (o) { return (o.kind === "model" ? o.m.id : o.id || "").toLowerCase(); }));
        rows.forEach(function (r) {
          if (!r || !r.id || r.id.indexOf("/") < 0 || shown.has(r.id.toLowerCase()) || state.options.length >= 9) return;
          const known = BY_ID.get(r.id.toLowerCase());
          state.options.push(known ? { kind: "model", m: known } : { kind: "hub", id: r.id, found: true });
          shown.add(r.id.toLowerCase());
        });
        if (!state.options.length) { if (asked) showError(none); return; }
        if (asked) el.status.textContent = "";
        if (state.active < 0) state.active = 0;
        renderSuggestions();
      }).catch(function () {
        // The list already shows what this page knows; only a visitor who asked is told the Hub did not answer.
        if (asked && seq === state.hubSeq) showError("Hugging Face's search did not answer just now. Paste the model's org/name, or type a size such as 70B.");
      });
    }, asked ? 0 : 250);
  }
  function renderSuggestions() {
    const opts = state.options;
    if (!opts.length) { closeSuggestions(); return; }
    el.list.innerHTML = opts.map(function (o, i) {
      const sel = i === state.active ? ' aria-selected="true"' : "";
      if (o.kind === "size") return '<li role="option" id="opt-' + i + '"' + sel + ' data-i="' + i + '"><span class="opt-name">A ' + esc(sizeText(o.size)) + "-parameter model</span><span class=\"opt-meta\">size only</span></li>";
      if (o.kind === "hub") return '<li role="option" id="opt-' + i + '"' + sel + ' data-i="' + i + '"><span class="opt-name">' + esc(o.id) + '</span><span class="opt-meta">' + (o.found ? "on Hugging Face" : "look it up on Hugging Face") + "</span></li>";
      return '<li role="option" id="opt-' + i + '"' + sel + ' data-i="' + i + '"><span class="opt-name">' + esc(o.m.id) + '</span><span class="opt-meta">' + esc(sizeText(o.m.p)) + " · " + esc(TASKS[o.m.task] || o.m.task) + "</span></li>";
    }).join("");
    el.list.hidden = false;
    el.input.setAttribute("aria-expanded", "true");
    el.input.setAttribute("aria-activedescendant", state.active >= 0 ? "opt-" + state.active : "");
  }
  function closeSuggestions() {
    el.list.hidden = true;
    el.input.setAttribute("aria-expanded", "false");
    el.input.removeAttribute("aria-activedescendant");
    state.active = -1;
  }
  function cancelHubSearch() {
    clearTimeout(state.hubTimer);
    state.hubSeq++;
  }
  function choose(o) {
    cancelHubSearch();
    closeSuggestions();
    if (!o) return;
    if (o.kind === "size") { el.input.value = sizeText(o.size) + " model"; selectSize(o.size); return; }
    const id = o.kind === "hub" ? o.id : o.m.id;
    el.input.value = id;
    selectModel(id, true);
  }

  el.input.addEventListener("input", function () {
    state.options = suggest(el.input.value);
    state.active = state.options.length ? 0 : -1;
    renderSuggestions();
    hubSearch(el.input.value);
  });
  el.input.addEventListener("focus", function () {
    state.options = suggest(el.input.value === (state.sel && state.sel.id) ? "" : el.input.value);
    state.active = -1;
    renderSuggestions();
  });
  el.input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (el.list.hidden) { state.options = suggest(el.input.value); }
      const n = state.options.length;
      if (!n) return;
      e.preventDefault();
      state.active = e.key === "ArrowDown" ? (state.active + 1) % n : (state.active - 1 + n) % n;
      renderSuggestions();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (!el.list.hidden && state.active >= 0) { choose(state.options[state.active]); return; }
      const opts = suggest(el.input.value);
      if (opts.length) { choose(opts[0]); return; }
      // Nothing in the list: ask the Hub now and offer what it finds.
      state.options = [];
      el.status.textContent = "Searching Hugging Face…";
      hubSearch(el.input.value, true);
    } else if (e.key === "Escape") {
      closeSuggestions();
    }
  });
  el.list.addEventListener("mousedown", function (e) {
    const li = e.target.closest("li[data-i]");
    if (!li) return;
    e.preventDefault();
    choose(state.options[Number(li.getAttribute("data-i"))]);
  });
  el.input.addEventListener("blur", function () { setTimeout(closeSuggestions, 120); });

  el.picks.innerHTML = PICKS.filter(function (id) { return BY_ID.has(id.toLowerCase()); }).map(function (id) {
    return '<button type="button" class="chip" data-id="' + esc(id) + '">' + esc(id.split("/").pop()) + "</button>";
  }).join("");
  el.picks.addEventListener("click", function (e) {
    const b = e.target.closest("button[data-id]");
    if (!b) return;
    cancelHubSearch();
    el.input.value = b.getAttribute("data-id");
    selectModel(b.getAttribute("data-id"), true);
  });

  [el.task, el.prec, el.region, el.spot].forEach(function (c) {
    c.addEventListener("change", function () { saveHash(); run(); });
  });
  el.form.addEventListener("submit", function (e) { e.preventDefault(); });

  // ---------------------------------------------------------------- selection
  async function selectModel(id, resetTask, wantedBuild) {
    const seq = ++state.seq;
    const known = BY_ID.get(id.toLowerCase());
    setStatus("Reading " + id + " from Hugging Face…");
    let sel;
    try {
      sel = await readModel(id);
    } catch (err) {
      if (seq !== state.seq) return;
      if (known) {
        sel = { id: known.id, paramsB: known.p, paramsSource: "catalog", bits: known.q, format: known.q ? known.q + "-bit" : null, pipeline: null, gated: false };
      } else {
        showError(err && err.status === 404
          ? "Hugging Face has no public model called " + esc(id) + ". Check the spelling, or type a size such as 70B."
          : "Could not read " + esc(id) + " from Hugging Face just now. Try again, or type a size such as 70B.");
        return;
      }
    }
    if (seq !== state.seq) return;
    state.sel = sel;
    if (resetTask) {
      const t = (sel.pipeline && PIPELINE_TASK[sel.pipeline]) || (known && known.task) || "inference";
      el.task.value = t;
      el.prec.value = "auto";
    }
    setWeightOptions(sel.builds, wantedBuild);
    saveHash();
    run();
  }
  function selectSize(size) {
    state.sel = { size: size };
    setWeightOptions(null);
    el.prec.value = el.prec.value || "auto";
    saveHash();
    run();
  }

  function autoPrecision() {
    const s = state.sel;
    if (!s || !s.bits) return undefined;
    return s.bits === 4 ? "int4" : "int8";
  }

  // ---------------------------------------------------------------- match
  async function run() {
    const s = state.sel;
    if (!s) return;
    const seq = ++state.seq;
    const params = new URLSearchParams();
    if (s.id) params.set("model", s.id);
    const paramsB = s.id ? s.paramsB : s.size;
    if (paramsB) params.set("params_b", String(Math.round(paramsB * 100) / 100));
    params.set("task", el.task.value);
    const build = chosenBuild();
    if (build) {
      // The build's size on the Hub is the weights to hold. Its precision class goes with it (the same split
      // FastGPU's API makes: under 6 bits per parameter is a 4-bit class build, under 12 an 8-bit one).
      params.set("weights_gb", String(Math.round(build.gb * 100) / 100));
      params.set("precision", build.bits < 6 ? "int4" : build.bits < 12 ? "int8" : "fp16");
    } else {
      const prec = el.prec.value === "auto" ? autoPrecision() : el.prec.value;
      if (prec) params.set("precision", prec);
    }
    if (el.region.value) params.set("region", el.region.value);
    if (el.spot.checked) params.set("spot", "true");
    if (s.id && !paramsB) {
      showError("The repo " + esc(s.id) + " does not publish a parameter count. Type its size instead, for example 70B.");
      return;
    }
    setStatus("Pricing the GPUs that fit…");
    let res = null;
    try {
      const both = await Promise.all([
        fetch(API + "?" + params.toString(), { signal: timeout(15000) }).then(function (r) {
          return r.json().catch(function () { return null; }).then(function (body) { return { ok: r.ok, body: body }; });
        }),
        loadGpuMemory(),
      ]);
      res = both[0];
    } catch (err) {
      res = null;
    }
    if (seq !== state.seq) return;
    if (res && res.body && (res.ok || res.body.error)) {
      state.result = res.body;
      render();
      return;
    }
    showError("FastGPU's price feed did not answer in time. <button type=\"button\" class=\"linklike\" id=\"retry\">Try again</button>");
    const b = $("retry");
    if (b) b.addEventListener("click", run);
  }
  async function loadGpuMemory() {
    if (state.gpuMemory) return;
    try {
      const d = await getJson(GPUS_API, 10000);
      const map = {};
      (d.gpus || []).forEach(function (g) { if (g.gpu && g.vram_gb) map[g.gpu] = g.vram_gb; });
      state.gpuMemory = map;
    } catch (e) {
      state.gpuMemory = {};
    }
  }

  // ---------------------------------------------------------------- render
  function setStatus(text) {
    el.status.textContent = text;
    el.out.setAttribute("aria-busy", "true");
    el.out.classList.add("loading");
  }
  function showError(html) {
    el.out.classList.remove("loading");
    el.out.removeAttribute("aria-busy");
    el.status.textContent = "";
    el.out.innerHTML = '<div class="notice">' + html + "</div>";
  }

  function needSentence(task, precText, build) {
    if (build && task !== "finetune-full") {
      const what = "its " + build.key + " build";
      return task === "finetune-lora" ? "of GPU memory to fine-tune " + what + " with LoRA" : "of GPU memory to run " + what;
    }
    switch (task) {
      case "finetune-lora": return "of GPU memory to fine-tune it with LoRA at " + precText;
      case "finetune-full": return "of GPU memory for a full fine-tune";
      case "generate": return "of GPU memory to generate with it at " + precText;
      case "transcribe": return "of GPU memory to transcribe with it at " + precText;
      case "embed": return "of GPU memory to embed with it at " + precText;
      default: return "of GPU memory to run it at " + precText;
    }
  }
  function derivation(task, rawParamsB, precision, need, build) {
    const bytes = BYTES[precision];
    const paramsB = shownParams(rawParamsB);
    const weights = build ? build.gb : paramsB * bytes;
    const w = build
      ? "Weights: the " + build.key + " build in this repo is " + gb(build.gb) + " GB (" + gb(build.gb) + " GB × 8 ÷ " + sizeText(paramsB) + " parameters = " + (Math.round(((build.gb * 8) / paramsB) * 100) / 100) + " bits per parameter)."
      : "Weights: " + sizeText(paramsB) + " parameters × " + bytes + (bytes === 1 ? " byte" : " bytes") + " = " + gb(weights) + " GB.";
    const rest = need - weights;
    if (task === "finetune-full") {
      return "Full fine-tuning holds the weights, their gradients and Adam optimizer states, about 16 bytes per parameter (" + sizeText(paramsB) + " × 16 = " + gb(paramsB * 16) + " GB), plus activations.";
    }
    if (rest < 0.5) return w;
    if (task === "inference") return w + " The other ~" + gb(rest) + " GB is the KV cache for one request at a 4K-token context, plus runtime headroom.";
    if (task === "finetune-lora") return w + " The other ~" + gb(rest) + " GB is the LoRA adapters, their optimizer state and activations for a 4K-token batch.";
    if (task === "generate") return w + " The other ~" + gb(rest) + " GB covers the text encoders, VAE and working memory an image or video pipeline loads with it.";
    return w + " The other ~" + gb(rest) + " GB is activations and runtime headroom.";
  }

  function render() {
    const res = state.result;
    const s = state.sel;
    el.out.classList.remove("loading");
    el.out.removeAttribute("aria-busy");
    el.status.textContent = "";
    if (!res || res.error) { showError(esc((res && res.error) || "No answer from FastGPU.")); return; }
    const w = res.workload || {};
    // FastGPU decides the job's kind for a model it knows (an image model is sized as a pipeline), so the
    // sentences follow its answer rather than the menu.
    const task = TASKS[w.task] ? w.task : el.task.value;
    const precision = w.precision || "fp16";
    const precText = PRECISION_TEXT[precision] || precision;
    const paramsB = s.id ? s.paramsB : s.size;
    const need = w.vram_required_gb;
    // The build the answer was sized by: only when FastGPU's answer says it used a measured weights size, so
    // the sentences never describe a sizing the number does not come from.
    const picked = chosenBuild();
    const build = picked && w.weights_gb ? picked : null;

    let head = "";
    if (s.id) {
      const facts = [sizeText(paramsB) + " parameters"];
      if (s.format) facts.push(esc(s.format) + " weights");
      if (s.pipeline) facts.push(esc(s.pipeline));
      const src = { safetensors: "the repo's safetensors metadata", gguf: "the repo's GGUF header", name: "the model's name (the Hub's count of its packed weights is lower)", catalog: "this Space's model list (Hugging Face did not answer just now)" }[s.paramsSource] || "the repo";
      head = '<div class="model"><a class="model-id" href="' + HUB + "/" + esc(s.id) + '" target="_blank" rel="noopener">' + esc(s.id) + "</a>" +
        '<p class="facts">' + facts.join(" · ") + "</p>" +
        '<p class="fineprint">Parameter count from ' + src + "." + (s.library === "mlx" ? " MLX builds run on Apple silicon; sized here as the same model on a rented GPU." : "") + "</p></div>";
    } else {
      head = '<div class="model"><span class="model-id">A ' + esc(sizeText(paramsB)) + "-parameter model</span></div>";
    }

    const needHtml = need
      ? '<div class="need"><p class="need-num"><span class="mono">~' + esc(Math.round(need).toLocaleString("en-US")) + "</span> GB</p>" +
        '<p class="need-what">' + esc(needSentence(task, precText, build)) + "</p>" +
        '<p class="fineprint">' + esc(derivation(task, paramsB, precision, need, build)) +
        ' <a href="' + link(SITE + "/blog/llm-vram-guide") + '" target="_blank" rel="noopener">How much VRAM a model needs, worked through</a>' +
        ' · <a href="' + link(SITE + "/methodology") + '" target="_blank" rel="noopener">How FastGPU sizes and ranks</a></p></div>'
      : "";

    let rows = (res.matches || []).slice();
    if (state.sort === "price") rows.sort(function (a, b) { return a.effective_usd_hr - b.effective_usd_hr; });
    const cheapest = rows.reduce(function (min, r) { return Math.min(min, r.effective_usd_hr); }, Infinity);
    const mem = state.gpuMemory || {};

    let table;
    if (!rows.length) {
      table = '<div class="notice">No GPU setup in FastGPU\'s live feed holds this ' + (need ? "(~" + esc(Math.round(need)) + " GB) " : "") + "right now with these filters. Try 8-bit or 4-bit weights, another region, or include spot capacity.</div>";
    } else {
      table = '<div class="table-head"><h2 id="setups">GPU setups that hold it, priced live</h2>' +
        '<div class="sort" role="group" aria-label="Order">' +
        '<button type="button" data-sort="price" aria-pressed="' + (state.sort === "price") + '">Lowest price</button>' +
        '<button type="button" data-sort="match" aria-pressed="' + (state.sort === "match") + '">Best match</button></div></div>' +
        '<table aria-labelledby="setups"><thead><tr><th scope="col">Setup</th><th scope="col" class="num">Per hour</th><th scope="col" class="num">Per month</th><th scope="col">Provider</th></tr></thead><tbody>' +
        rows.map(function (r) {
          const card = mem[r.gpu];
          const setup = (r.gpu_count > 1 ? r.gpu_count + "× " : "1× ") + r.gpu;
          const sub = (card ? card + " GB " + (r.gpu_count > 1 ? "each, " : "") : "") + (r.fits_single_card ? "fits on one card" : "split across " + r.gpu_count + " cards");
          const kind = [r.offer_type, r.reliability].filter(function (x, i, a) {
            return x && a.findIndex(function (y) { return y && y.toLowerCase() === x.toLowerCase(); }) === i;
          }).join(" · ");
          return "<tr" + (r.effective_usd_hr === cheapest ? ' class="cheapest"' : "") + ">" +
            '<th scope="row"><span class="setup">' + esc(setup) + '</span><span class="sub">' + esc(sub) + "</span></th>" +
            '<td class="num"><a class="price" href="' + link(r.page_url) + '" target="_blank" rel="noopener" title="Every live offer for the ' + esc(r.gpu) + ' on FastGPU">' + esc(usd(r.effective_usd_hr)) + "</a>" +
            (r.effective_usd_hr === cheapest ? '<span class="sub">cheapest</span>' : "") + "</td>" +
            '<td class="num mono">' + esc(usd(r.monthly_usd)) + "</td>" +
            "<td>" + esc(r.provider_label) + (r.partner ? ' <span class="star" title="Pays FastGPU a referral fee">★</span>' : "") +
            // Straight to this offer on the provider's site, through FastGPU's counted redirect (rent_url).
            (r.rent_url ? ' <a class="rent" href="' + esc(r.rent_url.replace(/&src=[a-z]+$/, "&src=hf-space")) + '" target="_blank" rel="sponsored noopener">Rent →</a>' : "") +
            '<span class="sub">' + esc(kind) + "</span></td></tr>";
        }).join("") + "</tbody></table>";
    }

    const fresh = res.updated_at ? ago(res.updated_at) : null;
    const foot = '<p class="fineprint">' +
      (fresh ? "Prices from FastGPU's live feed, refreshed " + esc(fresh) + ". " : "") +
      "Each price is the whole setup per hour (per-GPU rate × GPUs), per month at 730 hours; it links to every live offer for that GPU. " +
      "Best match orders by FastGPU's score, led by price and weighing reliability and availability. Providers marked ★ pay FastGPU a referral fee when you rent from them through FastGPU; that never changes their order here. " +
      "Some providers bill CPU, RAM or disk on top of the GPU rate; the GPU page says which.</p>" +
      '<p class="cta"><a class="button" href="' + link(SITE + "/") + '" target="_blank" rel="noopener">Compare every GPU on FastGPU</a>' +
      '<a href="' + link(SITE + "/gpus") + '" target="_blank" rel="noopener">All live GPU prices</a></p>' +
      '<p class="fineprint thanks">Saved you a search? A like on <a href="' + SPACE_PAGE + '" target="_blank" rel="noopener">this Space</a> helps other people on the Hub find it.</p>';

    el.out.innerHTML = head + needHtml + table + foot;
    el.out.querySelectorAll("button[data-sort]").forEach(function (b) {
      b.addEventListener("click", function () { state.sort = b.getAttribute("data-sort"); render(); });
    });
  }

  // ---------------------------------------------------------------- shareable state
  function saveHash() {
    const s = state.sel;
    if (!s) return;
    const h = new URLSearchParams();
    if (s.id) h.set("model", s.id); else h.set("size", String(s.size));
    if (el.task.value !== "inference") h.set("task", el.task.value);
    if (el.prec.value.indexOf("build:") === 0) h.set("build", el.prec.value.slice(6));
    else if (el.prec.value !== "auto") h.set("precision", el.prec.value);
    if (el.region.value) h.set("region", el.region.value);
    if (el.spot.checked) h.set("spot", "1");
    try { history.replaceState(null, "", "#" + h.toString()); } catch (e) { /* sandboxed frame */ }
  }
  function start() {
    const raw = (location.hash || "").replace(/^#/, "") || (location.search || "").replace(/^\?/, "");
    const h = new URLSearchParams(raw);
    const task = h.get("task");
    if (task && TASKS[task]) el.task.value = task;
    const prec = h.get("precision");
    if (prec && ["fp16", "int8", "int4"].indexOf(prec) >= 0) el.prec.value = prec;
    const region = h.get("region");
    if (region && ["US", "EU", "ASIA"].indexOf(region) >= 0) el.region.value = region;
    el.spot.checked = h.get("spot") === "1";
    const size = h.get("size") ? parseFloat(h.get("size")) : NaN;
    if (isFinite(size) && size > 0) { el.input.value = sizeText(size) + " model"; selectSize(size); return; }
    const model = h.get("model") || DEFAULT_MODEL;
    el.input.value = model;
    // A link that states the job, the weights or the build is opened as it was saved; a bare model link
    // gets the job its kind of model does.
    const build = h.get("build") || undefined;
    selectModel(model, !(task || prec || build), build);
  }
  // The rest of the model list, fetched after the first answer is under way so it never delays it.
  function loadMore() {
    const tag = document.createElement("script");
    tag.src = "catalog-more.js";
    tag.async = true;
    tag.onload = function () {
      addModels(window.FASTGPU_CATALOG_MORE);
      window.FASTGPU_CATALOG_MORE = null;
      if (!el.list.hidden && document.activeElement === el.input) {
        state.options = suggest(el.input.value === (state.sel && state.sel.id) ? "" : el.input.value);
        renderSuggestions();
      }
    };
    document.head.appendChild(tag);
  }
  start();
  loadMore();
})();
