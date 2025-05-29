<script setup lang="ts">
import { LogoMain } from '@/shared/ui/logo';
import { AppButton } from '@/shared/ui/button';
import { useRouter } from 'vue-router';
import { BurgerButton, BurgerContent } from '@/features/burger';
import ModalComponent from '@/shared/ui/modal';
import { useBurgerMenuStore } from '@/shared/model/burgerMenuStore.ts';
import { storeToRefs } from 'pinia';
const router = useRouter();
const { isBurgerOpen } = storeToRefs(useBurgerMenuStore());
const goToAboutPage = () => {
  router.push({ name: 'about'});
}

</script>

<template>
  <header class="sm:flex justify-between items-center xs:p-5 xs:block xs:relative bg-gradient">
    <LogoMain  />
    <div class="sm:flex justify-between items-center sm:gap-4 xs:hidden ">
      <AppButton label="О нас" @click.prevent="goToAboutPage"/>
      <AppButton label="Войти" />
    </div>
    <BurgerButton class="sm:hidden" />
  </header>

  <!--  Modal Dialog -->
  <ModalComponent :is-show="isBurgerOpen" >
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
