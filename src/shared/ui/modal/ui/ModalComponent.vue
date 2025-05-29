<script setup lang="ts">
type Props = {
  isShow: boolean;
}
const props = defineProps<Props>()

</script>

<template>
  <teleport to="body">
    <Transition name="fade" >
      <div v-if="props.isShow">
        <slot name="content" />
      </div>
    </Transition>
  </teleport>
</template>

<style >
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
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
