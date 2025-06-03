<script setup lang="ts">
import ModalComponent from "@/shared/ui/modal";
import { LogoMain } from "@/shared/ui/logo";
import {storeToRefs} from "pinia";
import {useBurgerMenuStore} from "@/shared/model/burgerMenuStore.ts";
const { isBurgerOpen } = storeToRefs(useBurgerMenuStore());
</script>

<template>
  <header class="sm:flex justify-between items-center xs:p-5 xs:block xs:relative bg-gradient">
    <LogoMain />
    <slot name="content" />
  </header>

  <!--  Modal Burger Dialog -->
  <ModalComponent :is-show="isBurgerOpen" >
    <template #content>
      <slot name="burger" />
    </template>
  </ModalComponent>
</template>
<style scoped>
.bg-gradient {
  background: linear-gradient(178deg, rgb(245 218 145) 10%, rgb(241 239 192 / 68%) 70%);
}
</style>
