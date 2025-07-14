<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {onMounted, ref} from "vue";
import {AppButton} from "@/shared/ui/button";
import { useUserStore } from "@/entities/user";
const { user } = storeToRefs(useUserStore());
import { useAssistantStore } from "@/entities/assistant/model/useAssistantStore.ts";
import { type DialogEventsType } from "@/entities/calendar";
import {storeToRefs} from "pinia";
import {PaperAirplaneIcon, TrashIcon} from "@heroicons/vue/16/solid";
import ModalComponent from "@/shared/ui/modal";
const { sendMessageToAssistant, addNewMessage, removeChatHistory } = useAssistantStore();
const { currentChatHistory } = storeToRefs(useAssistantStore());

const { t } = useI18n();

const message = ref<string>('');
const confirmDelete = ref<boolean>(false);
const dialog = ref<DialogEventsType>('none');
const errorInputStyle = ref<booelan>(false);
const sendMessage = async () => {
  if (!message.value) return errorInputStyle.value = true;
  const userMessage = generateMessageForAI('You', message.value);
  addNewMessage(userMessage);
  const assistantResponse = await sendMessageToAssistant(message.value);

  const assistantMessage = generateMessageForAI('Assistant', assistantResponse);

  addNewMessage(assistantMessage);
  message.value = '';
}

const generateMessageForAI = (name: 'You' | 'Assistant', message: string) => {
  const lastItem = currentChatHistory.value?.slice(-1)[0];
  return {
    id: lastItem ? lastItem?.id + 1 : 1,
    author: user.value?.first_name || name,
    text: message,
    date: new Date().toLocaleString()
  }
}
const updateDialogState = (value: DialogEventsType) => {
  dialog.value = value;
}
const clearChat = () => {
  removeChatHistory();
  updateDialogState('none');
}
</script>

<template>
  <div class="flex flex-grow flex-col justify-between h-full w-full">
  <div class="h-full text-white w-full max-w-96 min-h-96 overflow-auto p-3">
    <div
      v-for="message in currentChatHistory"
      :key="message.id"
      class="rounded mb-4 p-2 flex flex-col text-brown-dark w-fit"
      :class="message.author === 'Assistant' ? 'bg-brown-light' : 'bg-brown-medium ml-auto'"
    >
      <p
        class="self-end text-xs mb-2"
        :class="message.author === 'Assistant' ? 'text-brown-medium' : 'text-gray-200'"
      >
        {{message.author}}, {{message.date.split(',')[1]}}
      </p>
      <p
        class="text-md"
        :class="message.author === 'Assistant' ? 'text-brown-medium' : 'text-gray-200'"
      >
        {{message.text}}
      </p>
    </div>
  </div>
  <div class="flex justify-between items-center gap-2">
    <input
      v-model="message"
      type="text"
      :placeholder="t('helper_ai.placeholder')"
      class="dark-mode w-full text-brown-dark"
      :class="errorInputStyle ? 'error-style' : ''"
    />

    <AppButton
      icon
      class="bg-brown-medium "
    >
      <template #icon>
        <PaperAirplaneIcon
          class="w-12 cursor-pointer outline-none -rotate-90 fill-white hover:fill-brown-medium hover:bg-white rounded transition duration-500 p-2"
          @click.prevent="sendMessage"
        />
      </template>
    </AppButton>
    <AppButton
      icon
      class="bg-brown-medium hover:bg-white rounded p-2 transition duration-500"

    >
      <template #icon>
        <TrashIcon
          class="w-12 cursor-pointer outline-none fill-white hover:fill-brown-medium hover:bg-white rounded transition duration-500 p-2"
          @click.prevent="updateDialogState('notify')"
        />
      </template>
    </AppButton>
  </div>
  </div>

  <!-- dialog notify  -->
  <ModalComponent
    :show="dialog === 'notify'"
    full
    :title="t('notify.confirm_delete')"
    @update:dialog-visibility="updateDialogState($event)"
  >
    <template #default>
      <p class="text-center">{{ t('notify.confirm_clear_dialog') }}</p>
      <div class="flex gap-4">
        <AppButton :label="t('general.cancel')" @click="updateDialogState('none')"/>
        <AppButton :label="t('general.confirm')" @click="clearChat"/>
      </div>
    </template>
  </ModalComponent>
</template>

<style scoped>

</style>
