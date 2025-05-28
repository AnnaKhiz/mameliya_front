<script setup lang="ts">
import { LogoMain } from '@/shared/ui/logo';
import { AppButton } from '@/shared/ui/button'
</script>

<template>
  <header class="flex justify-between items-center p-5">
    <LogoMain />
    <div class="flex justify-between items-center gap-4">
      <AppButton label="About" />
      <AppButton label="Sign in" />
    </div>
  </header>
</template>

