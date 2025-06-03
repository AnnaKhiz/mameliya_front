<script setup lang="ts">
import {computed, ref, watchEffect} from 'vue';
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router'
import FooterComponent from '@/shared/ui/footer'
import { MainHeader, UserHeader } from '@/shared/ui/header';
const currentRoute = ref<string>();
const route = useRoute();

watchEffect(() => {
  currentRoute.value = route.fullPath;
})

const isAuthenticated = computed(() => (currentRoute.value?.includes('user')))
</script>

<template>
  <MainHeader v-if="!isAuthenticated" />
  <UserHeader v-else />
  <router-view/>
  <footer-component />
</template>


