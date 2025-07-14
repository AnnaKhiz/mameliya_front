<script setup lang="ts">
import { XMarkIcon, MinusIcon, ChevronDoubleLeftIcon } from "@heroicons/vue/16/solid";

type Props = {
  full?: boolean;
  title: string;
  width?: string;
  height?: string;
  show: boolean;
  collapse: boolean;
}
const props = defineProps<Props>();

const emit = defineEmits(['update:dialogVisibility']);

const changeDialogState = (value: string) => {
  emit('update:dialogVisibility', value);
}

</script>

<template>
  <teleport to="body">
    <Transition name="slide-fade" >
      <div
        v-if="props.show"
        :class="[
          full ? 'fixed inset-0 bg-black/40 w-full h-full flex justify-center items-center' : 'fixed bottom-3.5 right-3.5',
          collapse ? 'w-16' : ''
        ]"
      >
        <div

          class="bg-brown-dark p-3 rounded-md flex flex-col items-center justify-start gap-4 text-white"
          :class="[
            props.width || 'w-2/6' ,
            props.height || 'min-height-24'
          ]"
        >
          <div v-if="!collapse" class="flex justify-center items-center w-full gap-10">
            <h2 class="self-center font-bold text-md w-full p-1 text-center">{{ title }}</h2>
            <div class="flex justify-self-end">
              <MinusIcon
                @click="changeDialogState('collapse')"
                class="w-9 cursor-pointer hover:bg-brown-medium rounded p-2 transition duration-500"
              />
              <XMarkIcon
                @click="changeDialogState('none')"
                class="w-9 cursor-pointer hover:bg-brown-medium rounded p-2 transition duration-500"
              />
            </div>
          </div>
          <div v-else >
            <ChevronDoubleLeftIcon
              @click="changeDialogState('ai-chat')"
              class="w-9 cursor-pointer hover:bg-brown-medium rounded p-2 transition duration-500"
            />
          </div>
          <slot v-if="!collapse" />
        </div>

      </div>
    </Transition>
  </teleport>
</template>

<style >
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>

