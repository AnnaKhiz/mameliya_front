<script setup lang="ts">
import {useRitualStore} from "@/entities/ritual/model/useRitualStore.ts";
const { openDescription } = useRitualStore();
type Props = {
  title: string;
  index: number;
}
defineProps<Props>();
</script>

<template>
  <p
    class="text-brown-dark normal-case hover:font-bold hover:cursor-pointer mb-1 transition duration-500"
    @click="openDescription(index)"
  >
    {{ title }}
  </p>
</template>

<style scoped>

</style>
