<script setup lang="ts">
import logoImage from '@/shared/assets/images/logo_img.png';
import logoText from '@/shared/assets/images/logo_text.png';
import { useRouter } from 'vue-router'
const router = useRouter();
</script>

<template>
  <div
    class="flex items-center gap-2 cursor-pointer"
    @click="router.push({ name: 'home'})"
  >
    <img
      :src="logoImage"
      alt="logo image"
      class="w-20 h-full object-contain"
    >
    <img
      :src="logoText"
      alt="logo text"
      class="h-16
      object-contain"
    >
  </div>
</template>
