<script setup lang="ts">
import { LogoMain } from '@/shared/ui/logo';
import { AppButton } from '@/shared/ui/button';
import { useRouter } from 'vue-router';
import { BurgerButton, BurgerContent } from '@/features/burger';
import ModalComponent from '@/shared/ui/modal';
import { useBurgerMenuStore } from '@/shared/model/burgerMenuStore.ts';
import { storeToRefs } from 'pinia';
import LanguageDropdown from "@/features/dropdown";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const router = useRouter();
const { isBurgerOpen } = storeToRefs(useBurgerMenuStore());

const goToAboutPage = () => {
  router.push({ name: 'about'});
}
const goToLoginPage = () => {
  router.push({ name: 'auth'});
}

</script>

<template>
  <header class="sm:flex justify-between items-center xs:p-5 xs:block xs:relative bg-gradient">
    <LogoMain  />
    <div class="sm:flex justify-between items-center sm:gap-4 xs:hidden ">
      <AppButton :label="t('general.about')" @click.prevent="goToAboutPage"/>
      <AppButton :label="t('general.signin')" @click.prevent="goToLoginPage"/>
      <LanguageDropdown />
    </div>
    <div class="sm:hidden xs:absolute top-5 right-5 flex justify-end gap-6 items-center">
      <LanguageDropdown />
      <BurgerButton  />
    </div>

  </header>

  <!--  Modal Burger Dialog -->
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
