<script setup lang="ts">
import { ChevronDownIcon} from "@heroicons/vue/16/solid";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import {type MamaSubsectionType, type SectionType, SidebarLayout} from "@/entities/sidebar";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/entities/user";
import {useRouter} from "vue-router";
import type { AsideMenuType } from "@/entities/sidebar";

const router = useRouter();
const { user } = storeToRefs(useUserStore());
const { t } = useI18n();

type GoToPageParams =
  | { value: SectionType; index: number }
  | { value: string; index: number; subpage: boolean };

const asideList = computed(():AsideMenuType[] => ([
  {
    id: 1,
    title: t('aside.mama.title'),
    value: 'mama',
    listHidden: true,
    links: [
      {
        id: 1,
        title: t('aside.mama.self_feeling'),
        value: 'self_feeling',
      },
      {
        id: 2,
        title: t('aside.mama.daily_rituals'),
        value: 'daily_rituals',
      },
      {
        id: 3,
        title: t('aside.mama.timer'),
        value: 'timer',
      },
      {
        id: 4,
        title:  t('aside.mama.beauty_calendar'),
        value: 'beauty_calendar',
      },
    ]
  },
  {
    id: 2,
    title: t('aside.family.title'),
    value: 'family',
    listHidden: true,
    links: [
      {
        id: 1,
        title: t('aside.family.family_events'),
        value: 'events',
      },
      {
        id: 2,
        title: t('aside.family.plans'),
        value: 'plans',
      },
      {
        id: 3,
        title: t('aside.family.menu'),
        value: 'menu',
      },
      {
        id: 4,
        title: t('aside.family.chores'),
        value: 'chores',
      },
      {
        id: 5,
        title: t('aside.family.general_calendar'),
        value: 'general_calendar',
      },
    ]
  },
  {
    id: 3,
    title: t('aside.children.title'),
    value: 'children',
    listHidden: true,
    links: [
      {
        id: 1,
        title: t('aside.children.daily_routine'),
        value: 'daily_routine',
      },
      {
        id: 2,
        title: t('aside.children.activities'),
        value: 'activities',
      },
      {
        id: 3,
        title: t('aside.children.health'),
        value: 'health',
      },
      {
        id: 4,
        title: t('aside.children.baby_diary'),
        value: 'baby_diary',
      },
      {
        id: 5,
        title: t('aside.children.children_notes'),
        value: 'children_notes',
      },
    ]
  },
  {
    id: 4,
    title: t('aside.mental_health.title'),
    value: 'mental_health',
    listHidden: true,
    links: [
      {
        id: 1,
        title: t('aside.mental_health.diary'),
        value: 'diary',
      },
      {
        id: 2,
        title: t('aside.mental_health.meditations'),
        value: 'meditations',
      },
      {
        id: 3,
        title: t('aside.mental_health.assistant'),
        value: 'assistant',
      },
      {
        id: 4,
        title: t('aside.mental_health.favorite_books'),
        value: 'favorite_books',
      }
    ]
  },
  {
    id: 5,
    title: t('aside.rituals.title'),
    value: 'rituals',
    listHidden: true,
    links: [
      {
        id: 1,
        title: t('aside.rituals.massage'),
        value: 'massage',
      },
      {
        id: 2,
        title: t('aside.rituals.cosmetology'),
        value: 'cosmetology',
      },
      {
        id: 3,
        title: t('aside.rituals.manicure'),
        value: 'manicure',
      },
      {
        id: 4,
        title: t('aside.rituals.schedule_rituals'),
        value: 'schedule_rituals',
      }
    ]
  },
  {
    id: 6,
    title: t('aside.daily_routine.title'),
    value: 'daily_routine',
    listHidden: true,
    links: [
      {
        id: 1,
        title: t('aside.daily_routine.daily_tasks'),
        value: 'daily_tasks',
      },
      {
        id: 2,
        title: t('aside.daily_routine.weekly_tasks'),
        value: 'weekly_tasks',
      },
      {
        id: 3,
        title: t('aside.daily_routine.recurring_tasks'),
        value: 'recurring_tasks',
      },
      {
        id: 4,
        title: t('aside.daily_routine.priority_tasks'),
        value: 'priority_tasks',
      },
      {
        id: 5,
        title: t('aside.daily_routine.deferred_tasks'),
        value: 'deferred_tasks',
      },
    ]
  },
]))

const goToPage = (params: GoToPageParams): void => {
  if ('subpage' in params ? !params.subpage : true) {
    toggleMenuList(params.index);
  }
  router.push({name: `user-${params.value}`, params: {id: user?.value?.userId}})
}

const asideMenuList = ref<AsideMenuType[] | null>(null);

const toggleMenuList = (index: number) => {
  if (!asideMenuList.value) return;

  const isCurrentlyVisible = !asideMenuList.value[index].listHidden;

  asideMenuList.value.forEach(item => item.listHidden = true);

  if (!isCurrentlyVisible) {
    asideMenuList.value[index].listHidden = false;
  }
}

onMounted(() => {
  asideMenuList.value = asideList.value;
})
</script>

<template>
  <SidebarLayout>
    <template #content>
      <div
        v-for="(menu, index) in asideMenuList"
        :key="menu.id+menu.title"
        class="shadow-2xl mb-2 rounded-md w-[250px]"
      >
        <div
          class="flex justify-between items-center bg-brown-medium hover:bg-brown-dark duration-500 p-4 cursor-pointer text-white uppercase transition-all w-[250px]"
          :class="{ 'bg-[#523629] shadow-2xl' : !menu.listHidden }"
          @click="goToPage({ value: menu.value, index })"
        >
          <h2 class="font-semibold">
            {{ menu?.title || '' }}
          </h2>

          <ChevronDownIcon class="w-8" :class="{ 'rotate-180 transition-rotate duration-500' : !menu.listHidden }"/>
        </div>

        <ul v-if="!menu.listHidden" class="p-5 pl-7 w-[250px]">
          <li
            v-for="submenu in menu.links"
            :key="submenu.title"
            class="cursor-pointer text-brown-dark hover:text-brown-medium mb-1 hover:list-disc hover:font-semibold transition duration-500"
            @click="goToPage({ value: submenu.value, index, subpage: true })"
          >
            {{ submenu.title}}
          </li>
        </ul>

      </div>
    </template>
  </SidebarLayout>
</template>

<style scoped>
#aside::-webkit-scrollbar {
  width: 2px;
}

::-webkit-scrollbar {
  width: 2px;
}
</style>
