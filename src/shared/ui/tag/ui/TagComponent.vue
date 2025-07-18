<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/16/solid";
import type { NewRitualFormType } from "@/entities/ritual";

type Props = {
  newRitualForm: NewRitualFormType;
  noActions?: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits(['update:newRitualForm']);
const removeCosmeticItem = (index: number) => {
  const formData = {...props.newRitualForm};
  formData.cosmetic_name.splice(index, 1);
  emits('update:newRitualForm', formData.cosmetic_name);
}
</script>

<template>
  <div
    class="flex items-center justify-start flex-wrap py-2 gap-1"
  >
    <div
      v-for="(cosmetic, index) in props.newRitualForm.cosmetic_name"
      :key="cosmetic"
      class="py-1 pl-2 pr-7 rounded  text-brown-dark relative"
      :class="!props.noActions ? 'bg-brown-medium/40' : 'bg-brown-medium/20'"
    >
      {{ cosmetic }}
      <XMarkIcon
        v-if="!props.noActions"
        class="w-4 fill-brown-medium hover:fill-white transition duration-500 absolute top-1 right-1 cursor-pointer"
        @click="removeCosmeticItem(index)"
      />
    </div>
  </div>
</template>

