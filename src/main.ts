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
