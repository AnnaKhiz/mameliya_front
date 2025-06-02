<script setup lang="ts">
import {BurgerButton} from "@/features/burger";
import {AppButton} from "@/shared/ui/button";
import LanguageDropdown from "@/features/dropdown";
import HeaderLayout from "@/shared/ui/header/ui/HeaderLayout.vue";
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import { useUserStore } from "@/entities/user";
const { logOutUser } = useUserStore();

const { t } = useI18n();

const router = useRouter();

const goToAboutPage = () => {
  router.push({ name: 'about'});
}
const handleLogOut = async () => {
  await logOutUser();
  await router.push({ name: 'home'});
}
</script>

<template>
  <HeaderLayout>
    <template #content>
      <div>here is user header</div>
      <div class="sm:flex justify-between items-center sm:gap-4 xs:hidden ">
        <AppButton :label="t('general.about')" @click.prevent="goToAboutPage"/>
        <AppButton :label="t('general.logout')" @click.prevent="handleLogOut"/>
        <LanguageDropdown />
      </div>
      <div class="sm:hidden xs:absolute top-5 right-5 flex justify-end gap-6 items-center">
        <LanguageDropdown />
        <BurgerButton  />
      </div>
    </template>

    <template #burger>
<!--      <BurgerContent />-->
    </template>
  </HeaderLayout>
</template>

<style scoped>

</style>
