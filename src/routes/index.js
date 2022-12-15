import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/todo',
    name: 'todo',
    component: () => import('../views/todo/TodoPage.vue'),
  },
]

const router = createRouter({
  base: '/',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
