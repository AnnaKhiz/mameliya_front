<script setup lang="ts">
type Props = {
  isShow: boolean;
  full?: boolean;
}
const props = defineProps<Props>()

</script>

<template>
  <teleport to="body">
    <Transition name="fade" >
      <div
        v-if="props.isShow"
        :class="full ? 'fixed inset-0 bg-black/40 w-full h-full flex justify-center items-center' : ''"
      >
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
