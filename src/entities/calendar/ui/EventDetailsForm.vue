<script setup lang="ts">
import { AppButton } from "@/shared/ui/button";
import type {DialogEventsType} from "@/entities/calendar";
import { useI18n } from "vue-i18n";
import { calendar } from "@/entities/calendar";

import {onMounted, ref} from "vue";

const { t } = useI18n();
const isEditable = ref<boolean>(false);

type Props = {
  dialog: DialogEventsType,
  closeDialogs: (value: string) => void,
}

const props = defineProps<Props>();
const emits = defineEmits(['update:dialog','removeFromCal','update:currentEvent','update:formEventData']);

const handleDeleteEvent = async () => {
  emits('removeFromCal', true);
}
const editEvent = async () => {
  emits('update:dialog', 'edit');
  const updatedFormData = calendar.updateFormEventData();
  emits('update:formEventData', updatedFormData);
}


onMounted(() => {
  calendar.initStore();
  const today = new Date();
  const date = new Date(calendar.currentEvent?.start ?? '');

  isEditable.value = date < today;
})

</script>

<template>
  <section>
    <div class="mb-4">
      <p>
        <span class="font-bold">{{ t('mama.calendar.title') }}</span>:
        {{ calendar.currentEvent?.title }}
      </p>
      <p>
        <span class="font-bold">{{ t('mama.calendar.description') }}</span>:
        {{ calendar.currentEvent?.contentFull  }}
      </p>
      <p>
        <span class="font-bold">{{ t('mama.calendar.date_start') }}</span>:
        {{ calendar.currentEvent?.start }}
      </p>
      <p>
        <span class="font-bold">{{ t('mama.calendar.date_end') }}</span>:
        {{ calendar.currentEvent?.end }}
      </p>
    </div>
    <div class="flex justify-start items-center gap-2 w-full">
      <AppButton :label="t('general.close')" @click="props.closeDialogs('none')" />
      <AppButton :label="t('general.delete')" @click="handleDeleteEvent" />
      <AppButton :label="t('general.edit')" @click="editEvent" :disabled="isEditable" />
    </div>
  </section>
</template>

