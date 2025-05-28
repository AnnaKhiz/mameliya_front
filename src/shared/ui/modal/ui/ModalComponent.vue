<script setup lang="ts">
type Props = {
  isClicked: boolean;
}
const props = defineProps<Props>();
</script>

<template>
  <teleport to="body">
    <Transition name="fade" >
      <div v-if="props.isClicked">
        <slot name="content" />
      </div>
    </Transition>
  </teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s linear;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
