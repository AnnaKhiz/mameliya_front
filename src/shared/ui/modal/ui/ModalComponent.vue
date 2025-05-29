<script setup lang="ts">
import { watch } from 'vue';

type Props = {
  isClicked: boolean;
}
const props = defineProps<Props>();

watch(
  () => props.isClicked,
  (newVal) => {
    if (newVal) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }
);
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

<style >
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
