<script setup lang="ts">
import logoImage from '@/shared/assets/images/logo_img.png';
import logoText from '@/shared/assets/images/logo_text.png';
import { useRouter } from 'vue-router'
import {storeToRefs} from "pinia";
import {useUserStore} from "@/entities/user";
const router = useRouter();
const { isAuthenticated, user } = storeToRefs(useUserStore());
const goToHomePage = () => {
  if (isAuthenticated.value) {
    router.push({ name: 'user-home', params: { id: user?.value?.userId }})
  } else {
    router.push({ name: 'home'});
  }
}
</script>

<template>
  <div
    class="flex items-center gap-2 cursor-pointer"
    @click="goToHomePage"
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
