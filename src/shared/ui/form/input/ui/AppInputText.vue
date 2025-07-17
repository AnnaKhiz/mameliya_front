<script setup lang="ts">
type Props = {
  title: string;
  placeholder?: string;
  error?: boolean;
}

defineProps<Props>();
const text = defineModel<string>();
</script>

<template>
  <div>
    <h2 v-if="title" class="mb-1">{{ title }}</h2>
    <input
      v-model="text"
      type="text"
      :placeholder="placeholder"
      :class="error ? 'error-style' : ''"
      class="w-full rounded dark-mode"
    >
  </div>
</template>

<style scoped>

</style>
