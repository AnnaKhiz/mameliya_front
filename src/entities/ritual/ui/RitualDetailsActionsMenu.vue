<script setup lang="ts">
import {
  CheckCircleIcon,
  ChevronDoubleUpIcon,
  PlusCircleIcon,
  StarIcon
} from "@heroicons/vue/16/solid";
import {ref} from "vue";

type Props = {
  isChecked: boolean;
  anyChecked: boolean;
}
const props = defineProps<Props>();
const emits = defineEmits([
  'update:openAdd',
  'update:isChecked',
  'update:isCheckedMultiply',
  'update:saveToMyRituals'
]);

const isNewForm = ref<boolean>(false);

const handleOpenAddForm = () => {
  isNewForm.value = !isNewForm.value;
  emits('update:openAdd', isNewForm.value);
}

const handleIsChecked = () => {
  emits('update:isChecked', !props.isChecked);
}

const handleSaveToMyRituals = () => {
  emits('update:saveToMyRituals', true);
}
</script>

<template>
  <div class="mb-2 flex items-center justify-between gap-1">
    <PlusCircleIcon
      class="w-8 p-1 outline-none fill-brown-medium hover:fill-brown-dark hover:bg-brown-light/40 hover:rounded hover:cursor-pointer transition duration-500"
      @click="handleOpenAddForm"
      v-tooltip="'Add new ritual'"
    />
    <div class="mb-2 flex items-center justify-end gap-1">
      <ChevronDoubleUpIcon
        @click="handleIsChecked"
        :class="isChecked ? 'rotate-180' : ''"
        class="w-8 p-1 outline-none fill-brown-medium hover:fill-brown-dark hover:rounded hover:cursor-pointer hover:bg-brown-light/40 transition duration-500"
        v-tooltip="'Show checkboxes'"
      />
      <CheckCircleIcon
        class="w-8 p-1 outline-none fill-brown-medium hover:fill-brown-dark hover:bg-brown-light/40 hover:rounded hover:cursor-pointer transition duration-500"
        @click="handleIsChecked"
        v-tooltip="'Check all'"
      />
      <StarIcon
        v-if="anyChecked"
        class="w-8 p-1 outline-none fill-brown-medium hover:fill-brown-dark hover:bg-brown-light/40 hover:rounded hover:cursor-pointer transition duration-500"
        @click="handleSaveToMyRituals"
        v-tooltip="'Add to My rituals'"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
