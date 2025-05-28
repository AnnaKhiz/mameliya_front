<script setup lang="ts">
import { defineProps } from 'vue';
type Props = {
  label: string;
}
const props = defineProps<Props>();

</script>

<template>
  <button
    class="px-6 py-2 bg-green-light-opacity-5 hover:bg-green-light transition duration-500 uppercase text-brown-dark font-roboto rounded"
  >
    {{ props.label }}
  </button>
</template>
