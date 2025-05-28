<script setup lang="ts">
import ModalComponent from '@/shared/ui/modal';
</script>

<template>
  <ModalComponent>
    <template #content>
      <div class="absolute inset-y-0 bg-brown-dark w-[50%] transition-[width] duration-700 ease-in-out" >
        <p>About</p>
        <p>Sign in</p>
      </div>
    </template>
  </ModalComponent>
</template>

<style scoped>

</style>
