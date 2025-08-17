<script setup lang="ts">


import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import {
  WeekDaysItem,
  type WeekGridItemType,
  type WeekValuesListType
} from "@/shared/ui/week-days-grid";

const { t } = useI18n();
type Props = {
  weekDaysList: WeekGridItemType[];
  isGrid: boolean;
  checkedMenu: WeekValuesListType;
}
defineProps<Props>();
const hovered = ref<WeekValuesListType>('none');
const emits = defineEmits(['update:checkedMenu']);
const onToggleHover = (value: WeekValuesListType) => {
  hovered.value = value;
}

const goToPage = (value: WeekValuesListType) => {
  emits('update:checkedMenu', value);
}
</script>

<template>
  <div :class=" isGrid ? 'flex justify-center items-center gap-2 flex-wrap' : ''">
    <div
      v-for="item in weekDaysList"
      :key="item.id"
      @mouseover="onToggleHover(item.value)"
      @mouseleave="onToggleHover('none')"
      @click="goToPage(item.value)"
      class="rounded-md "
      :class="isGrid ? 'w-1/6' : 'w-full'"
    >
      <WeekDaysItem
        :item="item"
        :hovered="hovered"
        :is-grid="isGrid"
        :checked-menu="checkedMenu"
        :class="!isGrid ? 'mb-2' : 'mb-0'"
      />
    </div>

  </div>
</template>

<style scoped>

</style>
