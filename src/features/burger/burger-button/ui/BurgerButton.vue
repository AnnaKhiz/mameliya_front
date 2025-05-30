<script setup lang="ts">
import { useBurgerMenuStore } from '@/shared/model/burgerMenuStore.ts';
import { storeToRefs } from 'pinia';

const { isBurgerOpen } = storeToRefs(useBurgerMenuStore());
const burgerStore = useBurgerMenuStore();
</script>

<template>
  <div
    class="bg-transparent w-10 flex flex-col gap-2 items-end "
    @click="burgerStore.isToggleButton"
  >
    <span
      class="h-1 w-full bg-brown-dark rounded"
    />
    <span
      class="h-1 bg-brown-dark transition-[width] duration-700 ease-in-out rounded"
      :class="`${ isBurgerOpen ? 'w-[50%]' : 'w-full'}`"
    />
    <span class="h-1 w-full bg-brown-dark rounded"/>
  </div>
</template>

