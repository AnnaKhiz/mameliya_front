<script setup lang="ts">
type Props = {
  title?: string;
  placeholder?: string;
  error?: boolean;
  styles?: string;
}

defineProps<Props>();
const value = defineModel<number>();
</script>

<template>
  <div>
    <h2 v-if="title" class="mb-1 text-brown-dark">{{ title }}</h2>
    <input
      v-model.number="value"
      type="number"
      :placeholder="placeholder"
      :class="[
        error ? 'error-style' : '',
        styles? styles : ''
        ]"
      :min="0"
      class="w-full rounded placeholder:text-gray-400"
    >
    <slot name="content" />
  </div>
</template>

<style scoped>

</style>
