import { createApp } from 'vue'
import store from './stores'
import routes from './routes'
import plugin from '@/plugins'

//% Global Components
import App from './App.vue'
import PagerCp from './components/common/PagerCp.vue'

//% App init
const app = createApp(App)

//% Global Components Init
app.component('PagerCp', PagerCp)

//% Global Plugin Init
app.use(plugin) // Plugin inject
app.use(routes) // Router Inject
app.use(store)  // Store  Inject

//% App Mount
app.mount('#app')
