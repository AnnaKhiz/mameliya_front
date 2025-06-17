<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {onMounted, watch} from "vue";
import { useUserStore } from "@/entities/user";
import {AppButton} from "@/shared/ui/button";
const { googleCalendarEvents } = useUserStore();
import { useRoute } from 'vue-router'
const route = useRoute();
const { t } = useI18n();

const connectGoogleCalendar = () => {
  window.location.href = 'http://localhost:3000/user/google/check';
}

watch(() => route, (value) => {
  console.log(value)
}, { deep: true })

onMounted(async () => {

  // const { result } = await googleCalendarAuthCheck();
  // console.log('result', result)
})
</script>

<template>
  <div class="flex flex-col justify-start items-start h-full overflow-hidden p-5">
    <div>
      <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('mama.beauty_calendar') }}:</h2>
      <AppButton label="connect Google Calendar" class="mb-4" @click.prevent="connectGoogleCalendar" ></AppButton>
      <AppButton label="get Google Calendar Events" @click.prevent="googleCalendarEvents" ></AppButton>
    </div>
  </div>
</template>

<style scoped>

</style>
