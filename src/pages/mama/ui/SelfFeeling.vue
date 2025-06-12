<script setup lang="ts">

import {MoodPanel, MoodPanelLayout} from "@/shared/ui/mood/mood-panel";
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import {AppButton} from "@/shared/ui/button";

const { t } = useI18n();
const isMoodPanel = ref<boolean>(false);


const updateModal = (value: boolean) => {
  isMoodPanel.value = value;
}
</script>

<template>
  <div>
    <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('mama.your_mood_today') }}:</h2>
    <MoodPanelLayout
      @update-modal-show="updateModal"
      class="relative cursor-pointer w-fit hover:bg-blend-soft-light mb-10"
    >
      <template #content>
        <Transition>
          <MoodPanel v-if="isMoodPanel" :is-mood-panel="isMoodPanel" @update-modal-show="updateModal" />
        </Transition>
      </template>
    </MoodPanelLayout>
    <h2 class="text-brown-dark font-semibold mb-4 text-lmd"> {{ t('mama.add_comment') }}</h2>
    <div>
      <textarea
        class="placeholder:opacity-25 block mb-4"
        rows="5"
        cols="50"
        :placeholder="t('mama.write_comment')"
      />
      <AppButton :label="t('general.save')" />
    </div>
  </div>
</template>

<style scoped>

</style>
