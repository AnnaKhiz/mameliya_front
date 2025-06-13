<script setup lang="ts">
import { defineProps } from 'vue';
type Props = {
  label: string;
  disabled?: boolean;
}
const props = defineProps<Props>();

</script>

<template>
  <button
    :disabled="disabled"
    class="px-6 py-2 bg-brown-dark hover:bg-brown-light transition duration-500 uppercase text-white
    hover:text-brown-dark font-roboto hover:cursor-pointer rounded disabled:opacity-65
    disabled:text-white disabled:bg-brown-dark disabled:cursor-default"
  >
    {{ props.label }}
  </button>
</template>
