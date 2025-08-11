<script setup lang="ts">
type Props = {
  list: Record<string, any>[];
  title?: string;
  error?: boolean;
  disabledField?: string;
  styles?: string;
  multiple?: boolean
}
defineProps<Props>();

const section = defineModel<string[]>();
</script>

<template>
  <div class="w-full">
    <h2 v-if="title" class="mb-1">{{ title }}</h2>
    <select
      v-model="section"
      :multiple="multiple"
      class="dark-mode"
      :class="[
        error ? 'error-style' : '',
        styles ? styles : ''
      ]"
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
