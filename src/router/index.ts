import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/previous-games',
      name: 'previous-games',
      component: () => import('@/views/games/PreviousGamesView.vue'),
    },
  ],
})

export default router
