import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/home/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/todo',
    name: 'todo',
    component: () => import('../pages/todo/TodoPage.vue'),
  },
]

const router = createRouter({
  base: '/',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
