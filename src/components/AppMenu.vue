<script setup lang="ts">
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarPortal,
  MenubarRoot,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from 'reka-ui'

import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal
} from 'reka-ui'

import IconChevronRight from '~icons/lucide/chevron-right'
import IconGlobe from '~icons/lucide/globe'

import { ref, nextTick, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { IS_TAURI } from '@/constants'
import { openFileDialog } from '@/composables/use-menu'
import { useEditorStore } from '@/stores/editor'
import { setLocale, type Locales } from '@/i18n'

const { t, locale } = useI18n()
const store = useEditorStore()

const editingName = ref(false)

function startRename() {
  editingName.value = true
  nextTick(() => {
    const input = document.querySelector<HTMLInputElement>('[data-doc-name-edit]')
    input?.focus()
    input?.select()
  })
}

function commitRename(input: HTMLInputElement) {
  const value = input.value.trim()
  if (value) {
    store.state.documentName = value
  }
  editingName.value = false
}

const currentLocaleLabel = computed(() => {
  return locale.value === 'zh-CN' ? '中文' : 'EN'
})

const isMac = navigator.platform.includes('Mac')
const mod = isMac ? '⌘' : 'Ctrl+'

interface MenuItem {
  label: string
  shortcut?: string
  action?: () => void
  separator?: boolean
  disabled?: boolean
  sub?: MenuItem[]
}

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
  {
    label: t('menu.zoomIn'),
    shortcut: `${mod}=`,
    action: () => store.applyZoom(-100, window.innerWidth / 2, window.innerHeight / 2)
  },
  {
    label: t('menu.zoomOut'),
    shortcut: `${mod}-`,
    action: () => store.applyZoom(100, window.innerWidth / 2, window.innerHeight / 2)
  }
]

const objectMenu: MenuItem[] = [
  { label: t('menu.group'), shortcut: `${mod}G`, action: () => store.groupSelected() },
  { label: t('menu.ungroup'), shortcut: `${mod}⇧G`, action: () => store.ungroupSelected() },
  { separator: true },
  {
    label: t('menu.createComponent'),
    shortcut: `${mod}⌥K`,
    action: () => store.createComponentFromSelection()
  },
  {
    label: t('menu.createComponentSet'),
    action: () => store.createComponentSetFromComponents()
  },
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
</script>

<template>
  <div class="shrink-0 border-b border-border">
    <div class="flex items-center gap-2 px-2 py-1.5">
      <img src="/favicon-32.png" class="size-4" alt="OpenPencil" />
      <input
        v-if="editingName"
        data-doc-name-edit
        class="min-w-0 flex-1 rounded border border-accent bg-input px-1 py-0.5 text-xs text-surface outline-none"
        :value="store.state.documentName"
        @blur="commitRename($event.target as HTMLInputElement)"
        @keydown.enter="($event.target as HTMLInputElement).blur()"
        @keydown.escape="editingName = false"
      />
      <span
        v-else
        class="min-w-0 flex-1 cursor-default truncate rounded px-1 py-0.5 text-xs text-surface hover:bg-hover"
        @dblclick="startRename"
        >{{ store.state.documentName }}</span
      >
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
      <button
        class="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded text-muted transition-colors hover:bg-hover hover:text-surface"
        :title="`${t('settings.toggleUI')} (⌘\\)`"
        @click="store.state.showUI = !store.state.showUI"
      >
        <icon-lucide-sidebar class="size-3.5" />
      </button>
    </div>
    <div v-if="!IS_TAURI" class="flex items-center px-1 pb-1">
      <MenubarRoot class="flex items-center gap-0.5 overflow-x-auto scrollbar-none">
        <MenubarMenu v-for="menu in topMenus" :key="menu.label">
          <MenubarTrigger
            class="flex cursor-pointer items-center rounded px-2 py-1 text-xs text-muted transition-colors select-none hover:bg-hover hover:text-surface data-[state=open]:bg-hover data-[state=open]:text-surface"
          >
            {{ menu.label }}
          </MenubarTrigger>

          <MenubarPortal>
            <MenubarContent
              :side-offset="4"
              align="start"
              class="min-w-52 rounded-lg border border-border bg-panel p-1 shadow-lg"
            >
              <template v-for="(item, i) in menu.items" :key="i">
                <MenubarSeparator v-if="item.separator" class="mx-1 my-1 h-px bg-border" />
                <MenubarSub v-else-if="item.sub">
                  <MenubarSubTrigger
                    class="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-xs text-surface outline-none select-none hover:bg-hover"
                  >
                    <span class="flex-1">{{ item.label }}</span>
                    <IconChevronRight class="size-3 text-muted" />
                  </MenubarSubTrigger>
                  <MenubarPortal>
                    <MenubarSubContent
                      :side-offset="4"
                      class="min-w-44 rounded-lg border border-border bg-panel p-1 shadow-lg"
                    >
                      <template v-for="(sub, j) in item.sub" :key="j">
                        <MenubarSeparator v-if="sub.separator" class="mx-1 my-1 h-px bg-border" />
                        <MenubarItem
                          v-else
                          class="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-xs outline-none select-none"
                          :class="sub.disabled ? 'text-muted/50' : 'text-surface hover:bg-hover'"
                          :disabled="sub.disabled"
                          @select="sub.action?.()"
                        >
                          <span class="flex-1">{{ sub.label }}</span>
                          <span v-if="sub.shortcut" class="text-[11px] text-muted">{{
                            sub.shortcut
                          }}</span>
                        </MenubarItem>
                      </template>
                    </MenubarSubContent>
                  </MenubarPortal>
                </MenubarSub>
                <MenubarItem
                  v-else
                  class="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-xs outline-none select-none"
                  :class="item.disabled ? 'text-muted/50' : 'text-surface hover:bg-hover'"
                  :disabled="item.disabled"
                  @select="item.action?.()"
                >
                  <span class="flex-1">{{ item.label }}</span>
                  <span v-if="item.shortcut" class="text-[11px] text-muted">{{
                    item.shortcut
                  }}</span>
                </MenubarItem>
              </template>
            </MenubarContent>
          </MenubarPortal>
        </MenubarMenu>
      </MenubarRoot>
    </div>
  </div>
</template>
