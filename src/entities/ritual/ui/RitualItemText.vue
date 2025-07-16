<script setup lang="ts">
import type { RitualSectionType, RitualType } from "@/entities/ritual";

type Props = {
  item: RitualType,
  checkedMenu: RitualSectionType;
};

defineProps<Props>();
</script>

<template>
  <div class="ml-2" >
    <p
      class=" font-bold text-brown-dark text-sm cursor-pointer hover:underline hover:text-brown-medium transition duration-700"
      :class="checkedMenu === item.value ? 'text-brown-medium underline' : ''"
    >
      {{ item.text }}
    </p>
  </div>
</template>

<style scoped>

</style>
t
