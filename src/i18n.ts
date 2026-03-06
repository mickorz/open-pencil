// src/i18n.ts
import { createI18n } from 'vue-i18n'

import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'

const STORAGE_KEY = 'open-pencil:locale'

function getSavedLocale(): string {
  return localStorage.getItem(STORAGE_KEY) || 'zh-CN'
}

export type MessageSchema = typeof zhCN
export type Locales = 'zh-CN' | 'en-US'

const i18n = createI18n<[MessageSchema], Locales>({
  legacy: false,
  locale: getSavedLocale(),
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})

export function setLocale(locale: Locales): void {
  ;(i18n.global.locale as unknown as { value: Locales }).value = locale
  localStorage.setItem(STORAGE_KEY, locale)
}

export function getCurrentLocale(): Locales {
  return (i18n.global.locale as unknown as { value: Locales }).value
}

export default i18n
