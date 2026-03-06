# OpenPencil AI 接口配置文档

## 服务提供商

**OpenRouter** - AI 模型聚合平台

- 官网: https://openrouter.ai
- 用于统一访问多种 AI 模型

## 默认模型

**Claude Sonnet 4.6** (`anthropic/claude-sonnet-4.6`)

- 提供商: Anthropic
- 标签: Best for design
- 特点: 视觉 + 前端 + 工具调用，在 WebDev Arena 排名第一

## 可用模型列表

### 推荐模型

| 模型 ID | 名称 | 提供商 | 标签 |
|---------|------|--------|------|
| `anthropic/claude-sonnet-4.6` | Claude Sonnet 4.6 | Anthropic | Best for design (默认) |
| `anthropic/claude-opus-4.6` | Claude Opus 4.6 | Anthropic | Smartest |
| `moonshotai/kimi-k2.5` | Kimi K2.5 | Moonshot | Vision + code |
| `google/gemini-3.1-pro-preview` | Gemini 3.1 Pro | Google | 1M context |
| `openai/gpt-5.3-codex` | GPT-5.3 Codex | OpenAI | - |

### 快速且便宜

| 模型 ID | 名称 | 提供商 | 标签 |
|---------|------|--------|------|
| `google/gemini-3-flash-preview` | Gemini 3 Flash | Google | Fast |
| `deepseek/deepseek-v3.2` | DeepSeek V3.2 | DeepSeek | Cheap |
| `qwen/qwen3.5-flash-02-23` | Qwen 3.5 Flash | Qwen | Cheap |

### 免费模型

| 模型 ID | 名称 | 提供商 | 标签 |
|---------|------|--------|------|
| `qwen/qwen3-coder:free` | Qwen3 Coder | Qwen | Free |
| `openai/gpt-oss-120b:free` | GPT-OSS 120B | OpenAI | Free |

## 代码配置

### 关键文件

| 文件 | 说明 |
|------|------|
| `packages/core/src/constants.ts` | AI 模型列表和默认模型定义 |
| `src/composables/use-chat.ts` | AI 聊天功能和 OpenRouter 集成 |
| `src/ai/tools.ts` | AI 工具定义 |

### 使用方式

```typescript
// 获取 API Key 存储 key
const API_KEY_STORAGE = 'open-pencil:openrouter-api-key'

// 获取模型存储 key
const MODEL_STORAGE = 'open-pencil:model'

// 创建 OpenRouter 客户端
const openrouter = createOpenRouter({
  apiKey: apiKey.value,
  headers: {
    'X-OpenRouter-Title': 'OpenPencil',
    'HTTP-Referer': 'https://github.com/open-pencil/open-pencil'
  }
})
```

## System Prompt

```
You are a design assistant inside OpenPencil, a Figma-like design editor.
Help users create and modify designs. Be concise and direct.
When describing changes, use specific design terminology.

Available node types: FRAME (containers/cards), RECTANGLE, ELLIPSE, TEXT, LINE, STAR, POLYGON, SECTION.
Colors can be hex strings (#ff0000) or RGBA objects with values 0-1.
Coordinates use canvas space - (0, 0) is the top-left of the page.

Always use tools to make changes. After creating nodes, briefly describe what you did.
When the user asks to create a layout, use create_shape with FRAME, then set_layout for auto-layout.
```

## 使用要求

用户需要提供 OpenRouter API Key 才能使用 AI 功能。

获取 API Key: https://openrouter.ai/keys
