<script setup lang="ts">
import {
  RitualDetailsItemCheck,
  RitualDetailsItemLink,
  type RitualDetailsItemType
} from "@/entities/ritual";

type Props = {
  list: RitualDetailsItemType[];
  isChecked: boolean;

}
defineProps<Props>();
const checkedFavorites = defineModel();

const emits = defineEmits([
  'update:openDescription',
  'update:checkItem',
]);

const handleOpenDescription = (index: number) => {
  emits('update:openDescription', index);
}

const handleCheckItem = (index: number) => {
  emits('update:checkItem', index);
}

</script>

<template>
  <div v-for="(item, index) in list" :key="item.id" >
    <RitualDetailsItemCheck
      v-if="isChecked"
      :item="item"
      :index="index"
      v-model="checkedFavorites"
      @update:open-description="handleOpenDescription"
      @update:check-item="handleCheckItem"
    />
    <RitualDetailsItemLink
      v-else
      @click="handleOpenDescription(index)"
    />
  </div>
</template>

<style scoped>

</style>
