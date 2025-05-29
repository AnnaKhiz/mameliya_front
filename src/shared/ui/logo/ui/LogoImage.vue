<script setup lang="ts">
import logoImage from '@/shared/assets/images/logo_img.png';
import { useRouter } from 'vue-router'
const router = useRouter();
</script>

<template>
  <div class="w-20 h-20 cursor-pointer" @click="router.push({ name: 'home'})">
    <img :src="logoImage" alt="logo text" class="h-full w-auto object-cover m-auto">
  </div>
</template>
