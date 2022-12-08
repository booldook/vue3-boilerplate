import { createApp } from 'vue'
import { createPinia } from 'pinia'
import routes from './routes'

//# Components
import App from './App.vue'
import PagerCp from './components/common/PagerCp.vue'

//# plugins
import globals from '@/modules/global'

//# SCSS
import './assets/scss/common.scss'

// # App init
const app = createApp(App)

//# Global Components Init
app.component('PagerCp', PagerCp)

//# Global Plugin Init
app.use(globals)
app.use(createPinia())
app.use(routes)

//# App Mount
app.mount('#app')
