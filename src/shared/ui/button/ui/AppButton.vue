<script setup lang="ts">
import { defineProps } from 'vue';
type Props = {
  label: string;
}
const props = defineProps<Props>();
</script>

<template>
  <button
    class="px-6 py-2 bg-brown-dark hover:bg-brown-light transition duration-500 uppercase text-white hover:text-brown-dark font-roboto rounded"
  >
    {{ props.label }}
  </button>
</template>
