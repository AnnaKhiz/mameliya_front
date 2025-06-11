<script setup lang="ts">
import {useI18n} from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div>
    <h2 class="font-semibold mb-2 text-brown-dark">{{ t('mama.rituals') }}</h2>
    <p class="text-brown-dark"><span class="font-semibold">2 </span>/ 10</p>
  </div>
</template>

<style scoped>

</style>
