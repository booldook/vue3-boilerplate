import { createApp } from 'vue'
import { createPinia } from 'pinia'
import globals from '@/module/global'

import App from './App.vue'
import router from './router'

import './assets/scss/common.scss'
import './assets/main.css'

const app = createApp(App)

app.use(globals)
app.use(createPinia())
app.use(router)

app.mount('#app')
