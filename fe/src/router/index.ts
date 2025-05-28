import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '@/modules/lego/WelcomeView.vue'
import LegoView from '@/modules/lego/LegoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView
    },
    {
      path: '/lego',
      name: 'lego',
      component: LegoView
    }
  ]
})

export default router
