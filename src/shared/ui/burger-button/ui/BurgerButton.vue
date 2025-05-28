<script setup lang="ts">
import { ref } from 'vue'

const isClicked = ref<boolean>(false);
const handleBurgerButtonChange = () => {
  isClicked.value = !isClicked.value;
}
</script>

<template>
  <div
    class="bg-transparent w-10 flex flex-col gap-2 items-end xs:absolute top-5 right-5"
    @click="handleBurgerButtonChange"
  >
    <span
      class="h-1 w-full bg-brown-dark rounded"
    />
    <span
      class="h-1 w-full bg-brown-dark transition-[width] duration-700 ease-in-out rounded"
      :class="{ 'w-[50%]' : isClicked }"
    />
    <span class="h-1 w-full bg-brown-dark rounded"/>
  </div>
</template>

