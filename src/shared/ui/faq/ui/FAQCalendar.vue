<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { AppButton } from "@/shared/ui/button";
import ModalComponent from "@/shared/ui/modal";
const { t } = useI18n();

const emit = defineEmits(['update:dialogVisibility']);

const changeDialogState = () => {
  emit('update:dialogVisibility', 'none');
}

</script>

<template>
  <ModalComponent
    full
    :title="t('mama.how_to_use')"
    :width="'w-4/6'"
    @update:dialog-visibility="changeDialogState"
  >
    <template #default>
      <section class="w-full">
        <div class="w-full flex flex-col items-start justify-start gap-3 px-5 pb-5 whitespace-pre-line">
          <p><span class="font-semibold">1.</span> {{ t('mama.calendar.instruction_1') }} </p>
          <p><span class="font-semibold">2.</span> {{ t('mama.calendar.instruction_2') }} </p>
          <p><span class="font-semibold">3.</span> {{ t('mama.calendar.instruction_3') }} </p>
          <p><span class="font-semibold">4.</span> {{ t('mama.calendar.instruction_4') }} </p>
          <p><span class="font-semibold">3.</span> {{ t('mama.calendar.instruction_5') }} </p>
          <p><span class="font-semibold">4.</span> {{ t('mama.calendar.instruction_5') }} </p>
          <p><span class="font-semibold">5.</span> {{ t('mama.calendar.instruction_7') }} </p>
        </div>
        <div class="flex justify-start items-center gap-2 w-full">
          <AppButton :label="t('general.close')" @click="changeDialogState" />
        </div>
      </section>
    </template>
  </ModalComponent>
</template>

