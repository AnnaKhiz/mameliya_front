<script setup lang="ts">
import {computed, onMounted, ref, watchEffect} from 'vue';
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router'
import FooterComponent from '@/shared/ui/footer'
import { MainHeader, UserHeader } from '@/shared/ui/header';
const currentRoute = ref<string>();
const route = useRoute();
import { useUserStore } from "@/entities/user";
import {storeToRefs} from "pinia";
const { user } = storeToRefs(useUserStore());
const { checkUserSession } = useUserStore();

watchEffect(() => {
  currentRoute.value = route.fullPath;
})

const isAuthenticated = computed(() => (currentRoute.value?.includes('user')));

onMounted(async () => {
  await checkUserSession();
})
</script>

<template>
  <MainHeader v-if="!isAuthenticated" />
  <UserHeader v-else />
  <router-view/>
  <footer-component />
</template>


