<script setup lang="ts">
import {ref} from "vue";
import type { HeaderDialogsType } from "@/shared/ui/header";
import { CalendarDaysIcon, ChartPieIcon } from "@heroicons/vue/16/solid";
import {MoodPanel, MoodPanelLayout} from "@/entities/mood/mood-panel";
import {BurgerButton, BurgerContent} from "@/features/burger";
import {AppButton} from "@/shared/ui/button";
import LanguageDropdown from "@/features/dropdown";
import HeaderLayout from "@/shared/ui/header/ui/HeaderLayout.vue";
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import { useUserStore } from "@/entities/user";
const { logOutUser } = useUserStore();
import {storeToRefs} from "pinia";
import { useMamaStore} from "@/entities/mama";
import {CalendarComponent} from "@/entities/calendar";
import ModalComponent from "@/shared/ui/modal";
import { vTooltip } from "floating-vue";
const { user } = storeToRefs(useUserStore());
const { mama } = storeToRefs(useMamaStore());

const { t } = useI18n();
const router = useRouter();
const isMoodPanel = ref<boolean>(false);
const dialog = ref<HeaderDialogsType>('none');
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

const openGeneralCalendar = async () => {
  changeDialogState('calendar');
}

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
          class="fill-brown-dark w-7 cursor-pointer outline-none"
          @click="openGeneralCalendar"
          v-tooltip="t('mama.calendar.general_calendar_title')"
        />
        <ChartPieIcon class="fill-brown-dark w-7 cursor-pointer"/>
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

  <!-- dialog notify  -->
  <ModalComponent
    v-if="dialog === 'calendar'"
    full
    :width="!user?.google_refresh ? 'w-fit' : 'w-4/6'"
    :height="!user?.google_refresh ? 'h-fit' : 'min-h-72'"
    :title="t('mama.calendar.general_calendar_title')"
    @update:dialog-visibility="dialog = $event"
  >
    <template #default>
      <CalendarComponent :type="'all'" />
    </template>
  </ModalComponent>
</template>
