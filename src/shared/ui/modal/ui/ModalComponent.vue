<script setup lang="ts">
import { useBurgerMenuStore } from '@/shared/model/burgerMenuStore.ts';
import { storeToRefs } from 'pinia';
const { isBurgerOpen } = storeToRefs(useBurgerMenuStore());

</script>

<template>
  <teleport to="body">
    <Transition name="fade" >
      <div v-if="isBurgerOpen">
        <slot name="content" />
      </div>
    </Transition>
  </teleport>
</template>

<style >
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s linear;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
