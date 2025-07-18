<script setup lang="ts">
import {
  CheckCircleIcon,
  ChevronDoubleUpIcon,
  PlusCircleIcon,
  StarIcon
} from "@heroicons/vue/16/solid";
import { useRitualStore } from "@/entities/ritual/model/useRitualStore.ts";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";
const {
  openAddRitualForm,
  toggleIsChecked,
  toggleIsCheckedMultiple,
  saveToMyRituals
} = useRitualStore();
const {
  isChecked,
  anyChecked,
  allChecked,
  isAddNewForm,
} = storeToRefs(useRitualStore());
const { t } = useI18n();
type Props = {
  isAddIcon: boolean;
}
defineProps<Props>();
</script>

<template>
  <div class="mb-2 flex items-center gap-1 border-b border-brown-medium/20" :class="isAddIcon ? 'justify-between ' : 'justify-end'">
    <PlusCircleIcon
      v-if="isAddIcon"
      class="w-8 p-1 outline-none fill-brown-medium hover:fill-brown-dark hover:bg-brown-light/40 hover:rounded hover:cursor-pointer transition duration-500"
      @click="openAddRitualForm"
      v-tooltip="isAddNewForm ? t('rituals.hide_add_new_ritual') : t('rituals.add_new_title')"
    />
    <div class="mb-2 flex items-center justify-end gap-1">
      <ChevronDoubleUpIcon
        @click="toggleIsChecked"
        :class="isChecked ? 'rotate-180' : ''"
        class="w-8 p-1 outline-none fill-brown-medium hover:fill-brown-dark hover:rounded hover:cursor-pointer hover:bg-brown-light/40 transition duration-500"
        v-tooltip="isChecked ? t('rituals.hide_checkboxes') :  t('rituals.show_checkboxes')"
      />
      <CheckCircleIcon
        class="w-8 p-1 outline-none fill-brown-medium hover:fill-brown-dark hover:bg-brown-light/40 hover:rounded hover:cursor-pointer transition duration-500"
        @click="toggleIsCheckedMultiple"
        v-tooltip="allChecked ? t('rituals.uncheck_all') : t('rituals.check_all')"
      />
      <StarIcon
        v-if="anyChecked"
        class="w-8 p-1 outline-none fill-brown-medium hover:fill-brown-dark hover:bg-brown-light/40 hover:rounded hover:cursor-pointer transition duration-500"
        @click="saveToMyRituals"
        v-tooltip="t('rituals.add_to_my_rituals')"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
