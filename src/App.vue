<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import FooterComponent from '@/shared/ui/footer'
import { MainHeader, UserHeader } from '@/shared/ui/header';
import { useUserStore } from "@/entities/user";
import {storeToRefs} from "pinia";
import {useMamaStore} from "@/entities/mama";
const { isAuthenticated } = storeToRefs(useUserStore());
const { getMamaInfo } = useMamaStore()
const { checkUserSession, getNotificationsList } = useUserStore();

onMounted(async () => {
  await checkUserSession();
  await getNotificationsList();
  await getMamaInfo();
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


