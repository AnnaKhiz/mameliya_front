<script setup lang="ts">
import { AppTextarea } from "@/shared/ui/form";
import { useI18n } from "vue-i18n";
import { ref, type Ref} from "vue";
import {AppButton} from "@/shared/ui/button";
import { useGoogleEventStore } from "@/entities/event";
import {type CalendarEventType} from "@/entities/user";

const { t } = useI18n();
const { addNewEventToCalendar } = useGoogleEventStore();

type PendingValueType = {
  event: CalendarEventType;
  resolve: ( event: CalendarEventType ) => {}
}

type Props = {
  pendingEvent: PendingValueType | null,
  resetForm: () => void,
}

type FormEventType = {
  title: string;
  description: string;
}

const props = defineProps<Props>();
const formEventData = defineModel<FormEventType>() as Ref<FormEventType>;
const message = ref<string>('');

const saveEventDescription = async () => {
  const { title, description } = formEventData.value as FormEventType;

  if (!title.trim() && !description.trim() && !props.pendingEvent?.event.start ) {
    message.value = 'Can not save empty fields';
    return;
  }

  const finalizedEvent: CalendarEventType = {
    ...props.pendingEvent?.event,
    start: props.pendingEvent?.event.start || '',
    title: formEventData.value?.title,
    contentFull: formEventData.value?.description,
  };

  props.pendingEvent?.resolve(finalizedEvent);

  const result = await addNewEventToCalendar({
    body: finalizedEvent,
    type: 'beauty'
  });

  if (!result.result) {
    message.value = 'Event not saved';
  }

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
          :is-reset="false"
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
