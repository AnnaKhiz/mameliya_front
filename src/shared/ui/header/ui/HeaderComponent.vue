<script setup lang="ts">
import { LogoMain } from '@/shared/ui/logo';
import { AppButton } from '@/shared/ui/button';
import { useRouter } from 'vue-router';
import { BurgerButton, BurgerContainer } from '@/features/burger'
import { ref } from 'vue'

const router = useRouter();

const goToAboutPage = () => {
  router.push({ name: 'about'});
}
const isClicked = ref<boolean>(false);
const handleToggleBurger = (event: boolean) => {
  isClicked.value = event;
}
</script>

<template>
  <header class="sm:flex justify-between items-center xs:p-5 xs:block xs:relative">
    <LogoMain class="xs:m-auto xs:w-fit sm:m-0"  />
    <div class="sm:flex justify-between items-center sm:gap-4 xs:hidden ">
      <AppButton label="About" @click.prevent="goToAboutPage"/>
      <AppButton label="Sign in" />
    </div>
    <BurgerButton @update-burger="handleToggleBurger" />
  </header>
  <BurgerContainer v-if="isClicked" :is-clicked="isClicked" />
</template>


