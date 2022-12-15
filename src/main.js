import { createApp } from 'vue'
import store from './stores'
import routes from './routes'
import globalPlugins from '@/plugins'

//% Global Components
import App from './App.vue'

//% App init
const app = createApp(App)

//% Global Properties Init
app.use(globalPlugins) // Plugin inject
app.use(routes) // Router Inject
app.use(store)  // Store  Inject

//% App Mount
app.mount('#app')
