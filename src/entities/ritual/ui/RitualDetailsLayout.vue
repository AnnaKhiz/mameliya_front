<script setup lang="ts">

</script>

<template>
  <div class="w-full h-full grid grid-cols-12">
    <div class="col-span-3 p-2 border-r border-r-brown-medium/10">
      <slot name="content-left" />
    </div>
    <div class="col-span-9 p-2">
      <slot name="content-right" />
    </div>
  </div>
</template>

