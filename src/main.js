import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

//# Components
import App from './App.vue'
import Pager from './components/common/Pager.vue'

//# plugins
import globals from '@/module/global'

//# SCSS
import './assets/scss/common.scss'


const app = createApp(App)

app.component('Pager', Pager)

app.use(globals)
app.use(createPinia())
app.use(router)


app.mount('#app')
