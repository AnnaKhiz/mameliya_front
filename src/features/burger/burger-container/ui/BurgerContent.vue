<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBurgerMenuStore } from '@/shared/model/burgerMenuStore.ts';
const burgerStore = useBurgerMenuStore();
const router = useRouter();

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
const handleMenuClick = (link: string) => {
  router.push({ name: link });
  burgerStore.closeBurger();
}
</script>

<template>
  <div class="absolute inset-x-0 h-[50%] bottom-0 w-full bg-brown-dark px-3 py-8 z-10" >
    <p
      v-for="item in burgerMenuList"
      :key="item.value"
      class="p-4 text-center bg-brown-light mb-4 cursor-pointer hover:bg-brown-medium transition duration-500 rounded hover:text-white"
      @click="handleMenuClick(item.value)"
    >
      {{ item.text }}</p>
  </div>
</template>

