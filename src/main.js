import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import routes from './routes'

//% Components
import App from './App.vue'
import PagerCp from './components/common/PagerCp.vue'

//% plugins
import globals from '@/plugins/common'

//% SCSS
import './assets/scss/common.scss'

//% App init
const app = createApp(App)

//% Pinia Init
const pinia = createPinia()
// pinia.use(piniaPluginPersistedstate)

//% Global Components Init
app.component('PagerCp', PagerCp)

//% Global Plugin Init
app.use(globals)
app.use(routes)
app.use(pinia)

//% App Mount
app.mount('#app')
