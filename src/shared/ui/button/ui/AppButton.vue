<script setup lang="ts">
import { defineProps } from 'vue';
type Props = {
  label: string;
}
const props = defineProps<Props>();

</script>

<template>
  <button
    class="px-8 py-4 bg-green-light hover:bg-green-medium transition duration-500 uppercase text-brown-dark"
  >
    {{ props.label }}
  </button>
</template>
