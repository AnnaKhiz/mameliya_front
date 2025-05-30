<script setup lang="ts">
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/16/solid";
import { ref } from "vue";

const isHidden = ref<boolean>(true);

const togglePasswordVisibility = () => {
  isHidden.value = !isHidden.value;
}
</script>

<template>
  <div class="relative">
    <input class="w-full mb-1" :type="isHidden ? 'password' : 'text'" />
    <EyeIcon v-if="isHidden" class="w-6 absolute top-1/4 right-2 cursor-pointer" @click="togglePasswordVisibility"/>
    <EyeSlashIcon v-else class="w-6 absolute top-1/4 right-2 cursor-pointer" @click="togglePasswordVisibility"/>
  </div>
</template>

<style scoped>

</style>
