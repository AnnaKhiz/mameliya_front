<script setup lang="ts">

import {AppButton} from "@/shared/ui/button";
import {useI18n} from "vue-i18n";
import {ListItem} from "@/shared/ui/list-item";
const { t } = useI18n();

const emits = defineEmits(['update:edit']);
</script>

<template>
  <div class="w-full h-full flex flex-col gap-4 text-brown-dark">
    <ListItem
      :title="t('user_page.user_name')"
      :content="'Name'"
    />
    <ListItem
      :title="t('user_page.user_lastname')"
      :content="'Lastname'"
    />
    <ListItem
      :title="t('user_page.user_age')"
      :content="'Age'"
    />
    <ListItem
      :title="t('user_page.user_email')"
      :content="'Email'"
    />
    <ListItem
      :title="t('user_page.password')"
      :content="'Password'"
    />
    <AppButton class="mt-auto mb-5" :label="t('general.edit')" @click.prevent="emits('update:edit', true)" />
  </div>
</template>

<style scoped>

</style>
