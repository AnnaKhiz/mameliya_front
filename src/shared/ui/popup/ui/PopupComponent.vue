<script setup lang="ts">
import { XMarkIcon, MinusIcon, ChevronDoubleLeftIcon } from "@heroicons/vue/16/solid";

type Props = {
  full?: boolean;
  title: string;
  width?: string;
  height?: string;
  show: boolean;
  collapse?: boolean;
  style?: string;
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
          full ? 'fixed bottom-0 right-0 bg-black/40 w-1/4 h-full flex justify-center items-center' : 'fixed bottom-3.5 right-3.5',
          collapse ? 'w-16' : ''
        ]"
      >
        <div
          class="p-3 flex flex-col items-center justify-start gap-4"
          :class="[
            props.width || 'w-2/6' ,
            props.height || 'min-height-24',
            props.style ? props.style : 'bg-brown-dark rounded-md text-white'
          ]"
        >
          <div v-if="!collapse" class="flex justify-center items-center w-full gap-10">
            <h2
              class="self-center font-bold text-md w-full p-1 text-center uppercase"
              :class="full ? 'text-brown-dark' : 'text-white'"
            >{{ title }}</h2>
            <div class="flex justify-self-end">
              <MinusIcon
                v-if="!full"
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
              v-if="!full && collapse"
              @click="changeDialogState('ai-chat')"
              class="w-9 cursor-pointer hover:bg-brown-medium rounded p-2 transition duration-500"
            />
          </div>
          <slot v-if="!collapse" class="flex-grow h-full w-full"/>
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

