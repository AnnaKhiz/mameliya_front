<script setup lang="ts">
import { AppButton } from "@/shared/ui/button";
import type {CalendarEventType, DialogEventsType} from "@/entities/event";
import { useI18n } from "vue-i18n";
import { useGoogleEventStore } from "@/entities/event";
import {XMarkIcon} from "@heroicons/vue/16/solid";
import { splitDate } from "@/shared/lib/splitDate.ts";
import {onMounted, ref} from "vue";

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

  const { date, start, end } = splitDate({ eventStart: event.start, eventEnd: event.end || '' });
  const updatedFormData = {
    title: event.title || '',
    description: event.contentFull,
    date,
    start,
    end
  }
  emits('update:formEventData', updatedFormData);
}
const isEditable = ref<boolean>(false);
onMounted(() => {
  const { date } = splitDate({ eventStart: props.currentEvent.start, eventEnd: props.currentEvent.end || '' });
  const today = new Date();
  isEditable.value = new Date(date) < today;
})

</script>

<template>
  <section>
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
      <AppButton :label="t('general.edit')" @click="editEvent(props.currentEvent)" :disabled="isEditable" />
    </div>
  </section>
</template>

