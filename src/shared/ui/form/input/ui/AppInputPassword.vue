<script setup lang="ts">
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/16/solid";
import { ref } from "vue";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

type FormRegisterType = {
  email: string;
  password: string;
  passwordConfirm?: string;
}

type Props = {
  isConfirm?: boolean;
  field: keyof FormRegisterType;
  styles?: string;
  placeholderText?: string;
  title?: string;
  error?: string;
}
defineProps<Props>();
const isHidden = ref<boolean>(true);
const emits = defineEmits(['inputClick']);

const togglePasswordVisibility = () => {
  isHidden.value = !isHidden.value;
}

const inputModel = defineModel<string>();
</script>

<template>
  <div class="w-full">
    <h2 v-if="title" class="mb-1 text-brown-dark">{{ title }}</h2>
    <div class="relative">
      <input
        v-model="inputModel"
        class="w-full mb-1 placeholder-gray-300"
        :class="[
          styles ? styles : '',
          error ? 'error-style' : ''
        ]"
        :type="isHidden ? 'password' : 'text'"
        :placeholder="placeholderText ? placeholderText : t('auth.password_placeholder')"
        @click="emits('inputClick', true)"
      />
      <EyeIcon
        v-if="isHidden"
        class="w-6 absolute top-1/4 right-2 cursor-pointer z-10"
        @click.stop="togglePasswordVisibility"
      />
      <EyeSlashIcon
        v-else
        class="w-6 absolute top-1/4 right-2 cursor-pointer z-10"
        @click.stop="togglePasswordVisibility"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
