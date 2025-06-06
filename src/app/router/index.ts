import {
  createRouter,
  createWebHistory, type NavigationGuardNext,
  type RouteLocationNormalizedGeneric,
  type RouteLocationNormalizedLoadedGeneric
} from 'vue-router';

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
      beforeEnter: (to, from,next) => {
        const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';

        if  (isAuthenticated) {
          return next('/user');
        }
        next();
      },
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
      path: '/user',
      name: 'user',
      props: true,
      meta: {
        requiresAuth: true,
      },
      component: () => import("@/pages/user/ui/UserPageLayout.vue"),
      children: [
        {
          path: ':id',
          name: 'user-home',
          props: true,
          component: () => import('@/pages/user/ui/UserPageMain.vue'),
          meta: {
            requiresAuth: true,
          },
          children: [
            {
              path: 'mama',
              name: 'user-mama',
              props: true,
              component: () => import('@/pages/mama'),
              meta: {
                requiresAuth: true,
              },
            },
            {
              path: 'family',
              name: 'user-family',
              props: true,
              component: () => import('@/pages/family'),
              meta: {
                requiresAuth: true,
              },
            },
            {
              path: 'children',
              name: 'user-children',
              props: true,
              component: () => import('@/pages/children'),
              meta: {
                requiresAuth: true,
              },
            },
            {
              path: 'mental-health',
              name: 'user-mental_health',
              props: true,
              component: () => import('@/pages/mental-health'),
              meta: {
                requiresAuth: true,
              }
            },
            {
              path: 'rituals',
              name: 'user-rituals',
              props: true,
              component: () => import('@/pages/rituals'),
              meta: {
                requiresAuth: true,
              }
            },
            {
              path: 'daily-routine',
              name: 'user-daily_routine',
              props: true,
              component: () => import('@/pages/daily-routine'),
              meta: {
                requiresAuth: true,
              }
            }
          ]
        },
      ]
    }
  ],
})



router.beforeEach((to: RouteLocationNormalizedGeneric, from: RouteLocationNormalizedLoadedGeneric , next: NavigationGuardNext) => {
  const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';

  redirectToUser(isAuthenticated, to, next);

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if  (!isAuthenticated && to.path.includes('user')) {
      next('/auth/login');
    }
  }
  next();
})

function redirectToUser(auth: boolean, to: RouteLocationNormalizedGeneric, next: NavigationGuardNext) {
  if (auth) {
    const newPath = to.path;
    if (!to.fullPath.includes('user')) {
      to.fullPath = '/user' + newPath;
    }
  }
}
export default router
