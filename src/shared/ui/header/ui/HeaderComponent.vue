<script setup lang="ts">
import { LogoMain } from '@/shared/ui/logo';
import { AppButton } from '@/shared/ui/button';
import { useRouter } from 'vue-router';
import BurgerButton from '@/shared/ui/burger-button';

const router = useRouter();

const goToAboutPage = () => {
  router.push({ name: 'about'});
}

</script>

<template>
  <header class="sm:flex justify-between items-center xs:p-5 xs:block xs:relative">
    <LogoMain class="xs:m-auto xs:w-fit sm:m-0"  />
    <div class="sm:flex justify-between items-center sm:gap-4 xs:hidden ">
      <AppButton label="About" @click.prevent="goToAboutPage"/>
      <AppButton label="Sign in" />
    </div>
    <BurgerButton />
  </header>
</template>

