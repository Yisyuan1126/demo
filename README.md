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
  - Nanbeige/Nanbeige4.3-33B
  - deepseek-ai/DeepSeek-V4.1-Flash-1017
  - baidu/Unlimited-OCR-2
  - XHToken/Spark-X2.6-4B
  - RecursiveSI/flint
  - Pika-Labs/Pika-H3-Flex
  - ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF
  - Diffuspace/Clover-35B-A3B-Preview
  - nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB
  - MiniMaxAI/MiniMax-M3.1-Flash
  - unsloth/DeepSeek-V4.1-Flash-1017-GGUF
  - divagr1925/Qwen3.5-4B-Qwenputer
  - ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF
  - Qwen/Qwen3.8-Flash-Next
  - BreezeBlue/Breeze-TTS-2
  - sensenova/SenseNova-Loop-9B-Preview
  - fishaudio/drama-3
  - HuggingFaceBio/Carbon-X
  - XHToken/Spark-X2.6-4B-GGUF
  - microsoft/Mage-VL-Cowork
  - nvidia/DeepSeek-V4.1-Flash-1017-NVFP4
  - ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF
  - unsloth/flint-GGUF
  - inclusionAI/Ling-3.1-flash-1019
  - InternScience/Sage-A1.5
  - deepseek-ai/DeepSeek-V4.1-Flash
  - Nanbeige/Nanbeige4.3-33B-Base
  - black-forest-labs/flux-3-image-klein
  - jialinyyzz/humanizer
  - tencent/WeVisOne-VL-4B
  - sensenova/SenseNova-6.8-Code2Video
  - gugujiji/novel-humanize-4b
  - unsloth/NVIDIA-Nemotron-3.5-Bolt-E4B-GGUF
  - MemTensor/MemT-1.0-Nano
  - moonshotai/Kimi-K3
  - kaitchup/Qwen3.8-27B-SLQ-GGUF
  - AtomicChat/Nanbeige4.3-33B-GGUF
  - Cloudflare/clef
  - GrootTeam/Groot-19B-A3B-261023
  - zai-org/GLM-5.3-Flash
  - prism-ml/Ternary-Bonsai-2-27B-gguf
  - OpenMOSS-Team/MOSS-Image-Base
  - ConwayResearch/Underdog-Saluki-27B-1.0
  - peculiar-ragdoll/Cyber-Tiel-Coder-35B-A3B-GGUF-MTP
  - Octen/Octen-WebGR-4B
  - ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-Coder-GGUF
  - briaai/Fibo-2.0-dev
  - GroundingPI/GroundAnything-VLM
  - zai-org/GLM-5.3
  - abenzerps/Nanbeige4.3-33B-GSQ-RCO-GGUF
  - agentionai/Qwen3.8-Flash-Next-Gyro-GGUF
  - ukisai/Swift-1.5-Qwen3.8-27B-GSQ-RCO-GGUF
  - KRAFTON/Raon-1-mini-preview
  - nvidia/Qwen3.8-Flash-Next-FP4-Local
  - nvidia/Qwen3.8-Flash-Next-NVFP4
  - krea/Krea-2-Raw
  - Qwen/Qwen-Image-2.1-Turbo
  - Apexintelligence-AI/Apex-35B-V1.0
  - lodestones/Kromoss
  - reflection/Beam-1.0-501B-A23B
  - unsloth/Qwen3.8-Flash-Next-GGUF
  - baidu/Unlimited-OCR
  - ornith-ai/Ornith-1.5-122B
  - HemmingwayAI/Hemmingway-1.5
  - MemTensor/MemT-1.0-Flash
  - meta-models/Muse-Spark-Open-816B-A42B
  - black-forest-labs/FLUX.2-dev
  - inclusionAI/Ling-3.0-flash-Sante
  - XingChen-AGI/Xing4.0-29B-Intent
  - briaai/Fibo-2.0-edit-turbo
  - empero-ai/Qwythos-9B-Claude-Mythos-5-1M-GGUF
  - unsloth/MiniMax-M3.1-Flash-GGUF
  - Qwen/Qwen3.6-35B-A3B
  - DavidAU/Qwen3.8-27B-Turbo-Brilliance-50X-Reasoning-Instruct-NEO-MAX-MTP-GGUF
  - google/gemma-4-E4B-it
  - black-forest-labs/flux-3-image-klein-base
  - BAAI/AREX-2
  - bartowski/Nanbeige_Nanbeige4.3-33B-GGUF
  - nvidia/LocateAnything-3B
  - unsloth/Qwen3.6-35B-A3B-GGUF
  - lodestones/Chroma1-HD
  - ornith-ai/Ornith-1.5-9B-GGUF
  - peculiar-ragdoll/Tiel-Coder-35B-A3B-GGUF-MTP
  - ornith-ai/Ornith-1.5-35B-A3B
  - LessThanThreeAI/Gemma-4-31B-Humanlike-Chat-GGUF
  - meta-models/Muse-Glimmer-30B
  - webbrain-one/Nanbeige4.3-33B-NVFP4
  - unsloth/Ornith-1.5-122B-GGUF
  - Cloudflare/clef-flash
  - yuxinlu1/gemma-4-12B-agentic-fable5-composer2.5-v2-3.5x-tau2-GGUF
  - fastino/GLiDE
  - nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4
  - destined/hurston-1
  - Aleph-Alpha/Kolibri-1
  - google/gemma-4-26B-A4B-it
  - paperinstruments/Ultramarine-1-Flash
  - nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2
  - InternScience/Sage-A1.5-Q4_K_M-GGUF
  - GrootTeam/Groot-19B-A3B-261023-GGUF
  - ukisai/Swift-1.5-Qwen3.8-27B-GGUF
  - JetBrains/Mellum2.1-12B-A2.5B-Thinking-GGUF
  - peculiar-ragdoll/Tiel-Coder-35B-A3B-GGUF
  - unsloth/Qwen3.5-9B-GGUF
  - Qwen/Qwen3.8-2.4T-A95B
  - unsloth/Qwen3-Coder-30B-A3B-Instruct-GGUF
  - KRAFTON/Raon-1-mini-preview-gguf
  - Aratako/Drama-3-Japanese
  - datalab-to/chandra-ocr-2
  - abacusai/Smaug-Humanizer
  - tencent/WeVisCut
  - peculiar-ragdoll/Cyber-Tiel-Coder-35B-A3B-GGUF
  - XiaomiMiMo/MiMo-V2.6-Pro-RL
  - Nanbeige/Nanbeige4.2-3B
  - stabilityai/stable-diffusion-3.5-medium
  - google/gemma-4-12B-it
  - Diffuspace/Clover-35B-A3B-Preview-GGUF
  - inclusionAI/LBS-27B
  - ukisai/Swift-1.5-Qwen3.8-Flash-Next-GSQ-RCO-GGUF
  - unsloth/Qwen-Image-2.1-GGUF
  - LiquidAI/LFM2.5-24B-A2B
  - RavichandranJ/Dolphin3-Cyber-8B-GGUF
  - LiquidAI/d1-3B
  - ibm-granite/granite-switch-4.1-30b
  - google/gemma-4-E2B-it
  - akhaliq/MOSS-Image-SFT-4-steps
  - ceia-br/lumi-4b
  - XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B
  - deepseek-ai/DeepSeek-V4-Flash
  - fishaudio/s2-pro
  - lodestones/chroma-h3
  - nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-BF16
  - agentionai/Qwen3.8-Flash-Next-Gyro-Coder-GGUF
  - Qwen/Qwen2.5-Coder-7B-Instruct-GGUF
  - ornith-ai/Ornith-1.5-35B-A3B-GGUF
  - inclusionAI/Ling-3.1-flash-base
  - Qwen/Qwen3-8B-GGUF
  - empero-ai/Qwythos-9B-Claude-Mythos-5-1M
  - ibm-granite/granite-switch-4.1-8b
  - nvidia/Qwen3.8-27B-NVFP4
  - Qwen/Qwen3-Coder-Next
  - bartowski/HemmingwayAI_Hemmingway-1.5-GGUF
  - NousResearch/Hermes-3-Llama-3.1-8B
  - inclusionAI/Ling-3.0-tiny
  - XHToken/Spark-X2.6-4B-DSpark-GGUF
  - Lightricks/LTX-2.5-Diffusers
  - Maximilian228/Qwen3.8-Flash-Next-NVFP4-GPTQ-Strata
  - meta-llama/Llama-3.2-3B
  - empero-ai/Qwen3.8-9B-Distill-GGUF
  - yuxinlu1/gemma-4-12B-coder-fable5-composer2.5-v1-GGUF
  - XHToken/Spark-X2.6-4B-Base
  - empero-ai/Qwen3.8-35B-A3B-Distill
  - empero-ai/Qwen3.8-35B-A3B-Distill-GGUF
  - speridlabs/iris-3b
  - peasantsmith/DeepSeek-V4.1-Flash-1017-Maya-GGUF
  - nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16
  - DogukanUrker/Nanbeige4.3-33B-GGUF
  - ProCreations/Nanbeige4.3-33B-DFlash2
  - AtomicChat/Clover-35B-A3B-Preview-GGUF
  - nvidia/NLD-Uni
  - unsloth/Qwen-Image-2.1-Turbo-GGUF
  - divagr1925/Qwen3.5-4B-Qwenputer-Filesystem
  - microsoft/UserLM-2.0
  - tencent/Hy-Memory-30B-A3B
  - ornith-ai/Ornith-1.5-9B
  - LessThanThreeAI/Qwen3.8-27B-Humanlike-Chat-GGUF
  - unsloth/GLM-4.7-Flash-GGUF
  - nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4
  - google/gemma-4-E4B
  - ornith-ai/Ornith-1.5-122B-NVFP4
  - SuperLogic/Qwen3.8-27B-Flash-MTP-GGUF
  - zai-org/GLM-5.2
  - google/gemma-4-12B
  - Wan-AI/Wan2.1-T2V-1.3B
  - google/gemma-4-12B-it-qat-q4_0-gguf
  - RecursiveSI/flint-int4-gguf
  - Qwen/Qwen3-4B-Instruct-2507
  - ornith-ai/Ornith-1.5-122B-GGUF
  - deepseek-ai/DeepSeek-V4-Pro
  - unsloth/GLM-5.3-Flash-GGUF
  - nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16
  - IsValorum/Flint-APEX-I-MiniPlus-V2.1-GGUF
  - microsoft/Sentiment-Analysis-7B
  - unsloth/MOSS-Image-SFT-GGUF
  - stabilityai/stable-video-diffusion-img2vid-xt-1-1
  - DavidAU/LFM2.5-24B-A2B-Turbo-Brilliance-50X-NEO-MAX-Imatrix-GGUF
  - ibm-granite/granite-4.2-3b
  - JetBrains/Mellum2.1-12B-A2.5B-Thinking
  - Qwen/Qwen2.5-Coder-32B-Instruct
  - RecursiveSI/flint-nvfp4-gguf
  - kaushikvira/DeepSeek-V4.1-Flash-1017-GSQ-agentic-strata
  - LiquidAI/LFM2.5-24B-A2B-GGUF
  - bartowski/Spark-X2.6-4B-GGUF
  - kaitchup/Qwen3.8-27B-SLQ-EAR98
  - diffbot/DeepSeek-V4.1-Flash-EXL3-3bpw-2x-RTX-PRO-6000
  - black-forest-labs/FLUX.1-Kontext-dev
  - black-forest-labs/FLUX.2-klein-base-9B
  - deadbydawn101/RavenX-CyberAgent-Qwen3.6-35B-A3B-Opus-4.7-OpenMythos-Pentester-BugHunter-RATH-GGUF
  - hitsfmdj/Qwen3.8-27B-GGUF-4.2BPW-16GB
  - IFM/K2-Horizon-MoVA-36B-A4B
  - LibertAIDAI/DeepSeek-V4.1-Flash-1017-EXL3-2.9bpw
---

# VRAM & GPU Cost Calculator

Pick any Hugging Face model, or paste its `org/name` or its page address, and see:

- how much GPU memory it needs to run, fine-tune with LoRA, fully fine-tune, generate, transcribe or embed, at its published precision or at 16, 8 or 4 bits;
- the cheapest GPU setups that hold it (one H100, two A100s, four RTX 4090s...), each priced live across the GPU clouds [FastGPU](https://fastgpu.co/?utm_source=huggingface&utm_medium=space&utm_campaign=gpu-cost-calculator) tracks, with a link to every offer.

It reads each model's own metadata from the Hub (the parameter count in its safetensors or GGUF header, its quantization config) and asks FastGPU's free match API for the sizing and the live prices. Nothing to install, no sign-in. Type a size such as `70B` for a model that is not on the Hub.

## Which models

Any public model on the Hub that publishes a parameter count. The search box lists 12,883 of them: the text, vision-language, image, video, speech and embedding models the Hub counted at 1,000 or more downloads in the 30 days before a build day from 2026-10-11 to 2026-11-01, plus the ones trending on those days. Left out of the list: models too small to need a rented GPU, adult and refusal-stripped fine-tunes, and builds for Apple silicon, CPUs or phones. Anything else is found through the Hub's own search as you type, or by pasting its `org/name`.

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
