<script setup lang="ts">
import { sectionsList } from "@/entities/ritual";

type Props = {
  title?: string;
  error?: boolean;
  disabledField: string;
  list: Record<string, any>[];
}
defineProps<Props>();

const section = defineModel<string[]>();
</script>

<template>
  <div>
    <h2 v-if="title" class="mb-1">{{ title }}</h2>
    <select
      v-model="section"
      multiple
      class="w-full dark-mode"
      :class="error ? 'error-style' : ''"
    >
      <option v-if="disabledField" disabled value="">{{ disabledField }}</option>
      <option
        v-for="(item, index) in list"
        :key="item.value + index"
        :value="item.value"
      >
        {{ item.text }}
      </option>
    </select>
  </div>
</template>

<style scoped>

</style>
