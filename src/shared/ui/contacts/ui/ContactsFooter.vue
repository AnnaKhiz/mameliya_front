<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col gap-1 text-brown-dark ">
    <p class="font-semibold uppercase mb-1 xs:m-auto xs:w-fit sm:m-0">{{ t('general.contacts') }}</p>
    <div>
      <span class="font-semibold">Email: </span>
      <a href="mailto:email@gmail.com" class="hover:text-brown-light transition duration-500">
        <span>email@gmail.com</span>
      </a>
    </div>
    <div>
      <span class="font-semibold">{{ t('general.phone') }}: </span>
      <a href="tel:+407001111111" class="hover:text-brown-light transition duration-500">
        <span>+407201111111</span>
      </a>
    </div>
  </div>
</template>
