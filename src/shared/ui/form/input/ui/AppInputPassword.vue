<script setup lang="ts">
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/16/solid";
import { ref, toRef } from "vue";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

type FormRegisterType = {
  email: string;
  password: string;
  passwordConfirm?: string;
}

type Props = {
  isConfirm?: boolean;
  form: FormRegisterType;
  field: keyof FormRegisterType;
  styles?: string;
  placeholderText?: string;
}
const props = defineProps<Props>();
const isHidden = ref<boolean>(true);
const emits = defineEmits(['inputClick']);

const togglePasswordVisibility = () => {
  isHidden.value = !isHidden.value;
}
// const inputModel = toRef(props.form, props.field);
const inputModel = defineModel<string>();
</script>

<template>
  <div class="relative">
    <input
      v-model="inputModel"
      class="w-full mb-1 placeholder-gray-300"
      :class="styles ? styles : ''"
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
</template>

<style scoped>

</style>
