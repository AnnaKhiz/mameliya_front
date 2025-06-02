<script setup lang="ts">
import { AppButton } from '@/shared/ui/button';
import { useRouter } from 'vue-router';
import { BurgerButton, BurgerContent } from '@/features/burger';
import LanguageDropdown from "@/features/dropdown";
import { useI18n } from 'vue-i18n';
import HeaderLayout from "@/shared/ui/header/ui/HeaderLayout.vue";
const { t } = useI18n();

const router = useRouter();

const goToAboutPage = () => {
  router.push({ name: 'about'});
}
const goToLoginPage = () => {
  router.push({ name: 'auth'});
}

</script>

<template>
  <HeaderLayout>
    <template #content>
      <div class="sm:flex justify-between items-center sm:gap-4 xs:hidden ">
        <AppButton :label="t('general.about')" @click.prevent="goToAboutPage"/>
        <AppButton :label="t('general.signin')" @click.prevent="goToLoginPage"/>
        <LanguageDropdown />
      </div>
      <div class="sm:hidden xs:absolute top-5 right-5 flex justify-end gap-6 items-center">
        <LanguageDropdown />
        <BurgerButton  />
      </div>
    </template>

    <template #burger>
      <BurgerContent />
    </template>
  </HeaderLayout>
</template>


