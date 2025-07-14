<script setup lang="ts">
import { AppButton } from "@/shared/ui/button";
import {
  type ICalendarManager,
  type CalendarNames,
  type DialogEventsType
} from "@/entities/calendar";
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";

const { t } = useI18n();
const isEditable = ref<boolean>(false);

type Props = {
  dialog: DialogEventsType,
  closeDialogs: (value: DialogEventsType) => void,
  calendar: ICalendarManager,
  type: CalendarNames | 'all'
}

const props = defineProps<Props>();
const emits = defineEmits([
  'update:dialog',
  'removeFromCal',
  'update:formEventData'
]);

const handleDeleteEvent = async () => {
  emits('removeFromCal', true);
}
const editEvent = async () => {
  emits('update:dialog', 'edit');
  const updatedFormData = props.calendar.updateFormEventData();
  emits('update:formEventData', updatedFormData);
}

onMounted(() => {
  props.calendar.initStore();
  const today = new Date();
  const date = new Date(props.calendar.currentEvent?.start ?? '');

  isEditable.value = date < today;
})

</script>

<template>
  <section class="w-full">
    <div class="mb-4">
      <p>
        <span class="font-bold">{{ t('mama.calendar.title') }}</span>:
        {{ props.calendar.currentEvent?.title }}
      </p>
      <p>
        <span class="font-bold">{{ t('mama.calendar.description') }}</span>:
        {{ props.calendar.currentEvent?.contentFull  }}
      </p>
      <p>
        <span class="font-bold">{{ t('mama.calendar.date_start') }}</span>:
        {{ props.calendar.currentEvent?.start }}
      </p>
      <p>
        <span class="font-bold">{{ t('mama.calendar.date_end') }}</span>:
        {{ props.calendar.currentEvent?.end }}
      </p>
    </div>
    <div class="flex justify-start items-center gap-2 w-full flex-wrap">
      <AppButton :label="t('general.close')" @click="props.closeDialogs('none')" />
      <AppButton :label="t('general.delete')" @click="handleDeleteEvent" />
      <AppButton :label="t('general.edit')" @click="editEvent" :disabled="isEditable" />
    </div>
  </section>
</template>

