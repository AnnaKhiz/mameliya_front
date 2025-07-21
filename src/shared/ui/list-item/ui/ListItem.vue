<script setup lang="ts">

type Props = {
  title: string;
  content: string;
  style?: string;
}

defineProps<Props>();
</script>

<template>
  <div>
    <h2 class="font-bold">{{ title }}</h2>
    <p>{{ content }}</p>
  </div>
</template>

<style scoped>

</style>
