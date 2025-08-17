<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const tabTitleList = ref([
  {
    id: 1,
    title: 'All',
    value: 'all',
    isChecked: true,
  },
  {
    id: 2,
    title: 'Urgent',
    value: 'urgent',
    isChecked: false,
  },
  {
    id: 3,
    title: 'Important',
    value: 'important',
    isChecked: false,
  },
  {
    id: 4,
    title: 'Normal',
    value: 'normal',
    isChecked: false,
  },
  {
    id: 5,
    title: 'Weekends',
    value: 'weekends',
    isChecked: false,
  },
  {
    id: 6,
    title: 'Done',
    value: 'done',
    isChecked: false,
  }
]);
const emits = defineEmits(['update:content']);
const switchTab = (value: string) => {
  const tabListCopy = [...tabTitleList.value]
  tabTitleList.value = tabListCopy.map(e => e.value === value ? { ...e, isChecked: true } : { ...e, isChecked: false });
  console.log(tabTitleList.value);
  emits('update:content', value)
}
</script>

<template>
  <div class="text-white flex justify-start items-center">
    <p
      v-for="item in tabTitleList"
      :key="item.id"
      class="p-2 border border-brown-dark w-32 rounded-t-lg hover:cursor-pointer hover:bg-brown-dark"
      :class="item.isChecked ? 'bg-brown-dark' : 'bg-brown-medium'"
      @click="switchTab(item.value)"
    >
      {{ t(`family.${item.value}`) }}
    </p>
  </div>
</template>
