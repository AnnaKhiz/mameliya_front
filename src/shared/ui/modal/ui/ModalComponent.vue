<script setup lang="ts">

</script>

<template>
  <teleport to="body">
    <Transition
      name="fade"
      appear
    >
    <slot name="content" />
    </Transition>
  </teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
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
