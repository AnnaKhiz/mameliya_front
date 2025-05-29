<script setup lang="ts">
import logoText from '@/shared/assets/images/logo_text.png';
import { useRouter } from 'vue-router'
const router = useRouter();
</script>

<template>
  <div class="h-10 w-auto w-full mb-4" @click="router.push({ name: 'home'})">
    <img :src="logoText" alt="logo text" class=" h-full w-auto object-cover">
  </div>
</template>

