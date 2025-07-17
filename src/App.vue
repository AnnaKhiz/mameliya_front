<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import FooterComponent from '@/shared/ui/footer'
import { MainHeader, UserHeader } from '@/shared/ui/header';
import { useUserStore } from "@/entities/user";
import {storeToRefs} from "pinia";
const { isAuthenticated } = storeToRefs(useUserStore());
const { checkUserSession } = useUserStore();

onMounted(async () => {
  await checkUserSession();
})

</script>

<template>
  <MainHeader v-if="!isAuthenticated" />
  <UserHeader v-else />
  <div class="flex-grow h-fit">
    <router-view />
  </div>

  <footer-component />
</template>


