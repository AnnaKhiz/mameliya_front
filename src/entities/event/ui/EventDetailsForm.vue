<script setup lang="ts">
import { AppButton } from "@/shared/ui/button";
import type {CalendarEventType, DialogEventsType} from "@/entities/event";
import { useI18n } from "vue-i18n";
import { useGoogleEventStore } from "@/entities/event";
const { removeGoogleCalendarEvent } = useGoogleEventStore();
const { t } = useI18n();

type Props = {
  currentEvent: CalendarEventType,
  dialog: DialogEventsType,
  closeDialogs: () => void,
}

const props = defineProps<Props>();
const emits = defineEmits(['update:dialog','removeFromCal','update:currentEvent','update:formEventData']);

const deleteEvent = async (id: string) => {
  await removeGoogleCalendarEvent({ type: 'beauty', eventId: id});
  emits('removeFromCal', id)
  props.closeDialogs()
}
const editEvent = async (event: CalendarEventType) => {
  emits('update:dialog', 'edit');
  emits('update:currentEvent', event);

  const updatedFormData = {
    title: event.title || '',
    description: event.contentFull,
    date: event.start.toString().split(' ')[0],
    start: event.start.toString().split(' ')[1],
    end: event.end?.toString().split(' ')[1] || ''
  }
  emits('update:formEventData', updatedFormData);
}


</script>

<template>
  <div class="bg-white text-brown-dark p-5 rounded-md w-2/6 h-auto flex flex-col items-start justify-start gap-4">
    <h2 class="self-center font-bold text-xl w-full p-2 text-center">{{ t('mama.event.modal_title') }}</h2>
    <div class="mb-4">
      <p>
        <span class="font-bold">{{ t('mama.event.title') }}</span>:
        {{ props.currentEvent.title }}
      </p>
      <p>
        <span class="font-bold">{{ t('mama.event.description') }}</span>:
        {{ props.currentEvent.contentFull  }}
      </p>
      <p>
        <span class="font-bold">{{ t('mama.event.date_start') }}</span>:
        {{ props.currentEvent.start }}
      </p>
      <p>
        <span class="font-bold">{{ t('mama.event.date_end') }}</span>:
        {{ props.currentEvent.end }}
      </p>
    </div>
    <div class="flex justify-start items-center gap-2 w-full">
      <AppButton :label="t('general.close')" @click="props.closeDialogs" />
      <AppButton :label="t('general.delete')" @click="deleteEvent(props.currentEvent.id)" />
      <AppButton :label="t('general.edit')" @click="editEvent(props.currentEvent)" />
    </div>
  </div>
</template>

<style scoped>

</style>
