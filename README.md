---
title: VRAM & GPU Cost Calculator
emoji: ⚡
colorFrom: blue
colorTo: indigo
sdk: static
pinned: true
license: mit
short_description: VRAM any HF model needs + live GPU rental prices
tags:
  - vram
  - gpu
  - gpu-prices
  - calculator
  - inference
  - fine-tuning
  - llm
  - cloud-gpu
datasets:
  - fastgpu/cloud-gpu-prices
models:
  - deepseek-ai/DeepSeek-V4.1-Flash-1017
  - moonshotai/Kimi-K3.1-Pro
  - Pika-Labs/Pika-H3-Flex
  - sensenova/SenseNova-Loop-9B-Preview
  - baidu/Unlimited-OCR-2
  - Nanbeige/Nanbeige4.3-33B
  - unsloth/DeepSeek-V4.1-Flash-1017-GGUF
  - microsoft/Mage-VL-Cowork
  - nvidia/DeepSeek-V4.1-Flash-1017-NVFP4
  - ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-Coder-GGUF
  - ccore/Qwen3.5-4B-GLB-3D-Coder
  - Diffuspace/Clover-35B-A3B-Preview
  - RecursiveSI/flint
  - PrunaAI/P-H3-Image
  - ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF
  - Qwen/Qwen3.8-Flash-Next
  - divagr1925/Qwen3.5-4B-Qwenputer
  - unsloth/Qwen3.8-Flash-Next-GGUF
  - nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB
  - XHToken/Spark-X2.6-4B
  - ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF
  - fishaudio/drama-3
  - ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF
  - deepseek-ai/DeepSeek-V4.1-Flash
  - webAI-Official/TwIL-8B
  - prism-ml/Ternary-Bonsai-2-27B-gguf
  - zai-org/GLM-5.3-Flash
  - deep-principle/Hydrogen-1.0
  - Jackrong/Qwopus3.8-27B-Coder-Flash-GGUF
  - moonshotai/Kimi-K3
  - MiniMaxAI/MiniMax-M3.1-Flash
  - sensenova/SenseNova-6.8-Code2Video
  - XHToken/Spark-X2.6-4B-GGUF
  - BreezeBlue/Breeze-TTS-2
  - black-forest-labs/flux-3-image-klein
  - jialinyyzz/humanizer
  - lodestones/chroma-h3
  - summerAIO/Qwen3.8-27B-Longbook27-v2
  - nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16
  - ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-Coder-GGUF
  - Axion1-0/Axion-1.0-35B
  - Apexintelligence-AI/Apex-35B-V1.0
  - GrootTeam/Groot-19B-A3B-261023
  - unsloth/flint-GGUF
  - krea/Krea-2-Raw
  - peculiar-ragdoll/Cyber-Tiel-Coder-35B-A3B-GGUF-MTP
  - HemmingwayAI/Hemmingway-1.5
  - zai-org/GLM-5.3
  - lightx2v/Qwen-Image-2.1-Lightning-v2-RL
  - autotrust/Qwen3.8-Flash-Next-E384-FP4-V2
  - black-forest-labs/FLUX.2-dev
  - Diffuspace/Clover-35B-A3B-Preview-GGUF
  - ConwayResearch/Underdog-Saluki-27B-1.0
  - HuggingFaceBio/Carbon-X
  - ukisai/Swift-1.5-Qwen3.8-27B-GSQ-RCO-GGUF
  - Octen/Octen-WebGR-4B
  - Cloudflare/clef
  - google/gemma-4-E4B-it
  - nvidia/LocateAnything-3B
  - LessThanThreeAI/Gemma-4-31B-Humanlike-Chat-GGUF
  - Jackrong/Qwopus3.8-27B-Coder-Flash
  - ceia-br/lumi-4b
  - OpenMOSS-Team/MOSS-Image-Base
  - Qwen/Qwen3.6-35B-A3B
  - InternScience/Sage-A1.5
  - Qwen/Qwen-Image-2.1-Turbo
  - migtissera/Tess-4.5-27B-GGUF
  - tencent/WeVisOne-VL-4B
  - ornith-ai/Ornith-1.5-9B-GGUF
  - GrootTeam/Groot-19B-A3B-261023-GGUF
  - meta-models/Muse-Glimmer-30B
  - openvivo/BluePixel-Turbo
  - KBlueLeaf/MOSS-Image-heal
  - unsloth/Qwen3.6-35B-A3B-GGUF
  - nvidia/Qwen3.8-Flash-Next-FP4-Local
  - tencent/WeVisCut
  - agentionai/Qwen3.8-Flash-Next-Gyro-GGUF
  - lodestones/Kromoss
  - XHToken/Spark-X2.6-4B-DSpark-GGUF
  - briaai/Fibo-2.0-edit-turbo
  - unsloth/NVIDIA-Nemotron-3.5-Bolt-E4B-GGUF
  - akhaliq/MOSS-Image-SFT-4-steps
  - GroundingPI/GroundAnything-VLM
  - meta-models/Muse-Spark-Open-816B-A42B
  - DavidAU/Qwen3.8-27B-Turbo-Brilliance-50X-Reasoning-Instruct-NEO-MAX-MTP-GGUF
  - nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2
  - abacusai/Smaug-Humanizer
  - empero-ai/Qwythos-9B-Claude-Mythos-5-1M-GGUF
  - reflection/Beam-1.0-501B-A23B
  - paperinstruments/Ultramarine-1-Flash
  - nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4
  - empero-ai/Qwen3.8-35B-A3B-Distill-GGUF
  - baidu/ERNIE-5.5-Flash-Base
  - peculiar-ragdoll/Tiel-Coder-35B-A3B-GGUF-MTP
  - tencent/Hy4-preview
  - unsloth/Qwen3-Coder-30B-A3B-Instruct-GGUF
  - Qwen/Qwen3.8-2.4T-A95B
  - google/gemma-4-12B-it
  - AtomicChat/Ripple-65B-Preview-GGUF
  - MuyaoYuan/LoCo-7B
  - yuxinlu1/gemma-4-12B-agentic-fable5-composer2.5-v2-3.5x-tau2-GGUF
  - ukisai/Swift-1.5-Qwen3.8-27B-GGUF
  - google/gemma-4-26B-A4B-it
  - ukisai/Swift-1.5-GLM-5.3-Flash-GGUF
  - google/gemma-4-E2B-it
  - JetBrains/Mellum2.1-12B-A2.5B-Thinking-MTP
  - Hansda/Mage-VL-Cowork-GGUF
  - empero-ai/Qwen3.8-9B-Distill-GGUF
  - nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-GGUF
  - nvidia/GLM-5.3-Flash-FP4-Local
  - gugujiji/novel-humanize-4b
  - Cloudflare/clef-flash
  - XiaomiMiMo/MiMo-V2.6-Pro-RL
  - ornith-ai/Ornith-1.5-35B-A3B-GGUF
  - AtomicChat/SenseNova-Loop-9B-Preview-GGUF
  - Qwen/Qwen3-Coder-Next
  - LiquidAI/LFM2.5-24B-A2B
  - unsloth/Ornith-1.5-122B-GGUF
  - GrootTeam/Groot-65B-A6B-261023-GGUF
  - unsloth/gemma-4-12b-it-GGUF
  - inclusionAI/Ling-3.1-flash-1019
  - nvidia/Qwen3.8-Flash-Next-NVFP4
  - black-forest-labs/flux-3-image-klein-base
  - ornith-ai/Ornith-1.5-122B
  - bartowski/HemmingwayAI_Hemmingway-1.5-GGUF
  - microsoft/UserLM-2.0
  - unsloth/gemma-4-26B-A4B-it-GGUF
  - briaai/Fibo-2.0-dev
  - kandinskylab/Kandinsky-S2V-1.0-Pro-distill-Diffusers
  - ukisai/Swift-1.5-Qwen3.8-Flash-Next-GSQ-RCO-GGUF
  - yuxinlu1/gemma-4-12B-coder-fable5-composer2.5-v1-GGUF
  - empero-ai/Qwen3.8-35B-A3B-Distill
  - fishaudio/s2-pro
  - ornith-ai/Ornith-1.5-35B-A3B
  - deep-principle/Hydrogen-1.0-MXFP4
  - YTan2000/Qwopus3.8-27B-Coder-Flash-TQ
  - nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16
  - InternScience/Sage-A1.5-Q4_K_M-GGUF
  - RavichandranJ/Dolphin3-Cyber-8B-GGUF
  - Qwen/Qwen2.5-Coder-7B-Instruct-GGUF
  - Wan-AI/Wan2.1-T2V-1.3B
  - speridlabs/iris-3b
  - bosonai/higgs-tts-3-4b
  - MemTensor/MemT-1.0-Nano
  - stabilityai/stable-diffusion-3.5-medium
  - Aleph-Alpha/Kolibri-1
  - google/gemma-4-12B
  - peasantsmith/DeepSeek-V4.1-Flash-1017-Maya-GGUF
  - JetBrains/Mellum2.1-12B-A2.5B-Thinking-GGUF
  - unsloth/Qwen-Image-2.1-Turbo-GGUF
  - inclusionAI/Ling-3.0-tiny
  - AlmawaveLabs/Velvet2-3B
  - Maximilian228/Qwen3.8-Flash-Next-NVFP4-GPTQ-Strata
  - deadbydawn101/RavenX-CyberAgent-Qwen3.6-35B-A3B-Opus-4.7-OpenMythos-Pentester-BugHunter-RATH-GGUF
  - nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-NVFP4
  - inclusionAI/Ling-3.0-flash-Sante
  - divagr1925/Qwen3.5-4B-Qwenputer-Filesystem
  - ibm-granite/granite-4.2-3b
  - HuggingFaceBio/Carbon-X-Base
  - nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4
  - orcarouter/Mistral-Large-4-1T-A52B-GGUF
  - deep-principle/Hydrogen-1.0-NVFP4
  - divagr1925/QwenPU
  - ornith-ai/Ornith-1.5-9B
  - Qwen/Qwen3-4B
  - KRAFTON/Raon-1-mini-preview
  - Lightricks/LTX-2.5-Diffusers
  - unsloth/Qwen-Image-2.1-GGUF
  - Nanbeige/Nanbeige4.3-33B-Base
  - deepseek-ai/DeepSeek-V4-Flash
  - JetBrains/Mellum2.1-12B-A2.5B-Thinking
  - unsloth/GLM-4.7-Flash-GGUF
  - hitsfmdj/Qwen3.8-27B-GGUF-4.2BPW-16GB
  - turintech/Nemotron-3.5-Bolt-E4B-Artemis-GGUF
  - city96/FLUX.1-dev-gguf
  - JuneoAI/Laplace-1-Atlas
  - Qwen/Qwen2.5-3B-Instruct
  - CohereLabs/tiny-aya-global
  - zai-org/GLM-5.2
  - kaitchup/Qwen3.8-27B-SLQ-GGUF
  - abenzerps/Nanbeige4.3-33B-GSQ-RCO-GGUF
  - bartowski/Nanbeige_Nanbeige4.3-33B-GGUF
  - Nanbeige/Nanbeige4.2-3B
  - dphn/Dolphin-Mistral-24B-Venice-Edition
  - inclusionAI/Ling-3.1-flash
  - Wan-AI/Wan2.1-T2V-14B
  - Qwen/Qwen3-8B-GGUF
  - nvidia/Qwen3.8-27B-NVFP4
  - meta-llama/Meta-Llama-3-8B
  - microsoft/Phi-4-mini-instruct
  - z-lab/Qwen3.8-27B-DFlash2
  - agentionai/Qwen3.8-Flash-Next-Gyro-Coder-GGUF
  - AtomicChat/Clover-35B-A3B-Preview-GGUF
  - AtomicChat/Nanbeige4.3-33B-GGUF
  - Qwen/Qwen2.5-Coder-7B-Instruct
  - KRAFTON/Raon-1-mini-preview-gguf
  - DavidAU/LFM2.5-24B-A2B-Turbo-Brilliance-50X-NEO-MAX-Imatrix-GGUF
  - LiquidAI/LFM2.5-8B-A1B
  - deepseek-ai/DeepSeek-V4-Pro
  - HuggingFaceBio/Carbon-X-SFT
---

# VRAM & GPU Cost Calculator

Pick any Hugging Face model, or paste its `org/name` or its page address, and see:

- how much GPU memory it needs to run, fine-tune with LoRA, fully fine-tune, generate, transcribe or embed, at its published precision or at 16, 8 or 4 bits;
- the cheapest GPU setups that hold it (one H100, two A100s, four RTX 4090s...), each priced live across the GPU clouds [FastGPU](https://fastgpu.co/?utm_source=huggingface&utm_medium=space&utm_campaign=gpu-cost-calculator) tracks, with a link to every offer.

It reads each model's own metadata from the Hub (the parameter count in its safetensors or GGUF header, its quantization config) and asks FastGPU's free match API for the sizing and the live prices. Nothing to install, no sign-in. Type a size such as `70B` for a model that is not on the Hub.

## Which models

Any public model on the Hub that publishes a parameter count. The search box lists 13,543 of them: the text, vision-language, image, video, speech and embedding models the Hub counted at 1,000 or more downloads in the 30 days before a build day from 2026-10-11 to 2026-11-05, plus the ones trending on those days. Left out of the list: models too small to need a rented GPU, adult and refusal-stripped fine-tunes, and builds for Apple silicon, CPUs or phones. Anything else is found through the Hub's own search as you type, or by pasting its `org/name`.

## How the memory is sized

The same way as on fastgpu.co, by FastGPU's matcher:

- **Run / serve:** the weights (parameters × bytes per parameter: 2 at 16-bit, 1 at 8-bit, 0.5 at 4-bit), plus the KV cache for one request at a 4K-token context and runtime headroom.
- **Fine-tune with LoRA:** the frozen weights plus the adapters, their optimizer state and activations.
- **Full fine-tune:** about 16 bytes per parameter (weights, gradients and Adam states) plus activations.
- **Image, video, speech and embedding models** FastGPU knows (FLUX, SDXL, Wan, Whisper and more) use a figure for the whole pipeline, text encoders and VAE included.

A quantized repo (AWQ, GPTQ, FP8, NVFP4, bitsandbytes) is sized at the bits it is stored in unless you pick another precision.

A GGUF repo is sized from the build you pick. The Weights menu lists the builds the repo holds (Q4_K_M, Q5_K_M, Q8_0 and so on) with the size of each file on the Hub, and that file is the weights a GPU has to hold: a build called 4-bit stores more than 4 bits per parameter, so sizing it from the name comes out too small. The answer shows the file's size and the bits per parameter it works out to. The full method: [fastgpu.co/methodology](https://fastgpu.co/methodology?utm_source=huggingface&utm_medium=space&utm_campaign=gpu-cost-calculator).

## Where the prices come from

FastGPU collects the GPU rental prices providers publish (marketplaces, neoclouds and hyperscalers) and refreshes them through the day. Each price here is the provider's own per-GPU rate times the number of GPUs in the setup. "Lowest price" (the default) sorts by price alone. "Best match" orders by FastGPU's score, led by price and weighing reliability and availability. Providers that pay FastGPU a referral fee when you rent from them through FastGPU are marked ★; that never changes their order here.

The price history is open: [fastgpu/cloud-gpu-prices](https://huggingface.co/datasets/fastgpu/cloud-gpu-prices) (CC BY 4.0, updated daily).

## Use it from code

```bash
curl "https://fastgpu.co/api/v1/match?model=Qwen/Qwen3-32B&params_b=32.8&task=inference"
```

No key needed. Docs: [fastgpu.co/docs](https://fastgpu.co/docs?utm_source=huggingface&utm_medium=space&utm_campaign=gpu-cost-calculator).
