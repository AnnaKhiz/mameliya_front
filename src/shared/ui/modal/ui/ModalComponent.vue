<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/16/solid";

type Props = {
  full?: boolean;
  title: string;
  width?: string;
  height?: string;
  show: boolean;
}
const props = defineProps<Props>();

const emit = defineEmits(['update:dialogVisibility']);

const closeDialog = () => {
  emit('update:dialogVisibility', 'none');
}
</script>

<template>
  <teleport to="body">
    <Transition name="fade" >
      <div
        v-if="props.show"
        :class="full ? 'fixed inset-0 bg-black/40 w-full h-full flex justify-center items-center' : ''"
      >
        <div
          class="bg-white p-5 rounded-md flex flex-col items-center justify-start gap-4 text-brown-dark"
          :class="[
            props.width || 'w-2/6' ,
            props.height || 'min-height-24'
          ]"
        >
          <div class="flex justify-center items-center w-full">
            <h2 class="self-center font-bold text-xl w-full p-1 text-center">{{ title }}</h2>
            <XMarkIcon class="w-9 cursor-pointer justify-self-end" @click="closeDialog" />
          </div>
          <slot />
          <slot name="actions" />
        </div>
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
