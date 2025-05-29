<script setup lang="ts">
import { LogoMain } from '@/shared/ui/logo';
import { AppButton } from '@/shared/ui/button';
import { useRouter } from 'vue-router';
import { BurgerButton, BurgerContent } from '@/features/burger';
import { ref } from 'vue';
import ModalComponent from '@/shared/ui/modal';

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
  <header class="sm:flex justify-between items-center xs:p-5 xs:block xs:relative bg-gradient">
    <LogoMain  />
    <div class="sm:flex justify-between items-center sm:gap-4 xs:hidden ">
      <AppButton label="About" @click.prevent="goToAboutPage"/>
      <AppButton label="Sign in" />
    </div>
    <BurgerButton class="sm:hidden" @update-burger="handleToggleBurger" />
  </header>

  <!--  Modal Dialog -->
  <ModalComponent :is-clicked="isClicked" >
    <template #content>
      <BurgerContent />
    </template>
  </ModalComponent>
</template>

<style scoped>
.bg-gradient {
  background: linear-gradient(178deg, rgb(245 218 145) 10%, rgb(241 239 192 / 68%) 70%);
}
</style>
