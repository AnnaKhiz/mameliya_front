<script setup lang="ts">
import { UserPageForm, UserPageInfo } from "@/entities/user";

type Props = {
  edit: boolean;
}

defineProps<Props>();
const emits = defineEmits(['update:edit']);

const updateIsEditValue = (value: boolean) => {
  console.log(value)
  emits('update:edit', value)
}
</script>

<template>
  <UserPageForm v-if="edit" @update:edit="updateIsEditValue" />
  <UserPageInfo v-else @update:edit="updateIsEditValue"  />
</template>

<style scoped>

</style>
