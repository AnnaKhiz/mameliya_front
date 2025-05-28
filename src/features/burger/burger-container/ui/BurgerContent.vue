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
  <div class="absolute inset-y-0 w-[50%] bg-brown-dark px-3 py-5" >
    <p
      v-for="item in burgerMenuList"
      :key="item.value"
      class="p-2.5 text-center bg-brown-light mb-2 cursor-pointer hover:bg-brown-medium transition duration-500 rounded hover:text-white"
    >
      {{ item.text }}</p>
  </div>
</template>

<style scoped>

</style>
