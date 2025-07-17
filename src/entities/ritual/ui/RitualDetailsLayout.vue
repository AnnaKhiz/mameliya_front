<script setup lang="ts">

</script>

<template>
  <div class="border border-brown-medium w-full h-full grid grid-cols-12">
    <div class="border border-brown-medium col-span-3 p-2">
      <slot name="content-left" />
    </div>
    <div class="border border-brown-medium col-span-9 p-2">
      <slot name="content-right" />
    </div>
  </div>
</template>

<style scoped>

</style>
