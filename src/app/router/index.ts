import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/about'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/pages/login'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/pages/login'),
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('@/pages/signup'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/pages/register'),
        },
      ]
    }
  ],
})

export default router
