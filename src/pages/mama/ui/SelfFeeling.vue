<script setup lang="ts">

import {MoodPanel, MoodPanelLayout} from "@/entities/mood/mood-panel";
import {ref, reactive, onMounted} from "vue";
import {useI18n} from "vue-i18n";
import { AppTextarea } from "@/shared/ui/form";
import {AppButton} from "@/shared/ui/button";
import {type MoodDetailsBodyType, useMoodStore} from "@/entities/mood";
import {storeToRefs} from "pinia";
import { useMamaStore} from "@/entities/mama";
const { mama } = storeToRefs(useMamaStore())

const { mood } = storeToRefs(useMoodStore())
const { addMoodInfo } = useMoodStore()

const { t } = useI18n();
const isMoodPanel = ref<boolean>(false);
const updateModal = (value: boolean) => {
  isMoodPanel.value = value;
}


const commentText = ref<string>();


const saveMoodInfo = async () => {
  const body = ref<MoodDetailsBodyType>({
    mood: mama.value?.mood || '',
    comment: commentText.value || ''
  })

  const result = await addMoodInfo(body.value);
  console.log(result.data)
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
          <MoodPanel
            v-if="isMoodPanel"
            :is-mood-panel="isMoodPanel"
            @update-modal-show="updateModal"
          />
        </Transition>
      </template>
    </MoodPanelLayout>
    <h2 class="text-brown-dark font-semibold mb-4 text-lmd"> {{ t('mama.add_comment') }}</h2>

    <AppTextarea v-model="commentText"/>
    <AppButton :label="t('general.save')" @click.prevent="saveMoodInfo"/>
  </div>
</template>

<style scoped>

</style>
