<script setup lang="ts">
import { ref } from "vue";
import type { DiaryObjectType } from "@/entities/mama";
import ModalComponent from "@/shared/ui/modal";
import { parseDateToLocaleString } from "@/shared/lib/parseDateToLocaleString.ts";
import {type DialogDiaryTypes, DiaryItemDetails} from "@/pages/mama";
import {AppButton} from "@/shared/ui/button";
import {useI18n} from "vue-i18n";
const { t } = useI18n();

const dialog = ref<DialogDiaryTypes>('none');
type Props = {
  item: DiaryObjectType;
}

defineProps<Props>();

const openDetails = () => {
  dialog.value = 'details';
}
</script>

<template>
  <div
    class="flex justify-between items-start gap-4 text-brown-dark bg-brown-light/15 hover:bg-brown-medium/15 hover:shadow-xl transition-all duration-500 hover:cursor-pointer rounded-md shadow-md p-2 "
    @click="openDetails"
  >
    <div class="flex justify-start items-center gap-4">

      <p class="w-32 p-2">
        {{ item.title }}
      </p>

      <p class="truncate-html " v-html="item.description"></p>
    </div>
    <div>
      <p class="text-brown-medium opacity-65 text-end">{{ parseDateToLocaleString(item.created_at)[0] }}</p>
      <p class="text-brown-medium opacity-65 text-end">{{ parseDateToLocaleString(item.created_at)[1] }}</p>
    </div>
  </div>

  <!--  dialog add calendar -->
  <ModalComponent
    :show="dialog === 'details'"
    full
    :title="item.title"
    :width="'w-1/2'"
    @update:dialog-visibility="dialog = $event"
  >
    <template #default>
      <DiaryItemDetails :item="item" class="mb-4" />
    </template>

    <template #actions>
     <div class="flex justify-center items-center gap-4">
       <AppButton :label="t('general.close')" @click="dialog = 'none'"/>
       <AppButton :label="t('general.edit')" />
       <AppButton :label="t('general.delete')" />
     </div>
    </template>
  </ModalComponent>
</template>

<style scoped>
.truncate-html {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
