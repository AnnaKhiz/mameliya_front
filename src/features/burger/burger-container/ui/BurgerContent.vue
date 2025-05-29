<script setup lang="ts">
import { ref } from 'vue';
const burgerMenuList = ref([
  {
    text: 'About',
    value: 'about',
  },
  {
    text: 'Sign in',
    value: 'signin',
  }
])

</script>

<template>
  <div class="absolute inset-x-0 h-[50%] bottom-0 w-full bg-brown-dark px-3 py-8 z-10" >
    <p
      v-for="item in burgerMenuList"
      :key="item.value"
      class="p-4 text-center bg-brown-light mb-4 cursor-pointer hover:bg-brown-medium transition duration-500 rounded hover:text-white"
    >
      {{ item.text }}</p>
  </div>
</template>

<style scoped>

</style>
