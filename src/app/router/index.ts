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
      redirect: { name: 'login'},
      component: () => import('@/pages/login/ui/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/pages/login/ui/LoginPage.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/pages/register'),
        },
      ]
    },
    {
      path: '/user/:id',
      name: 'user',
      redirect: { name: 'user-home'},
      props: true,
      meta: {
        requiresAuth: true,
      },
      component: () => import("@/pages/user"),
      children: [
        {
          path: 'home',
          name: 'user-home',
          props: true,
          component: () => import('@/pages/user/ui/UserPageMain.vue'),
          meta: {
            requiresAuth: true,
          },
        }
      ]
    }
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('userAuthenticated');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if  (isAuthenticated === 'false' && to.path.includes('user')) {
      return next('/');
    }
    return next();
  } else {
    next();
  }
})

export default router
