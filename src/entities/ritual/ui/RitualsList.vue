<script setup lang="ts">
import {useI18n} from "vue-i18n";
const { t } = useI18n();

import {
  RitualItemText,
  type RitualSectionType,
  type RitualType
} from "@/entities/ritual";

import imageMorningRituals from "@/shared/assets/images/morning_rituals.webp";
import imageEveningRituals from "@/shared/assets/images/evening_rituals.webp";
import imageFaceCare from "@/shared/assets/images/face_care.webp";
import imageMyRituals from "@/shared/assets/images/my_rituals.webp";
import imageHairCare from "@/shared/assets/images/hair_care.webp";
import imageBodyCare from "@/shared/assets/images/body_care.webp";
import imageNailsCare from "@/shared/assets/images/nails_care.webp";

import { computed, ref } from "vue";
import { RitualItem } from "@/entities/ritual";
import router from "@/app/router";

type Props = {
  menu: boolean;
  checkedMenu: RitualSectionType;
}
defineProps<Props>();
const emits = defineEmits(['update:checkedMenu']);
const hovered = ref<RitualSectionType>('none');
const onToggleHover = (value: RitualSectionType) => {
  hovered.value = value;
}
const goToPage = (value: RitualSectionType) => {
  emits('update:checkedMenu', value);
  router.push({ name: value})
}

const dailyRitualsList = computed(():RitualType[] => (
  [
    {
      id: 1,
      text: t('rituals.morning_rituals'),
      value: 'morning_rituals',
      image: imageMorningRituals,
      gridTemplate: 'col-span-2 row-span-2'
    },
    {
      id: 2,
      text: t('rituals.evening_rituals'),
      value: 'evening_rituals',
      image: imageEveningRituals,
      gridTemplate: 'col-span-4 row-span-2'
    },
    {
      id: 3,
      text: t('rituals.face_care'),
      value: 'face_care',
      image: imageFaceCare,
      gridTemplate: 'col-span-3 row-span-2'
    },
    {
      id: 4,
      text: t('rituals.my_rituals'),
      value: 'my_rituals',
      image: imageMyRituals,
      gridTemplate: 'col-span-3 row-span-4'
    },
    {
      id: 5,
      text: t('rituals.hair_care'),
      value: 'hair_care',
      image: imageHairCare,
      gridTemplate: 'col-span-4 row-span-2'
    },
    {
      id: 6,
      text: t('rituals.body_care'),
      value: 'body_care',
      image: imageBodyCare,
      gridTemplate: 'col-span-3 row-span-2'
    },
    {
      id: 7,
      text: t('rituals.nails_care'),
      value: 'nails_care',
      image: imageNailsCare,
      gridTemplate: 'col-span-2 row-span-2'
    },
  ]
));
</script>

<template>
  <main
    class="flex-1"
    :class="menu
        ? 'grid grid-cols-12 gap-1 grid-rows-4 max-h-screen self-stretch'
        : 'flex items-center justify-end'"
  >
    <div
      v-for="item in dailyRitualsList"
      :key="item.id+item.value"
      @mouseover="onToggleHover(item.value)"
      @mouseleave="onToggleHover('none')"
      @click="goToPage(item.value)"
      :class="item.gridTemplate"
    >
      <RitualItem v-if="menu" :item="item" :hovered="hovered" :menu="menu" />
      <RitualItemText v-else :item="item" :checked-menu="checkedMenu" />
    </div>

  </main>
</template>

