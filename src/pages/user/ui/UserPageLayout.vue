<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const asideList = computed(() => ([
  {
    id: 1,
    title: t('aside.mama.title'),
    value: 'mama',
    url: () => { console.log( 'mama')},
    links: [
      {
        id: 1,
        title: t('aside.mama.self_feeling'),
        value: 'self_feeling',
        url: () => { console.log('Self-feeling')}
      },
      {
        id: 2,
        title: t('aside.mama.daily_rituals'),
        value: 'rituals',
        url: () => { console.log('daily rituals')}
      },
      {
        id: 3,
        title: t('aside.mama.personal_notes'),
        value: 'personal_notes',
        url: () => { console.log('Notes')}
      },
      {
        id: 4,
        title: t('aside.mama.timer'),
        value: 'timer',
        url: () => { console.log('5 min timer')}
      },
      {
        id: 5,
        title:  t('aside.mama.beauty_calendar'),
        value: 'beauty_calendar',
        url: () => { console.log('calendar beauty procedures')}
      },
    ]
  },
  {
    id: 2,
    title: t('aside.family.title'),
    value: 'family',
    url: () => { console.log( 'family')},
    links: [
      {
        id: 1,
        title: t('aside.family.family_events'),
        value: 'events',
        url: () => { console.log('Events')}
      },
      {
        id: 2,
        title: t('aside.family.plans'),
        value: 'plans',
        url: () => { console.log('Plans')}
      },
      {
        id: 3,
        title: t('aside.family.menu'),
        value: 'menu',
        url: () => { console.log('Menu')}
      },
      {
        id: 4,
        title: t('aside.family.chores'),
        value: 'chores',
        url: () => { console.log('Chores')}
      },
      {
        id: 5,
        title: t('aside.family.general_calendar'),
        value: 'general_calendar',
        url: () => { console.log('General calendar')}
      },
    ]
  },
  {
    id: 3,
    title: t('aside.children.title'),
    value: 'children',
    url: () => { console.log( 'children')},
    links: [
      {
        id: 1,
        title: t('aside.children.daily_routine'),
        value: 'daily_routine',
        url: () => { console.log('Daily routine')}
      },
      {
        id: 2,
        title: t('aside.children.activities'),
        value: 'activities',
        url: () => { console.log('Activities')}
      },
      {
        id: 3,
        title: t('aside.children.health'),
        value: 'health',
        url: () => { console.log('Health')}
      },
      {
        id: 4,
        title: t('aside.children.baby_diary'),
        value: 'baby_diary',
        url: () => { console.log('Baby diary')}
      },
      {
        id: 5,
        title: t('aside.children.children_notes'),
        value: 'children_notes',
        url: () => { console.log('Notes children')}
      },
    ]
  },
  {
    id: 4,
    title: t('aside.daily_routine.title'),
    value: 'daily_routine',
    url: () => { console.log( 'Daily routine')},
    links: [
      {
        id: 1,
        title: t('aside.daily_routine.daily_tasks'),
        value: 'daily_tasks',
        url: () => { console.log('Daily tasks')}
      },
      {
        id: 2,
        title: t('aside.daily_routine.weekly_tasks'),
        value: 'weekly_tasks',
        url: () => { console.log('Weekly tasks')}
      },
      {
        id: 3,
        title: t('aside.daily_routine.recurring_tasks'),
        value: 'recurring_tasks',
        url: () => { console.log('recurring tasks')}
      },
      {
        id: 4,
        title: t('aside.daily_routine.priority_tasks'),
        value: 'priority_tasks',
        url: () => { console.log('Priority tasks')}
      },
      {
        id: 5,
        title: t('aside.daily_routine.deferred_tasks'),
        value: 'deferred_tasks',
        url: () => { console.log('Deferred tasks')}
      },
    ]
  },
  {
    id: 5,
    title: t('aside.mental_health.title'),
    value: 'mental_health',
    url: () => { console.log( 'Mental health')},
    links: [
      {
        id: 1,
        title: t('aside.mental_health.diary'),
        value: 'diary',
        url: () => { console.log('Diary')}
      },
      {
        id: 2,
        title: t('aside.mental_health.meditations'),
        value: 'meditations',
        url: () => { console.log('Meditations')}
      },
      {
        id: 3,
        title: t('aside.mental_health.assistant'),
        value: 'assistant',
        url: () => { console.log('Assistant')}
      },
      {
        id: 4,
        title: t('aside.mental_health.favorite_books'),
        value: 'favorite_books',
        url: () => { console.log('Favorite books')}
      }
    ]
  }
]))
</script>

<template>
  <div class="flex items-start justify-start">
    <div class="p-5 bg-gradient-main h-full">
      <div v-for="menu in asideList" :key="menu.id+menu.title">
        <h2>{{ menu.title }}</h2>
        <ul>
          <li v-for="submenu in menu.links" :key="submenu.title">{{ submenu.title}}</li>
        </ul>
      </div>
    </div>
    <router-view />
  </div>

</template>

<style scoped>

</style>
