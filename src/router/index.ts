import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'dashboard',
    //   component: DashboardView,
    // },
    {
      path: '/',
      redirect: { name: 'play' },
    },
    {
      path: '/previous-games',
      name: 'previous-games',
      component: () => import('@/views/games/PreviousGamesView.vue'),
    },
    {
      path: '/play',
      name: 'play',
      component: () => import('@/views/games/PlayView.vue'),
    },
  ],
})

export default router
