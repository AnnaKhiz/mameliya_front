<script setup lang="ts">
type Props = {
  title?: string;
  placeholder?: string;
  error?: boolean;
  styles?: string;
}

defineProps<Props>();
const text = defineModel<string>();
</script>

<template>
  <div>
    <h2 v-if="title" class="mb-1 text-brown-dark">{{ title }}</h2>
    <input
      v-model="text"
      type="text"
      :placeholder="placeholder"
      :class="[
        error ? 'error-style' : '',
        styles? styles : ''
        ]"
      class="w-full rounded placeholder:text-gray-400"
    >
    <slot name="content" />
  </div>
</template>

<style scoped>

</style>
