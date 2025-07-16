<script setup lang="ts">
import type { RitualSectionType, RitualType } from "@/entities/ritual";

type Props = {
  item: RitualType,
  hovered: RitualSectionType;
};

defineProps<Props>();

</script>

<template>
  <div class="w-full h-full relative hover:shadow-2xl cursor-pointer">
    <img
      :src="item.image"
      :alt="`${item.value} image`"
      class="w-full h-full object-cover hover:brightness-50 transition duration-700 rounded-lg">
    <Transition :duration="700">
      <h2
        v-if="hovered === item.value"
        class="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 font-bold text-xl text-white pointer-events-none"
      >
        {{ item.text }}
      </h2>
    </Transition>
  </div>
</template>
