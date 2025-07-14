<script setup lang="ts">
import {ref, watch} from "vue";
import type { HeaderDialogsType } from "@/shared/ui/header";
import { CalendarDaysIcon, ChartPieIcon, ChatBubbleLeftRightIcon } from "@heroicons/vue/16/solid";
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
import {CalendarComponent} from "@/entities/calendar";
import ModalComponent from "@/shared/ui/modal";
import { vTooltip } from "floating-vue";
import {AssistantComponent} from "@/entities/assistant";
import {PopupComponent, type PopupDialogsType} from "@/shared/ui/popup";
const { user } = storeToRefs(useUserStore());
const { mama } = storeToRefs(useMamaStore());

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const isMoodPanel = ref<boolean>(false);
const dialog = ref<HeaderDialogsType>('none');
const popup = ref<PopupDialogsType>('none');
const updateModal = (value: boolean) => {
  isMoodPanel.value = value;
}
const goToAboutPage = () => {
  router.push({ name: 'about'});
}
const handleLogOut = async () => {
  await logOutUser();
  await router.push({ name: 'home'});
}

const changeDialogState = (value: HeaderDialogsType) => {
  dialog.value = value;
}
const changePopupState = (value: PopupDialogsType) => {
  popup.value = value;
}

const openGeneralCalendar = async () => {
  changeDialogState('calendar');
}

const openAIChat = async () => {
  changePopupState('ai-chat');
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
      <div class="sm:flex justify-between items-center sm:gap-4 xs:hidden">
        <MoodPanelLayout
          v-if="mama?.mood"
          @update-modal-show="updateModal"
          class="relative cursor-pointer w-fit hover:bg-blend-soft-light">
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
        <CalendarDaysIcon
          v-if="user"
          v-tooltip="t('mama.calendar.general_calendar_title')"
          @click="openGeneralCalendar"
          class="fill-brown-dark w-7 cursor-pointer outline-none"
        />
        <ChartPieIcon class="fill-brown-dark w-7 cursor-pointer"/>
        <ChatBubbleLeftRightIcon
          v-if="user"
          v-tooltip="t('helper_ai.tooltip')"
          @click="openAIChat"
          class="fill-brown-dark w-7 cursor-pointer outline-none"
        />
        <AppButton :label="t('general.about')" @click.prevent="goToAboutPage"/>
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
</template>
