import {
  createRouter,
  createWebHistory, type NavigationGuardNext,
  type RouteLocationNormalizedGeneric,
  type RouteLocationNormalizedLoadedGeneric
} from 'vue-router';
import {useUserStore} from "@/entities/user";

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
      beforeEnter: async (to) => {
        const userStore = useUserStore();
        await userStore.checkUserSession();
        const userId = userStore.user?.userId;

        if (to.name === 'user' && userId){
          if (to.params.id !== userId) {
            return { name: 'user-home', params: { id: userId } };
          }
        }
      },
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
              redirect: { name: 'user-self_feeling'},
              props: true,
              component: () => import('@/pages/mama/ui/MamaPage.vue'),
              meta: {
                requiresAuth: true,
              },
              children: [
                {
                  path: 'self-feeling',
                  name: 'user-self_feeling',
                  props: true,
                  component: () => import('@/pages/mama/ui/SelfFeeling.vue'),
                  meta: {
                    requiresAuth: true,
                  },
                },
                {
                  path: 'timer',
                  name: 'user-timer',
                  props: true,
                  component: () => import('@/pages/mama/ui/TimeForMyself.vue'),
                  meta: {
                    requiresAuth: true,
                  },
                },
                {
                  path: 'beauty_calendar',
                  name: 'user-beauty_calendar',
                  props: true,
                  component: () => import('@/pages/mama/ui/CalendarBeauty.vue'),
                  meta: {
                    requiresAuth: true,
                  },
                },
                {
                  path: 'daily_rituals',
                  name: 'user-daily_rituals',
                  props: true,
                  component: () => import('@/pages/mama/ui/DailyRituals.vue'),
                  meta: {
                    requiresAuth: true,
                  },
                },
              ]
            },
            {
              path: 'family',
              name: 'user-family',
              redirect: { name: 'user-family_plans'},
              props: true,
              component: () => import('@/pages/family'),
              meta: {
                requiresAuth: true,
              },
              children: [
                {
                  path: 'plans',
                  name: 'user-family_plans',
                  props: true,
                  component: () => import('@/pages/family/ui/FamilyPlans.vue'),
                  meta: {
                    requiresAuth: true,
                  },
                },
                {
                  path: 'menu',
                  name: 'user-family_menu',
                  props: true,
                  component: () => import('@/pages/family/ui/FamilyMenu.vue'),
                  meta: {
                    requiresAuth: true,
                  },
                },
                {
                  path: 'chores',
                  name: 'user-family_chores',
                  props: true,
                  component: () => import('@/pages/family/ui/FamilyChores.vue'),
                  meta: {
                    requiresAuth: true,
                  },
                },
                {
                  path: 'family_calendar',
                  name: 'user-family_calendar',
                  props: true,
                  component: () => import('@/pages/family/ui/FamilyCalendar.vue'),
                  meta: {
                    requiresAuth: true,
                  },
                }
              ]
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
              component: () => import('@/pages/rituals/ui/RitualsPage.vue'),
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
      to.name = 'user';
    }
  }
}
export default router
