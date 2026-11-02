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
  - baidu/Unlimited-OCR-2
  - Nanbeige/Nanbeige4.3-33B
  - Pika-Labs/Pika-H3-Flex
  - XHToken/Spark-X2.6-4B
  - RecursiveSI/flint
  - Diffuspace/Clover-35B-A3B-Preview
  - ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF
  - sensenova/SenseNova-Loop-9B-Preview
  - nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB
  - unsloth/DeepSeek-V4.1-Flash-1017-GGUF
  - divagr1925/Qwen3.5-4B-Qwenputer
  - microsoft/Mage-VL-Cowork
  - nvidia/DeepSeek-V4.1-Flash-1017-NVFP4
  - MiniMaxAI/MiniMax-M3.1-Flash
  - Qwen/Qwen3.8-Flash-Next
  - ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF
  - XHToken/Spark-X2.6-4B-GGUF
  - ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF
  - fishaudio/drama-3
  - inclusionAI/Ling-3.1-flash-1019
  - BreezeBlue/Breeze-TTS-2
  - sensenova/SenseNova-6.8-Code2Video
  - deepseek-ai/DeepSeek-V4.1-Flash
  - HuggingFaceBio/Carbon-X
  - InternScience/Sage-A1.5
  - unsloth/flint-GGUF
  - black-forest-labs/flux-3-image-klein
  - moonshotai/Kimi-K3
  - jialinyyzz/humanizer
  - zai-org/GLM-5.3-Flash
  - kaitchup/Qwen3.8-27B-SLQ-GGUF
  - GrootTeam/Groot-19B-A3B-261023
  - peculiar-ragdoll/Cyber-Tiel-Coder-35B-A3B-GGUF-MTP
  - Cloudflare/clef
  - prism-ml/Ternary-Bonsai-2-27B-gguf
  - gugujiji/novel-humanize-4b
  - unsloth/NVIDIA-Nemotron-3.5-Bolt-E4B-GGUF
  - GroundingPI/GroundAnything-VLM
  - tencent/WeVisOne-VL-4B
  - ConwayResearch/Underdog-Saluki-27B-1.0
  - ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-Coder-GGUF
  - MemTensor/MemT-1.0-Nano
  - OpenMOSS-Team/MOSS-Image-Base
  - zai-org/GLM-5.3
  - ukisai/Swift-1.5-Qwen3.8-27B-GSQ-RCO-GGUF
  - Apexintelligence-AI/Apex-35B-V1.0
  - agentionai/Qwen3.8-Flash-Next-Gyro-GGUF
  - nvidia/Qwen3.8-Flash-Next-NVFP4
  - Octen/Octen-WebGR-4B
  - krea/Krea-2-Raw
  - unsloth/Qwen3.8-Flash-Next-GGUF
  - briaai/Fibo-2.0-dev
  - reflection/Beam-1.0-501B-A23B
  - HemmingwayAI/Hemmingway-1.5
  - Qwen/Qwen-Image-2.1-Turbo
  - black-forest-labs/FLUX.2-dev
  - baidu/Unlimited-OCR
  - google/gemma-4-E4B-it
  - nvidia/Qwen3.8-Flash-Next-FP4-Local
  - lodestones/Kromoss
  - summerAIO/Qwen3.8-27B-Longbook27-v2
  - empero-ai/Qwythos-9B-Claude-Mythos-5-1M-GGUF
  - nvidia/LocateAnything-3B
  - lodestones/chroma-h3
  - meta-models/Muse-Spark-Open-816B-A42B
  - Qwen/Qwen3.6-35B-A3B
  - Nanbeige/Nanbeige4.3-33B-Base
  - AtomicChat/Nanbeige4.3-33B-GGUF
  - KRAFTON/Raon-1-mini-preview
  - briaai/Fibo-2.0-edit-turbo
  - BAAI/AREX-2
  - unsloth/Qwen3.6-35B-A3B-GGUF
  - ornith-ai/Ornith-1.5-122B
  - MemTensor/MemT-1.0-Flash
  - peculiar-ragdoll/Tiel-Coder-35B-A3B-GGUF-MTP
  - Jackrong/Qwopus3.8-27B-Coder-Flash-GGUF
  - migtissera/Tess-4.5-27B-GGUF
  - DavidAU/Qwen3.8-27B-Turbo-Brilliance-50X-Reasoning-Instruct-NEO-MAX-MTP-GGUF
  - LessThanThreeAI/Gemma-4-31B-Humanlike-Chat-GGUF
  - Diffuspace/Clover-35B-A3B-Preview-GGUF
  - unsloth/MiniMax-M3.1-Flash-GGUF
  - abenzerps/Nanbeige4.3-33B-GSQ-RCO-GGUF
  - ornith-ai/Ornith-1.5-9B-GGUF
  - Cloudflare/clef-flash
  - ccore/Qwen3.5-4B-GLB-3D-Coder
  - black-forest-labs/flux-3-image-klein-base
  - paperinstruments/Ultramarine-1-Flash
  - GrootTeam/Groot-19B-A3B-261023-GGUF
  - unsloth/Qwen3-Coder-30B-A3B-Instruct-GGUF
  - tencent/WeVisCut
  - ornith-ai/Ornith-1.5-35B-A3B
  - yuxinlu1/gemma-4-12B-agentic-fable5-composer2.5-v2-3.5x-tau2-GGUF
  - fastino/GLiDE
  - bartowski/Nanbeige_Nanbeige4.3-33B-GGUF
  - nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4
  - nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2
  - Qwen/Qwen3.8-2.4T-A95B
  - akhaliq/MOSS-Image-SFT-4-steps
  - ceia-br/lumi-4b
  - Jackrong/Qwopus3.8-27B-Coder-Flash
  - inclusionAI/Ling-3.0-flash-Sante
  - meta-models/Muse-Glimmer-30B
  - unsloth/Ornith-1.5-122B-GGUF
  - Aleph-Alpha/Kolibri-1
  - InternScience/Sage-A1.5-Q4_K_M-GGUF
  - JetBrains/Mellum2.1-12B-A2.5B-Thinking-GGUF
  - abacusai/Smaug-Humanizer
  - LiquidAI/LFM2.5-24B-A2B
  - google/gemma-4-26B-A4B-it
  - datalab-to/chandra-ocr-2
  - peculiar-ragdoll/Cyber-Tiel-Coder-35B-A3B-GGUF
  - inclusionAI/LBS-27B
  - Qwen/Qwen3-Coder-Next
  - XHToken/Spark-X2.6-4B-DSpark-GGUF
  - empero-ai/Qwen3.8-35B-A3B-Distill-GGUF
  - lodestones/Chroma1-HD
  - ukisai/Swift-1.5-Qwen3.8-27B-GGUF
  - peculiar-ragdoll/Tiel-Coder-35B-A3B-GGUF
  - unsloth/Qwen3.5-9B-GGUF
  - XiaomiMiMo/MiMo-V2.6-Pro-RL
  - Nanbeige/Nanbeige4.2-3B
  - stabilityai/stable-diffusion-3.5-medium
  - google/gemma-4-12B-it
  - ibm-granite/granite-switch-4.1-30b
  - GrootTeam/Groot-65B-A6B-261023
  - KRAFTON/Raon-1-mini-preview-gguf
  - google/gemma-4-E2B-it
  - agentionai/Qwen3.8-Flash-Next-Gyro-Coder-GGUF
  - ornith-ai/Ornith-1.5-35B-A3B-GGUF
  - empero-ai/Qwen3.8-9B-Distill-GGUF
  - XingChen-AGI/Xing4.0-29B-Intent
  - Aratako/Drama-3-Japanese
  - unsloth/Qwen-Image-2.1-GGUF
  - fishaudio/s2-pro
  - Qwen/Qwen2.5-Coder-7B-Instruct-GGUF
  - inclusionAI/Ling-3.1-flash-base
  - bartowski/HemmingwayAI_Hemmingway-1.5-GGUF
  - empero-ai/Qwen3.8-35B-A3B-Distill
  - RavichandranJ/Dolphin3-Cyber-8B-GGUF
  - ibm-granite/granite-switch-4.1-8b
  - inclusionAI/Ling-3.0-tiny
  - unsloth/Qwen-Image-2.1-Turbo-GGUF
  - deepseek-ai/DeepSeek-V4-Flash
  - Qwen/Qwen3-8B-GGUF
  - Lightricks/LTX-2.5-Diffusers
  - Maximilian228/Qwen3.8-Flash-Next-NVFP4-GPTQ-Strata
  - yuxinlu1/gemma-4-12B-coder-fable5-composer2.5-v1-GGUF
  - speridlabs/iris-3b
  - microsoft/UserLM-2.0
  - JetBrains/Mellum2.1-12B-A2.5B-Thinking-MTP
  - NousResearch/Hermes-3-Llama-3.1-8B
  - meta-llama/Llama-3.2-3B
  - peasantsmith/DeepSeek-V4.1-Flash-1017-Maya-GGUF
  - AtomicChat/Clover-35B-A3B-Preview-GGUF
  - nvidia/NLD-Uni
  - divagr1925/Qwen3.5-4B-Qwenputer-Filesystem
  - LessThanThreeAI/Qwen3.8-27B-Humanlike-Chat-GGUF
  - unsloth/GLM-4.7-Flash-GGUF
  - google/gemma-4-12B
  - Wan-AI/Wan2.1-T2V-1.3B
  - HuggingFaceBio/Carbon-X-Base
  - empero-ai/Qwythos-9B-Claude-Mythos-5-1M
  - XHToken/Spark-X2.6-4B-Base
  - nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4
  - SuperLogic/Qwen3.8-27B-Flash-MTP-GGUF
  - nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16
  - DavidAU/LFM2.5-24B-A2B-Turbo-Brilliance-50X-NEO-MAX-Imatrix-GGUF
  - ibm-granite/granite-4.2-3b
  - nvidia/Qwen3.8-27B-NVFP4
  - nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16
  - tencent/Hy-Memory-30B-A3B
  - google/gemma-4-E4B
  - zai-org/GLM-5.2
  - unsloth/GLM-5.3-Flash-GGUF
  - microsoft/Sentiment-Analysis-7B
  - stabilityai/stable-video-diffusion-img2vid-xt-1-1
  - JetBrains/Mellum2.1-12B-A2.5B-Thinking
  - black-forest-labs/FLUX.2-klein-base-9B
  - LiquidAI/LFM2.5-8B-A1B
  - ProCreations/Nanbeige4.3-33B-DFlash2
  - ornith-ai/Ornith-1.5-9B
  - ornith-ai/Ornith-1.5-122B-NVFP4
  - deepseek-ai/DeepSeek-V4-Pro
  - Qwen/Qwen2.5-Coder-32B-Instruct
  - LiquidAI/LFM2.5-24B-A2B-GGUF
  - deadbydawn101/RavenX-CyberAgent-Qwen3.6-35B-A3B-Opus-4.7-OpenMythos-Pentester-BugHunter-RATH-GGUF
  - hitsfmdj/Qwen3.8-27B-GGUF-4.2BPW-16GB
  - LibertAIDAI/DeepSeek-V4.1-Flash-1017-EXL3-2.9bpw
  - abenzerps/Nemotron-3.5-Bolt-E4B-GSQ-RCO-GGUF
  - DavidAU/LFM2.5-8B-A1B-Qwen3.8-Turbo-Brilliance-Power-X12-NEO-MAX-GGUF
  - dphn/Dolphin-Mistral-24B-Venice-Edition
  - HemmingwayAI/Hemmingway-1
  - hirundo-io/Qwen3-Coder-30B-A3B-Instruct-Westernized
  - HuggingFaceBio/Carbon-X-SFT
  - IFM/K2-Horizon-3.7B-GGUF
  - inclusionAI/Ling-3.1-flash
  - Wan-AI/Wan2.1-T2V-14B
  - XHToken/Spark-X2.6-4B-FP8
  - yandex/AliceAI-Foundation-80B-A3B-Base
---

# VRAM & GPU Cost Calculator

Pick any Hugging Face model, or paste its `org/name` or its page address, and see:

- how much GPU memory it needs to run, fine-tune with LoRA, fully fine-tune, generate, transcribe or embed, at its published precision or at 16, 8 or 4 bits;
- the cheapest GPU setups that hold it (one H100, two A100s, four RTX 4090s...), each priced live across the GPU clouds [FastGPU](https://fastgpu.co/?utm_source=huggingface&utm_medium=space&utm_campaign=gpu-cost-calculator) tracks, with a link to every offer.

It reads each model's own metadata from the Hub (the parameter count in its safetensors or GGUF header, its quantization config) and asks FastGPU's free match API for the sizing and the live prices. Nothing to install, no sign-in. Type a size such as `70B` for a model that is not on the Hub.

## Which models

Any public model on the Hub that publishes a parameter count. The search box lists 13,025 of them: the text, vision-language, image, video, speech and embedding models the Hub counted at 1,000 or more downloads in the 30 days before a build day from 2026-10-11 to 2026-11-02, plus the ones trending on those days. Left out of the list: models too small to need a rented GPU, adult and refusal-stripped fine-tunes, and builds for Apple silicon, CPUs or phones. Anything else is found through the Hub's own search as you type, or by pasting its `org/name`.

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
