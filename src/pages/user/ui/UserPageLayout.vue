<script setup lang="ts">
import { computed } from "vue";

const asideList = computed(() => ([
  {
    id: 1,
    title: 'Mama',
    value: 'mama',
    url: () => { console.log( 'mama')},
    links: [
      {
        id: 1,
        title: 'Self-feeling',
        value: 'self_feeling',
        url: () => { console.log('Self-feeling')}
      },
      {
        id: 2,
        title: 'Daily rituals',
        value: 'rituals',
        url: () => { console.log('daily rituals')}
      },
      {
        id: 3,
        title: 'Personal notes',
        value: 'personal_notes',
        url: () => { console.log('Notes')}
      },
      {
        id: 4,
        title: '5 min timer',
        value: 'timer',
        url: () => { console.log('5 min timer')}
      },
      {
        id: 5,
        title: 'Calendar beauty procedures',
        value: 'beauty_calendar',
        url: () => { console.log('calendar beauty procedures')}
      },
    ]
  },
  {
    id: 2,
    title: 'Family',
    value: 'family',
    url: () => { console.log( 'family')},
    links: [
      {
        id: 1,
        title: 'Family events',
        value: 'events',
        url: () => { console.log('Events')}
      },
      {
        id: 2,
        title: 'Weekend/weekly plans',
        value: 'plans',
        url: () => { console.log('Plans')}
      },
      {
        id: 3,
        title: 'Weekly/daily menu plans',
        value: 'menu',
        url: () => { console.log('Menu')}
      },
      {
        id: 4,
        title: 'Household chores, distribution of chores',
        value: 'chores',
        url: () => { console.log('Chores')}
      },
      {
        id: 5,
        title: 'General calendar',
        value: 'general_calendar',
        url: () => { console.log('General calendar')}
      },
    ]
  },
  {
    id: 3,
    title: 'Children',
    value: 'children',
    url: () => { console.log( 'children')},
    links: [
      {
        id: 1,
        title: 'Daily routine, schedule',
        value: 'daily_routine',
        url: () => { console.log('Daily routine')}
      },
      {
        id: 2,
        title: 'Activities',
        value: 'activities',
        url: () => { console.log('Activities')}
      },
      {
        id: 3,
        title: 'health, medicaments, vitamins',
        value: 'health',
        url: () => { console.log('Health')}
      },
      {
        id: 4,
        title: 'Baby diary: weight, height',
        value: 'baby_diary',
        url: () => { console.log('Baby diary')}
      },
      {
        id: 5,
        title: 'Notes',
        value: 'children_notes',
        url: () => { console.log('Notes children')}
      },
    ]
  },
  {
    id: 4,
    title: 'Daily routine',
    value: 'daily_routine',
    url: () => { console.log( 'Daily routine')},
    links: [
      {
        id: 1,
        title: 'Daily tasks',
        value: 'daily_tasks',
        url: () => { console.log('Daily tasks')}
      },
      {
        id: 2,
        title: 'Weekly tasks',
        value: 'weekly_tasks',
        url: () => { console.log('Weekly tasks')}
      },
      {
        id: 3,
        title: 'Recurring tasks',
        value: 'recurring_tasks',
        url: () => { console.log('recurring tasks')}
      },
      {
        id: 4,
        title: 'Priority tasks',
        value: 'priority_tasks',
        url: () => { console.log('Priority tasks')}
      },
      {
        id: 5,
        title: 'Deferred tasks',
        value: 'deferred_tasks',
        url: () => { console.log('Deferred tasks')}
      },
    ]
  },
  {
    id: 5,
    title: 'Mental health',
    value: 'mental_health',
    url: () => { console.log( 'Mental health')},
    links: [
      {
        id: 1,
        title: 'Diary',
        value: 'diary',
        url: () => { console.log('Diary')}
      },
      {
        id: 2,
        title: 'Meditations',
        value: 'meditations',
        url: () => { console.log('Meditations')}
      },
      {
        id: 3,
        title: 'AI assistant',
        value: 'assistant',
        url: () => { console.log('Assistant')}
      },
      {
        id: 4,
        title: 'Favorite books',
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
