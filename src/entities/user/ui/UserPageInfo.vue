<script setup lang="ts">

import {AppButton} from "@/shared/ui/button";
import {useI18n} from "vue-i18n";
import {ListItem} from "@/shared/ui/list-item";
import { useUserStore } from "@/entities/user";
import {storeToRefs} from "pinia";
const { user } = storeToRefs(useUserStore());
const { t } = useI18n();

const emits = defineEmits(['update:edit']);
</script>

<template>
  <div class="w-full h-full flex flex-col gap-4 text-brown-dark px-2">
    <div class="w-36 h-36 bg-brown-light rounded-md mb-4">
      avatar
    </div>
    <ListItem
      :title="t('user_page.user_name')"
      :content="user?.first_name ? user?.first_name : t('user_page.no_data')"
    />
    <ListItem
      :title="t('user_page.user_lastname')"
      :content="user?.last_name ? user?.last_name : t('user_page.no_data')"
    />
    <ListItem
      :title="t('user_page.user_age')"
      :content="user?.age ? user?.age : t('user_page.no_data')"
    />
    <ListItem
      :title="t('user_page.user_email')"
      :content="user?.email"
    />
    <AppButton class="mt-auto mb-5" :label="t('general.edit')" @click.prevent="emits('update:edit', true)" />
  </div>

</template>

<style scoped>

</style>
