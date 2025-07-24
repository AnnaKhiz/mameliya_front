<script setup lang="ts">
import { ref, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const sliderCurrent = ref<string>('first');
const sliderList = computed(() => ([
  {
    text: t('home.mama.title'),
    value: 'mama',
    description: t('home.mama.description'),
    img: 'mama.webp'
  },
  {
    text: t('home.family.title'),
    value: 'family',
    description: t('home.family.description'),
    img: 'family.webp',
  },
  {
    text: t('home.children.title'),
    value: 'children',
    description: t('home.children.description'),
    img: 'children.webp',
  },
  {
    text: t('home.mental_health.title'),
    value: 'mental_health',
    description: t('home.mental_health.description'),
    img: 'mental_health.webp',
  },
  {
    text: t('home.rituals.title'),
    value: 'rituals',
    description: t('home.rituals.description'),
    img: 'rituals.webp',
  }
]))

</script>

<template>
  <main class="flex justify-center items-center bg-gradient-main flex-1 self-stretch h-full">
    <Swiper
      :slides-per-view="1"
      :loop="true"
      :modules="[Navigation]"
      navigation
      class="cursor-pointer w-full h-full"
    >
      <SwiperSlide
        v-for="item in sliderList"
        :key="item.value"
        @click="sliderCurrent = item.value"
        class="flex justify-center items-center h-full"
      >
        <div class="flex sm:flex-row xs:justify-between h-full xs:flex-col xs:items-stretch lg:items-center " >
          <div class="p-5 xl:pl-10 lg:w-[40%] sm:h-full xl:h-fit xs:pl-5 xs:w-full lg:text-left">
            <p class="mb-5 font-semibold xl:text-xl xs:text-base">{{ item.text }}</p>
            <p class="whitespace-pre-line xl:text-lg xs:text-base" >{{ item.description }}</p>
          </div>

          <div class="lg:w-[70%] xs:h-[400px] sm:h-full overflow-hidden" >
            <img :src="`../../src/shared/assets/images/${item.img}`" alt="slider image" class="w-full h-full object-cover lg:aspect-video"/>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </main>

</template>

<style scoped>
::v-deep .swiper-button-prev::after,
::v-deep .swiper-button-next::after {
  display: none;
}
</style>
