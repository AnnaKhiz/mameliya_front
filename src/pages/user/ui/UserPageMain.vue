<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from 'vue';
import {useUserStore} from "@/entities/user";
import {storeToRefs} from "pinia";
const isHovered = ref('');
const router = useRouter();
const { user } = storeToRefs(useUserStore());

type SectionType = 'mama' | 'family' | 'children' | 'mental-health' | 'rituals';
const onHover = (value: SectionType) => {
  isHovered.value = value;
}
const onBlur = () => {
  isHovered.value = '';
}

const goToPage = (value: SectionType) => {
  router.push({ name: `user-${value}`, params: { id: user?.value?.userId}})
}
</script>

<template>
  <main class="bg-gradient-main flex-1 self-stretch grid grid-cols-12 grid-rows-4 gap-4 p-5 max-h-screen">

    <div
      @mouseover="onHover('mama')"
      @mouseleave="onBlur"
      @click="goToPage('mama')"
      class="col-span-4 row-span-4 cursor-pointer relative hover:shadow-2xl"
    >
      <img
        :src="`../../src/shared/assets/images/mama.webp`"
        alt="chapter image"
        class="w-full h-full object-cover rounded-lg hover:brightness-50 transition duration-700"
      />
      <Transition duration="700">
        <h2
          v-if="isHovered === 'mama'"
          class="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 font-bold text-3xl text-white"
        >
          Mama
        </h2>
      </Transition>

    </div>

    <div
      @mouseover="onHover('family')"
      @mouseleave="onBlur"
      @click="goToPage('family')"
      class="col-span-5 row-span-2 cursor-pointer relative hover:shadow-2xl"
    >
      <img
        :src="`../../src/shared/assets/images/family.webp`"
         alt="chapter image"
         class="w-full h-full object-cover rounded-lg hover:brightness-50  transition duration-700"
      />
      <Transition duration="700">
        <h2
          v-if="isHovered === 'family'"
          class="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4  font-bold text-3xl text-white"
        >
          Family
        </h2>
      </Transition>
    </div>
    <div
      @mouseover="onHover('children')"
      @mouseleave="onBlur"
      @click="goToPage('children')"
      class="col-span-3 row-span-2 cursor-pointer relative hover:shadow-2xl">
      <img
        :src="`../../src/shared/assets/images/children.webp`"
        alt="chapter image"
        class="w-full h-full object-cover rounded-lg hover:brightness-50 transition duration-700"
      />
      <Transition duration="700">
        <h2
          v-if="isHovered === 'children'"
          class="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4  font-bold text-3xl text-white"
        >
          Children
        </h2>
      </Transition>
    </div>
    <div
      @mouseover="onHover('mental-health')"
      @mouseleave="onBlur"
      @click="goToPage('mental-health')"
      class="col-span-3 row-span-2 cursor-pointer relative hover:shadow-2xl">
      <img
        :src="`../../src/shared/assets/images/mental_health.webp`"
        alt="chapter image"
        class="w-full h-full object-cover rounded-lg hover:brightness-50 transition duration-700"
      />
      <Transition duration="700">
        <h2
          v-if="isHovered === 'mental-health'"
          class="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4  font-bold text-3xl text-white w-fit"
        >
          Mental health
        </h2>
      </Transition>
    </div>
    <div
      @mouseover="onHover('rituals')"
      @mouseleave="onBlur"
      @click="goToPage('rituals')"
      class="col-span-5 row-span-2 cursor-pointer relative hover:shadow-2xl">
      <img
        :src="`../../src/shared/assets/images/rituals.webp`"
        alt="chapter image"
        class="w-full h-full object-cover rounded-lg hover:brightness-50 transition duration-700"
      />
      <Transition duration="700">
        <h2
          v-if="isHovered === 'rituals'"
          class="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4  font-bold text-3xl text-white"
        >
          Rituals
        </h2>
      </Transition>
    </div>

  </main>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
