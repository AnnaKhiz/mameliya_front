<script setup lang="ts">
import {RitualDetailsPage, type RitualSectionType, RitualsList} from "@/entities/ritual";
import { useI18n } from "vue-i18n";
import {ref} from "vue";

import {ChevronLeftIcon} from "@heroicons/vue/16/solid";
import router from "@/app/router";
const { t } = useI18n();

const checkedMenu = ref<RitualSectionType>('none');

const handleCheckedMenu = (value: RitualSectionType) => {
  checkedMenu.value = value;
}

const goBack = () => {
  handleCheckedMenu('none');
  router.push({ name: 'user-daily_rituals'});
}

</script>

<template>
  <div class="flex items-center justify-between w-full mb-5">
    <ChevronLeftIcon
      v-if="checkedMenu !== 'none'"
      @click="goBack"
      class="w-8 fill-brown-dark cursor-pointer hover:fill-brown-medium outline-none"
      v-tooltip="t('general.back')"
    />
    <RitualsList
      :menu="checkedMenu === 'none'"
      :checked-menu="checkedMenu"
      @update:checked-menu="handleCheckedMenu"
    />
  </div>
  <RitualDetailsPage
    v-if="checkedMenu !== 'none'"
    :checked-menu="checkedMenu"
  />

</template>

