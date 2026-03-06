# OpenPencil i18n 国际化实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 为 OpenPencil UI 添加中英文多语言支持，中文为默认语言

**Architecture:** 使用 vue-i18n 库，创建语言包目录和 i18n 配置，在组件中使用 `useI18n()` API 获取翻译函数

**Tech Stack:** Vue 3, vue-i18n, TypeScript, Composition API

---

## Task 1: 安装 vue-i18n 依赖

**Files:**
- Modify: `package.json`

**Step 1: 安装依赖**

```bash
pnpm add vue-i18n
```

**Step 2: 验证安装**

```bash
pnpm list vue-i18n
```

Expected: 显示 vue-i18n 版本号

**Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add vue-i18n dependency for i18n support"
```

---

## Task 2: 创建中文语言包

**Files:**
- Create: `src/locales/zh-CN.ts`

**Step 1: 创建语言包目录**

```bash
mkdir -p src/locales
```

**Step 2: 创建中文语言包**

```typescript
// src/locales/zh-CN.ts
export default {
  common: {
    save: '保存',
    cancel: '取消',
    delete: '删除',
    confirm: '确认',
    close: '关闭',
    rename: '重命名',
    duplicate: '复制',
    copy: '拷贝',
    paste: '粘贴',
    cut: '剪切',
    undo: '撤销',
    redo: '重做',
    selectAll: '全选'
  },
  toolbar: {
    move: '移动',
    select: '选择',
    frame: '框架',
    section: '区块',
    rectangle: '矩形',
    ellipse: '椭圆',
    line: '线条',
    polygon: '多边形',
    star: '星形',
    pen: '钢笔',
    text: '文本',
    hand: '平移'
  },
  menu: {
    file: '文件',
    edit: '编辑',
    view: '视图',
    object: '对象',
    text: '文本',
    arrange: '排列',
    new: '新建',
    open: '打开',
    save: '保存',
    saveAs: '另存为',
    exportSelection: '导出选中',
    undo: '撤销',
    redo: '重做',
    copy: '拷贝',
    paste: '粘贴',
    duplicate: '复制',
    delete: '删除',
    selectAll: '全选',
    zoomToFit: '缩放适应',
    zoomIn: '放大',
    zoomOut: '缩小',
    group: '编组',
    ungroup: '取消编组',
    createComponent: '创建组件',
    createComponentSet: '创建组件集',
    detachInstance: '分离实例',
    bringToFront: '移到最前',
    sendToBack: '移到最后',
    bold: '粗体',
    italic: '斜体',
    underline: '下划线',
    addAutoLayout: '添加自动布局',
    alignLeft: '左对齐',
    alignCenter: '居中对齐',
    alignRight: '右对齐',
    alignTop: '顶部对齐',
    alignMiddle: '垂直居中',
    alignBottom: '底部对齐'
  },
  panel: {
    design: '设计',
    prototype: '原型',
    code: '代码',
    layers: '图层',
    pages: '页面',
    properties: '属性',
    chat: '聊天',
    collab: '协作'
  },
  properties: {
    appearance: '外观',
    fill: '填充',
    stroke: '描边',
    effects: '效果',
    typography: '排版',
    layout: '布局',
    position: '位置',
    size: '尺寸',
    rotation: '旋转',
    cornerRadius: '圆角',
    export: '导出',
    page: '页面',
    variables: '变量'
  },
  chat: {
    enterApiKey: '请输入你的 OpenRouter API 密钥开始聊天',
    getApiKey: '获取 API 密钥',
    save: '保存'
  },
  settings: {
    language: '语言',
    chinese: '中文',
    english: 'English',
    toggleUI: '切换界面'
  }
}
```

**Step 3: Commit**

```bash
git add src/locales/zh-CN.ts
git commit -m "feat(i18n): add Chinese locale file"
```

---

## Task 3: 创建英文语言包

**Files:**
- Create: `src/locales/en-US.ts`

**Step 1: 创建英文语言包**

```typescript
// src/locales/en-US.ts
export default {
  common: {
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    confirm: 'Confirm',
    close: 'Close',
    rename: 'Rename',
    duplicate: 'Duplicate',
    copy: 'Copy',
    paste: 'Paste',
    cut: 'Cut',
    undo: 'Undo',
    redo: 'Redo',
    selectAll: 'Select all'
  },
  toolbar: {
    move: 'Move',
    select: 'Select',
    frame: 'Frame',
    section: 'Section',
    rectangle: 'Rectangle',
    ellipse: 'Ellipse',
    line: 'Line',
    polygon: 'Polygon',
    star: 'Star',
    pen: 'Pen',
    text: 'Text',
    hand: 'Hand'
  },
  menu: {
    file: 'File',
    edit: 'Edit',
    view: 'View',
    object: 'Object',
    text: 'Text',
    arrange: 'Arrange',
    new: 'New',
    open: 'Open',
    save: 'Save',
    saveAs: 'Save as',
    exportSelection: 'Export selection',
    undo: 'Undo',
    redo: 'Redo',
    copy: 'Copy',
    paste: 'Paste',
    duplicate: 'Duplicate',
    delete: 'Delete',
    selectAll: 'Select all',
    zoomToFit: 'Zoom to fit',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    group: 'Group',
    ungroup: 'Ungroup',
    createComponent: 'Create component',
    createComponentSet: 'Create component set',
    detachInstance: 'Detach instance',
    bringToFront: 'Bring to front',
    sendToBack: 'Send to back',
    bold: 'Bold',
    italic: 'Italic',
    underline: 'Underline',
    addAutoLayout: 'Add auto layout',
    alignLeft: 'Align left',
    alignCenter: 'Align center',
    alignRight: 'Align right',
    alignTop: 'Align top',
    alignMiddle: 'Align middle',
    alignBottom: 'Align bottom'
  },
  panel: {
    design: 'Design',
    prototype: 'Prototype',
    code: 'Code',
    layers: 'Layers',
    pages: 'Pages',
    properties: 'Properties',
    chat: 'Chat',
    collab: 'Collab'
  },
  properties: {
    appearance: 'Appearance',
    fill: 'Fill',
    stroke: 'Stroke',
    effects: 'Effects',
    typography: 'Typography',
    layout: 'Layout',
    position: 'Position',
    size: 'Size',
    rotation: 'Rotation',
    cornerRadius: 'Corner radius',
    export: 'Export',
    page: 'Page',
    variables: 'Variables'
  },
  chat: {
    enterApiKey: 'Enter your OpenRouter API key to start chatting.',
    getApiKey: 'Get an API key',
    save: 'Save'
  },
  settings: {
    language: 'Language',
    chinese: '中文',
    english: 'English',
    toggleUI: 'Toggle UI'
  }
}
```

**Step 2: Commit**

```bash
git add src/locales/en-US.ts
git commit -m "feat(i18n): add English locale file"
```

---

## Task 4: 创建 i18n 配置

**Files:**
- Create: `src/i18n.ts`

**Step 1: 创建 i18n 配置文件**

```typescript
// src/i18n.ts
import { createI18n } from 'vue-i18n'

import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'

const STORAGE_KEY = 'open-pencil:locale'

function getSavedLocale(): string {
  return localStorage.getItem(STORAGE_KEY) || 'zh-CN'
}

export type MessageSchema = typeof zhCN

const i18n = createI18n<[MessageSchema], 'zh-CN' | 'en-US'>({
  legacy: false,
  locale: getSavedLocale(),
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})

export function setLocale(locale: string): void {
  i18n.global.locale.value = locale as 'zh-CN' | 'en-US'
  localStorage.setItem(STORAGE_KEY, locale)
}

export function getCurrentLocale(): string {
  return i18n.global.locale.value
}

export default i18n
```

**Step 2: Commit**

```bash
git add src/i18n.ts
git commit -m "feat(i18n): add i18n configuration with locale persistence"
```

---

## Task 5: 在 main.ts 中集成 i18n

**Files:**
- Modify: `src/main.ts`

**Step 1: 修改 main.ts**

```typescript
// src/main.ts
import { createApp } from 'vue'

import './app.css'
import { preloadFonts } from '@/engine/fonts'

import App from './App.vue'
import router from './router'
import i18n from './i18n'

preloadFonts()
const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#app')
```

**Step 2: 验证应用启动**

```bash
pnpm dev
```

Expected: 应用正常启动，无报错

**Step 3: Commit**

```bash
git add src/main.ts
git commit -m "feat(i18n): integrate i18n plugin in main.ts"
```

---

## Task 6: 改造 Toolbar.vue

**Files:**
- Modify: `src/components/Toolbar.vue`

**Step 1: 添加 i18n 导入和工具标签映射**

在 `<script setup>` 中添加：

```typescript
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 将 toolLabels 改为计算属性
const toolLabels: Record<Tool, string> = {
  SELECT: t('toolbar.move'),
  FRAME: t('toolbar.frame'),
  SECTION: t('toolbar.section'),
  RECTANGLE: t('toolbar.rectangle'),
  ELLIPSE: t('toolbar.ellipse'),
  LINE: t('toolbar.line'),
  POLYGON: t('toolbar.polygon'),
  STAR: t('toolbar.star'),
  PEN: t('toolbar.pen'),
  TEXT: t('toolbar.text'),
  HAND: t('toolbar.hand')
}
```

**Step 2: Commit**

```bash
git add src/components/Toolbar.vue
git commit -m "feat(i18n): add i18n support to Toolbar"
```

---

## Task 7: 改造 AppMenu.vue - 添加语言切换

**Files:**
- Modify: `src/components/AppMenu.vue`

**Step 1: 添加 i18n 导入**

在 `<script setup>` 中添加：

```typescript
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/i18n'

import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal
} from 'reka-ui'

import IconGlobe from '~icons/lucide/globe'

const { t, locale } = useI18n()

const currentLocaleLabel = computed(() => {
  return locale.value === 'zh-CN' ? '中文' : 'EN'
})
```

**Step 2: 在模板中添加语言切换按钮**

在文档名输入框后面、Toggle UI 按钮前面添加：

```vue
<!-- 语言切换按钮 -->
<DropdownMenuRoot>
  <DropdownMenuTrigger as-child>
    <button
      class="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded text-muted transition-colors hover:bg-hover hover:text-surface"
      :title="t('settings.language')"
    >
      <IconGlobe class="size-3.5" />
    </button>
  </DropdownMenuTrigger>
  <DropdownMenuPortal>
    <DropdownMenuContent
      side="bottom"
      :side-offset="4"
      align="end"
      class="min-w-24 rounded-lg border border-border bg-panel p-1 shadow-lg"
    >
      <DropdownMenuItem
        class="flex cursor-pointer items-center rounded-md px-2 py-1.5 text-xs outline-none transition-colors"
        :class="locale === 'zh-CN' ? 'bg-accent text-white' : 'text-surface hover:bg-hover'"
        @select="setLocale('zh-CN')"
      >
        {{ t('settings.chinese') }}
      </DropdownMenuItem>
      <DropdownMenuItem
        class="flex cursor-pointer items-center rounded-md px-2 py-1.5 text-xs outline-none transition-colors"
        :class="locale === 'en-US' ? 'bg-accent text-white' : 'text-surface hover:bg-hover'"
        @select="setLocale('en-US')"
      >
        {{ t('settings.english') }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenuPortal>
</DropdownMenuRoot>
```

**Step 3: Commit**

```bash
git add src/components/AppMenu.vue
git commit -m "feat(i18n): add language switcher to AppMenu"
```

---

## Task 8: 改造 AppMenu.vue - 菜单项国际化

**Files:**
- Modify: `src/components/AppMenu.vue`

**Step 1: 改造菜单项使用 i18n**

将菜单定义改为使用 `t()` 函数：

```typescript
const fileMenu: MenuItem[] = [
  {
    label: t('menu.new'),
    shortcut: `${mod}N`,
    action: () => import('@/stores/tabs').then((m) => m.createTab())
  },
  { label: t('menu.open'), shortcut: `${mod}O`, action: () => openFileDialog() },
  { separator: true },
  { label: t('menu.save'), shortcut: `${mod}S`, action: () => store.saveFigFile() },
  { label: t('menu.saveAs'), shortcut: `${mod}⇧S`, action: () => store.saveFigFileAs() },
  { separator: true },
  {
    label: t('menu.exportSelection'),
    shortcut: `${mod}⇧E`,
    action: () => {
      if (store.state.selectedIds.size > 0) store.exportSelection(1, 'PNG')
    },
    disabled: store.state.selectedIds.size === 0
  }
]

const editMenu: MenuItem[] = [
  { label: t('menu.undo'), shortcut: `${mod}Z`, action: () => store.undoAction() },
  { label: t('menu.redo'), shortcut: `${mod}⇧Z`, action: () => store.redoAction() },
  { separator: true },
  { label: t('menu.copy'), shortcut: `${mod}C` },
  { label: t('menu.paste'), shortcut: `${mod}V` },
  { label: t('menu.duplicate'), shortcut: `${mod}D`, action: () => store.duplicateSelected() },
  { label: t('menu.delete'), shortcut: '⌫', action: () => store.deleteSelected() },
  { separator: true },
  { label: t('menu.selectAll'), shortcut: `${mod}A`, action: () => store.selectAll() }
]

const viewMenu: MenuItem[] = [
  { label: t('menu.zoomToFit'), shortcut: '⇧1', action: () => store.zoomToFit() },
  { label: t('menu.zoomIn'), shortcut: `${mod}=`, action: () => store.applyZoom(-100, window.innerWidth / 2, window.innerHeight / 2) },
  { label: t('menu.zoomOut'), shortcut: `${mod}-`, action: () => store.applyZoom(100, window.innerWidth / 2, window.innerHeight / 2) }
]

const objectMenu: MenuItem[] = [
  { label: t('menu.group'), shortcut: `${mod}G`, action: () => store.groupSelected() },
  { label: t('menu.ungroup'), shortcut: `${mod}⇧G`, action: () => store.ungroupSelected() },
  { separator: true },
  { label: t('menu.createComponent'), shortcut: `${mod}⌥K`, action: () => store.createComponentFromSelection() },
  { label: t('menu.createComponentSet'), action: () => store.createComponentSetFromComponents() },
  { label: t('menu.detachInstance'), action: () => store.detachInstance() },
  { separator: true },
  { label: t('menu.bringToFront'), shortcut: ']', action: () => store.bringToFront() },
  { label: t('menu.sendToBack'), shortcut: '[', action: () => store.sendToBack() }
]

const textMenu: MenuItem[] = [
  { label: t('menu.bold'), shortcut: `${mod}B` },
  { label: t('menu.italic'), shortcut: `${mod}I` },
  { label: t('menu.underline'), shortcut: `${mod}U` }
]

const arrangeMenu: MenuItem[] = [
  { label: t('menu.addAutoLayout'), shortcut: '⇧A', action: () => store.wrapInAutoLayout() },
  { separator: true },
  { label: t('menu.alignLeft'), shortcut: '⌥A' },
  { label: t('menu.alignCenter'), shortcut: '⌥H' },
  { label: t('menu.alignRight'), shortcut: '⌥D' },
  { separator: true },
  { label: t('menu.alignTop'), shortcut: '⌥W' },
  { label: t('menu.alignMiddle'), shortcut: '⌥V' },
  { label: t('menu.alignBottom'), shortcut: '⌥S' }
]

const topMenus = [
  { label: t('menu.file'), items: fileMenu },
  { label: t('menu.edit'), items: editMenu },
  { label: t('menu.view'), items: viewMenu },
  { label: t('menu.object'), items: objectMenu },
  { label: t('menu.text'), items: textMenu },
  { label: t('menu.arrange'), items: arrangeMenu }
]
```

**Step 2: Commit**

```bash
git add src/components/AppMenu.vue
git commit -m "feat(i18n): internationalize menu items in AppMenu"
```

---

## Task 9: 改造 APIKeySetup.vue

**Files:**
- Modify: `src/components/chat/APIKeySetup.vue`

**Step 1: 添加 i18n 支持**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAIChat } from '@/composables/use-chat'

const { t } = useI18n()
const { apiKey } = useAIChat()

const input = ref('')

function save() {
  apiKey.value = input.value.trim()
  input.value = ''
}
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center gap-4 px-4">
    <icon-lucide-key-round class="size-8 text-muted" />
    <p class="text-center text-xs text-muted">{{ t('chat.enterApiKey') }}</p>
    <form class="flex w-full gap-1.5" @submit.prevent="save">
      <input
        v-model="input"
        type="password"
        placeholder="sk-or-…"
        class="min-w-0 flex-1 rounded border border-border bg-input px-2 py-1 text-xs text-surface outline-none focus:border-accent"
      />
      <button
        type="submit"
        class="shrink-0 rounded bg-accent px-2.5 py-1 text-xs font-medium text-white hover:bg-accent/90"
        :disabled="!input.trim()"
      >
        {{ t('chat.save') }}
      </button>
    </form>
    <a
      href="https://openrouter.ai/keys"
      target="_blank"
      class="text-[10px] text-muted underline hover:text-surface"
    >
      {{ t('chat.getApiKey') }} →
    </a>
  </div>
</template>
```

**Step 2: Commit**

```bash
git add src/components/chat/APIKeySetup.vue
git commit -m "feat(i18n): add i18n support to APIKeySetup"
```

---

## Task 10: 最终验证和提交

**Step 1: 运行开发服务器测试**

```bash
pnpm dev
```

**Step 2: 手动验证清单**

- [ ] 应用正常启动
- [ ] 默认语言为中文
- [ ] 点击语言切换按钮可以切换语言
- [ ] 刷新页面后语言设置保持
- [ ] 工具栏标签显示正确翻译
- [ ] 菜单项显示正确翻译
- [ ] API Key 设置页面显示正确翻译

**Step 3: 类型检查**

```bash
pnpm typecheck
```

Expected: 无类型错误

**Step 4: 最终 Commit（如有遗漏修复）**

```bash
git add -A
git commit -m "feat(i18n): complete i18n implementation with Chinese as default"
```

---

## 任务概览

| Task | 描述 | 预计时间 |
|------|------|---------|
| 1 | 安装 vue-i18n 依赖 | 2 分钟 |
| 2 | 创建中文语言包 | 5 分钟 |
| 3 | 创建英文语言包 | 5 分钟 |
| 4 | 创建 i18n 配置 | 3 分钟 |
| 5 | 集成 main.ts | 2 分钟 |
| 6 | 改造 Toolbar.vue | 3 分钟 |
| 7 | AppMenu 添加语言切换 | 5 分钟 |
| 8 | AppMenu 菜单项国际化 | 5 分钟 |
| 9 | 改造 APIKeySetup.vue | 2 分钟 |
| 10 | 最终验证和提交 | 5 分钟 |

**总计: 约 37 分钟**
