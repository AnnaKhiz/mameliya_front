<script setup lang="ts">
import {useI18n} from "vue-i18n";

const { t } = useI18n();
import type {
  RitualSectionType,
  RitualType
} from "@/pages/rituals";

import imageBodyCare from "@/shared/assets/images/body_care.webp";
import imageHairCare from "@/shared/assets/images/hair_care.webp";
import imageNailsCare from "@/shared/assets/images/nails_care.webp";
import imageFaceCare from "@/shared/assets/images/face_care.webp";
import imageMyRituals from "@/shared/assets/images/my_rituals.webp";
import imageEveningRituals from "@/shared/assets/images/evening_rituals.webp";
import imageMorningRituals from "@/shared/assets/images/morning_rituals.webp";

import { computed, ref } from "vue";
import { useRouter } from "vue-router";
const isHovered = ref('');
const router = useRouter();

const onHover = (value: RitualSectionType) => {
  isHovered.value = value;
}
const onBlur = () => {
  isHovered.value = '';
}
const goToPage = (value: RitualSectionType) => {
  router.push({ name: `user-${value}`})
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
))
</script>

<template>
    <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('mama.daily_rituals') }}:</h2>
    <main class="flex-1 self-stretch grid grid-cols-12 gap-1 grid-rows-4 max-h-screen">
      <div
        v-for="item in dailyRitualsList"
        :key="item.id+item.value"
        @mouseover="onHover(item.value)"
        @mouseleave="onBlur"
        @click="goToPage(item.value)"
        :class="item.gridTemplate"
        class="relative hover:shadow-2xl cursor-pointer"
      >
        <img
          :src="item.image"
          :alt="`${item.value} image`"
          class="w-full h-full object-cover hover:brightness-50 transition duration-700 rounded-lg">
        <Transition :duration="700">
          <h2
            v-if="isHovered === item.value"
            class="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 font-bold text-xl text-white pointer-events-none"
          >
           {{ item.text }}
          </h2>
        </Transition>
      </div>
    </main>
</template>

<style scoped>

</style>
