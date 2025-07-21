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
          component: () => import('@/entities/user/ui/UserPageMain.vue'),
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
                  path: 'diary',
                  name: 'user-diary',
                  props: true,
                  component: () => import('@/pages/mama/ui/DiaryComponent.vue'),
                  meta: {
                    requiresAuth: true,
                  },
                },
              ]
            },
            {
              path: 'family',
              name: 'user-family',
              redirect: { name: 'user-family_calendar'},
              props: true,
              component: () => import('@/pages/family'),
              meta: {
                requiresAuth: true,
              },
              children: [
                {
                  path: 'family_calendar',
                  name: 'user-family_calendar',
                  props: true,
                  component: () => import('@/pages/family/ui/FamilyCalendar.vue'),
                  meta: {
                    requiresAuth: true,
                  },
                },
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
              ]
            },
            {
              path: 'children',
              name: 'user-children',
              props: true,
              redirect: { name: 'user-children_calendar'},
              component: () => import('@/pages/children'),
              meta: {
                requiresAuth: true,
              },
              children: [
                {
                  path: 'children_calendar',
                  name: 'user-children_calendar',
                  props: true,
                  component: () => import('@/pages/children/ui/ChildrenCalendar.vue'),
                  meta: {
                    requiresAuth: true,
                  },
                },
                {
                  path: 'children_activities',
                  name: 'user-children_activities',
                  props: true,
                  component: () => import('@/pages/children/ui/ChildrenActivities.vue'),
                  meta: {
                    requiresAuth: true,
                  },
                },
                {
                  path: 'children_health',
                  name: 'user-children_health',
                  props: true,
                  component: () => import('@/pages/children/ui/ChildrenHealth.vue'),
                  meta: {
                    requiresAuth: true,
                  },
                },
                {
                  path: 'baby_diary',
                  name: 'user-baby_diary',
                  props: true,
                  component: () => import('@/pages/children/ui/BabyDiary.vue'),
                  meta: {
                    requiresAuth: true,
                  },
                },
                {
                  path: 'children_notes',
                  name: 'user-children_notes',
                  props: true,
                  component: () => import('@/pages/children/ui/ChildrenNotes.vue'),
                  meta: {
                    requiresAuth: true,
                  },
                },
              ]
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
              redirect: { name: 'user-daily_rituals' },
              props: true,
              component: () => import('@/pages/rituals/ui/RitualsPage.vue'),
              meta: {
                requiresAuth: true,
              },
              children: [
                {
                  path: 'beauty_calendar',
                  name: 'user-beauty_calendar',
                  props: true,
                  component: () => import('@/pages/rituals/ui/CalendarBeauty.vue'),
                  meta: {
                    requiresAuth: true,
                  },
                },
                {
                  path: 'daily_rituals',
                  name: 'user-daily_rituals',
                  props: true,
                  component: () => import('@/pages/rituals/daily_rituals/ui/DailyRituals.vue'),
                  meta: {
                    requiresAuth: true,
                  },
                }
              ]
            },
            {
              path: 'daily-routine',
              name: 'user-daily_routine',
              props: true,
              component: () => import('@/pages/daily-routine'),
              meta: {
                requiresAuth: true,
              }
            },
            {
              path: 'faq',
              name: 'user-faq',
              redirect: { name: 'user-faq-general'},
              props: true,
              component: () => import('@/pages/faq/ui/FAQPage.vue'),
              meta: {
                requiresAuth: true,
              },
              children: [
                {
                  path: 'faq-general',
                  name: 'user-faq-general',
                  props: true,
                  component: () => import('@/pages/faq/ui/FAQGeneral.vue'),
                  meta: {
                    requiresAuth: true,
                  },
                },
                {
                  path: 'faq-calendar',
                  name: 'user-faq-calendar',
                  props: true,
                  component: () => import('@/pages/faq/ui/FAQCalendarPage.vue'),
                  meta: {
                    requiresAuth: true,
                  },
                }
              ]
            },
            {
              path: 'user_page',
              name: 'user-page',
              props: true,
              component: () => import('@/pages/user-page/ui/UserPage.vue'),
              meta: {
                requiresAuth: true,
              },
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
