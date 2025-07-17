<script setup lang="ts">
type Props = {
  title: string;
}
defineProps<Props>();
</script>

<template>
  <p
    class="text-brown-dark capitalize hover:font-bold hover:cursor-pointer mb-1 transition duration-500"
  >
    {{ title }}
  </p>
</template>

<style scoped>

</style>
