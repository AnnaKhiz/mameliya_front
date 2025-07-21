<script setup lang="ts">
import {ref, watch} from "vue";
import type { HeaderDialogsType } from "@/shared/ui/header";
import {
  CalendarDaysIcon,
  ChartPieIcon,
  ChatBubbleLeftRightIcon,
  HomeIcon
} from "@heroicons/vue/16/solid";
import {MoodPanel, MoodPanelLayout} from "@/entities/mood/mood-panel";
import {BurgerButton, BurgerContent} from "@/features/burger";
import {AppButton} from "@/shared/ui/button";
import LanguageDropdown from "@/features/dropdown";
import HeaderLayout from "@/shared/ui/header/ui/HeaderLayout.vue";
import {useI18n} from "vue-i18n";
import {useRouter, useRoute} from "vue-router";
import { useUserStore } from "@/entities/user";
const { logOutUser } = useUserStore();
import {storeToRefs} from "pinia";
import { useMamaStore} from "@/entities/mama";
import {CalendarComponent, type DialogEventsType} from "@/entities/calendar";
import ModalComponent from "@/shared/ui/modal";
import { vTooltip } from "floating-vue";
import {AssistantComponent} from "@/entities/assistant";
import {PopupComponent, type PopupDialogsType} from "@/shared/ui/popup";
import {useAssistantStore} from "@/entities/assistant/model/useAssistantStore.ts";
import {UserPage} from "@/pages/user-page";
const { removeChatHistory } = useAssistantStore();
const { user } = storeToRefs(useUserStore());
const { mama } = storeToRefs(useMamaStore());

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const isMoodPanel = ref<boolean>(false);
const dialog = ref<HeaderDialogsType>('none');
const popup = ref<PopupDialogsType>('none');

const isEditInfo = ref<boolean>(false);
const updateModal = (value: boolean) => {
  isMoodPanel.value = value;
}
const goToPage = (value: string) => {
  router.push({ name: value});
}
const handleLogOut = async () => {
  await logOutUser();
  await router.push({ name: 'home'});
}

const changeDialogState = (value: HeaderDialogsType) => {
  dialog.value = value;
}
const changePopupState = (value: PopupDialogsType) => {
  if (value === 'none') {
    popup.value = value;
    removeChatHistory();
  } else {
    popup.value = value;
  }

}

const openGeneralCalendar = async () => {
  changeDialogState('calendar');
}

const openAIChat = async () => {
  changePopupState('ai-chat');
}

const handleIsEditInfo = (event: boolean) => {
  isEditInfo.value = event;
}

watch(() => route.query, (newValue) => {
  if (newValue.modal === 'success') {
    changeDialogState('calendar');
  }
}, { immediate: true})

</script>

<template>
  <HeaderLayout>
    <template #content>
      <div class="sm:flex justify-between items-center sm:gap-2 xs:hidden">
        <MoodPanelLayout
          v-if="mama?.mood"
          @update-modal-show="updateModal"
          class="relative w-fit hover:bg-blend-soft-light outline-none p-1 cursor-pointer hover:fill-brown-dark hover:bg-brown-light/40 hover:rounded hover:cursor-pointer transition duration-500">
          <template #content>
            <Transition>
              <MoodPanel
                v-if="isMoodPanel"
                :is-mood-panel="isMoodPanel"
                :position="'-bottom-2 right-10'"
                @update-modal-show="updateModal"
              />
            </Transition>
          </template>
        </MoodPanelLayout>
        <HomeIcon
          v-if="user"
          v-tooltip="t('mama.user_page')"
          @click="changePopupState('user-page')"
          class="fill-brown-dark outline-none w-8 p-1 cursor-pointer hover:fill-brown-dark hover:bg-brown-light/40 hover:rounded hover:cursor-pointer transition duration-500"
        />
        <CalendarDaysIcon
          v-if="user"
          v-tooltip="t('mama.calendar.general_calendar_title')"
          @click="openGeneralCalendar"
          class="fill-brown-dark outline-none w-8 p-1 cursor-pointer hover:fill-brown-dark hover:bg-brown-light/40 hover:rounded hover:cursor-pointer transition duration-500"
        />

        <ChatBubbleLeftRightIcon
          v-if="user"
          v-tooltip="t('helper_ai.tooltip')"
          @click="openAIChat"
          class="fill-brown-dark outline-none w-8 p-1 cursor-pointer hover:fill-brown-dark hover:bg-brown-light/40 hover:rounded hover:cursor-pointer transition duration-500"
        />

        <AppButton :label="t('general.about')" @click.prevent="goToPage('about')"/>
        <AppButton :label="t('general.logout')" @click.prevent="handleLogOut"/>
        <LanguageDropdown />
      </div>
      <div class="sm:hidden xs:absolute top-5 right-5 flex justify-end gap-6 items-center">
        <LanguageDropdown />
        <BurgerButton  />
      </div>
    </template>

    <template #burger>
      <BurgerContent />
    </template>
  </HeaderLayout>

  <!-- dialog all calendar events  -->
  <ModalComponent
    :show="dialog === 'calendar'"
    full
    :width="!user?.google_refresh ? 'w-fit' : 'w-4/6'"
    :height="!user?.google_refresh ? 'h-5/6' : 'min-h-72 h-5/6'"
    :title="t('mama.calendar.general_calendar_title')"
    @update:dialog-visibility="changeDialogState($event)"
  >
    <template #default>
      <CalendarComponent :type="'all'" />
    </template>
  </ModalComponent>

  <!-- dialog ai chat  -->
  <PopupComponent
    :show="popup === 'ai-chat' || popup === 'collapse'"
    :collapse="popup === 'collapse'"
    :width="'w-full'"
    :height="'min-h-96'"
    :title="t('helper_ai.modal_header')"
    @update:dialog-visibility="changePopupState($event)"
  >
    <template #default>
      <AssistantComponent />
    </template>
  </PopupComponent>

  <!-- dialog user page -->
  <PopupComponent
    :show="popup === 'user-page'"
    :width="'w-full'"
    :height="'h-full'"
    full
    :title="isEditInfo ? t('user_page.dialog_title_edit') : t('user_page.dialog_title')"
    :style="'bg-white rounded-none'"
    @update:dialog-visibility="changePopupState($event)"
  >
    <template #default>
      <UserPage :edit="isEditInfo" @update:edit="handleIsEditInfo" />
    </template>
  </PopupComponent>
</template>
