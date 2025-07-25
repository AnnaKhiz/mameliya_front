<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {AppButton} from "@/shared/ui/button";
import {useI18n} from "vue-i18n";
import {ListItem} from "@/shared/ui/list-item";
import { PlusCircleIcon } from "@heroicons/vue/16/solid";
import { useUserStore } from "@/entities/user";
import {storeToRefs} from "pinia";
const { user } = storeToRefs(useUserStore());
const { t } = useI18n();
// @ts-ignore
import md5 from 'blueimp-md5';
const emits = defineEmits(['update:edit']);

const userAvatar = ref<string>('');
const getUserGravatar = () => {
  const cleanEmail = user.value?.email.trim().toLowerCase();
  const hash = md5(cleanEmail);
  userAvatar.value = `https://www.gravatar.com/avatar/${hash}?s=200&d=identicon`;
}


onMounted(() => {
  getUserGravatar();
})
</script>

<template>
  <div class="w-full h-full flex flex-col gap-4 text-brown-dark px-2">
    <div class="w-36 h-36 bg-brown-light rounded-2xl mb-4 cursor-pointer relative">
      <img :src="userAvatar" alt="user avatar" class="rounded-2xl ">
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
