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
}
const props = defineProps<Props>();
const isHidden = ref<boolean>(true);

const togglePasswordVisibility = () => {
  isHidden.value = !isHidden.value;
}
const inputModel = toRef(props.form, props.field);
</script>

<template>
  <div class="relative">
    <input
      v-model="inputModel"
      class="w-full mb-1"
      :type="isHidden ? 'password' : 'text'"
      :placeholder="props.isConfirm
        ? t('auth.password_confirm_placeholder')
        : t('auth.password_placeholder') "
    />
    <EyeIcon
      v-if="isHidden"
      class="w-6 absolute top-1/4 right-2 cursor-pointer"
      @click="togglePasswordVisibility"
    />
    <EyeSlashIcon
      v-else
      class="w-6 absolute top-1/4 right-2 cursor-pointer"
      @click="togglePasswordVisibility"
    />
  </div>
</template>

<style scoped>

</style>
