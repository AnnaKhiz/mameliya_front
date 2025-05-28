<script setup lang="ts">
import { LogoMain } from '@/shared/ui/logo';
import { AppButton } from '@/shared/ui/button';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToAboutPage = () => {
  router.push({ name: 'about'});
}
</script>

<template>
  <header class="flex justify-between items-center p-5">
    <LogoMain />
    <div class="flex justify-between items-center gap-4">
      <AppButton label="About" @click.prevent="goToAboutPage"/>
      <AppButton label="Sign in" />
    </div>
  </header>
</template>

