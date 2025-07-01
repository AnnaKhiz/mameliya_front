<script setup lang="ts">
import { AppTextarea } from "@/shared/ui/form";
import { useI18n } from "vue-i18n";
import {ref} from "vue";
import {AppButton} from "@/shared/ui/button";
import {v4 as uuidv4} from "uuid";
import {type CalendarEventType, useUserStore} from "@/entities/user";

const { t } = useI18n();
const { addNewEventToCalendar, updateUserCalendarEvents } = useUserStore();

type PendingValueType = {
  event: CalendarEventType;
  resolve: ( event: CalendarEventType ) => {}
}

type Props = {
  pendingEvent: PendingValueType,
  resetForm: () => {}
}

type FormEventType = {
  title: string;
  description: string;
}

const props = defineProps<Props>();
const formEventData = defineModel<FormEventType>();
const message = ref<string>('');

const saveEventDescription = async () => {
  const { title, description } = formEventData.value as FormEventType;

  if (!title.trim() && !description.trim() && !props.pendingEvent?.event.start ) {
    message.value = 'Can not save empty fields';
    return;
  }

  const finalizedEvent = {
    ...props.pendingEvent.event,
    id: uuidv4(),
    title: formEventData.value?.title,
    contentFull: formEventData.value?.description,
  };
  console.log('finalizedEvent', finalizedEvent)

  props.pendingEvent?.resolve(finalizedEvent);

  const result = await addNewEventToCalendar({
    body: finalizedEvent,
    type: 'beauty'
  });

  if (!result.result) {
    message.value = 'Event not saved';
    return;
  }

  updateUserCalendarEvents({
    start: new Date(result.data.start.dateTime),
    end: new Date(result.data.end.dateTime),
    title: result.data.summary || 'No title',
    content: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="red" class="size-4">\n' +
      '  <path d="M2 6.342a3.375 3.375 0 0 1 6-2.088 3.375 3.375 0 0 1 5.997 2.26c-.063 2.134-1.618 3.76-2.955 4.784a14.437 14.437 0 0 1-2.676 1.61c-.02.01-.038.017-.05.022l-.014.006-.004.002h-.002a.75.75 0 0 1-.592.001h-.002l-.004-.003-.015-.006a5.528 5.528 0 0 1-.232-.107 14.395 14.395 0 0 1-2.535-1.557C3.564 10.22 1.999 8.558 1.999 6.38L2 6.342Z" />\n' +
      '</svg>\n',
    contentFull: result.data.description || '',
    backgroundColor: 'pink',
    color: '#523629',
    id: result.data.id,
    isAllDay: false
  });

  props.resetForm();
}

</script>

<template>
  <div class="bg-white p-5 rounded-md w-2/6 h-auto flex flex-col items-start justify-start gap-4">
    <h2 class="self-center">{{ t('mama.event.modal_title') }}</h2>
    <form action="" class="flex flex-col items-start justify-start gap-4 w-full">
      <div class="w-full">
        <h2 class="mb-2">{{ t('mama.event.modal_event_name') }}</h2>
        <input
          v-model="formEventData.title"
          type="text"
          class="w-full dark-mode placeholder:opacity-25"
          :placeholder="t('mama.event.enter_event_name')"
        />
      </div>
      <div class="w-full">
        <h2 class="mb-2">{{ t('mama.event.modal_event_description') }}</h2>
        <AppTextarea
          v-model="formEventData.description"
          :message="message"
          class="w-full"
          dark-mode
          placeholder-text="mama.event.enter_event_description"
        />
      </div>
    </form>
    <div class="flex justify-start items-center gap-4">
      <AppButton :label="t('general.close')" @click="resetForm" />
      <AppButton :label="t('general.save')" @click="saveEventDescription" />
    </div>
  </div>
</template>

<style scoped>

</style>
