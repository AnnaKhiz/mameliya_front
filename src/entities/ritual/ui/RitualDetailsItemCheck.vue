<script setup lang="ts">
import type {RitualDetailsItemType} from "@/entities/ritual";

type Props = {
  item: RitualDetailsItemType;
  index: number;
}

defineProps<Props>();
const emits = defineEmits([
  'update:openDescription',
  'update:checkItem',
]);
const checkedFavorites = defineModel();
const handleOpenDescription = (index: number) => {
  emits('update:openDescription', index);
}

const handleCheckItem = (index: number) => {
  emits('update:checkItem', index);
}
</script>

<template>
  <label
    :for="item.title"
    class="block"
    @click="handleOpenDescription(index)"
  >
    <input
      v-model="checkedFavorites"
      type="checkbox"
      :name="item.title"
      :id="item.title"
      class="mr-2"
      :checked="item.checked"
      @change="handleCheckItem(index)"
    >
    {{ item.title }}
  </label>
</template>

<style scoped>

</style>
