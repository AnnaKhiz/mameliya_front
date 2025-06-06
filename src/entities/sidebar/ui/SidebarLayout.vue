<script setup lang="ts">

type Props = {
  width?: string;
}
const props = defineProps<Props>();
</script>

<template>
  <div
      class="p-5 bg-gradient-main h-full drop-shadow-2xl max-h-screen overflow-auto flex-shrink-0 "
      id="aside"
      :class="props.width ? `min-w-[${props.width}]` : 'min-w-[250px]'"
  >
    <slot name="content" />
  </div>
</template>

<style scoped>
#aside::-webkit-scrollbar {
  width: 2px;
}

::-webkit-scrollbar {
  width: 2px;
}
</style>
