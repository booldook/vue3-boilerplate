import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'  // Keep Alive
import routes from './routes'

//% Global Components
import App from './App.vue'
import PagerCp from './components/common/PagerCp.vue'

//% plugins
import common from '@/plugins/common'

//% App init
const app = createApp(App)

//% Pinia Init
const pinia = createPinia()
// pinia.use(piniaPluginPersistedstate)  // Keep Alive

//% Global Components Init
app.component('PagerCp', PagerCp)

//% Global Plugin Init
app.use(common) // Plugin inject
app.use(routes) // Router Inject
app.use(pinia)  // Store  Inject

//% App Mount
app.mount('#app')
