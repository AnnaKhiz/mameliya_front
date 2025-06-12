<script setup lang="ts">
import {MoodPanel, MoodPanelLayout} from "@/entities/mood/mood-panel";
import {ref, onMounted} from "vue";
import {useI18n} from "vue-i18n";
import { AppTextarea } from "@/shared/ui/form";
import {AppButton} from "@/shared/ui/button";
import {
  type MoodDetailsBodyType,
  MoodHistoryList,
  useMoodStore
} from "@/entities/mood";
import {storeToRefs} from "pinia";
import { useMamaStore} from "@/entities/mama";
const { mama } = storeToRefs(useMamaStore())

const { usersMoodList } = storeToRefs(useMoodStore())
const { addMoodInfo, getMoodInfoList } = useMoodStore()

const { t } = useI18n();
const isMoodPanel = ref<boolean>(false);
const updateModal = (value: boolean) => {
  isMoodPanel.value = value;
}

const commentText = ref<string>();
const isMoodStoryHidden = ref<boolean>(true);
const isCommentHidden = ref<boolean>(true);

const saveMoodInfo = async () => {
  const body = ref<MoodDetailsBodyType>({
    mood: mama.value?.mood || '',
    comment: commentText.value || ''
  })
  await addMoodInfo(body.value);
}

onMounted(async () => {
  await getMoodInfoList();
})

const toggleMoodStory = () => {
  isMoodStoryHidden.value = !isMoodStoryHidden.value;
}
const toggleCommentVisibility = () => {
  isCommentHidden.value = !isCommentHidden.value;
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
    <div>
      <h2 @click="toggleCommentVisibility" class="cursor-pointer text-brown-dark text-md font-semibold hover:animate-pulse hover:underline mb-4">
        {{ isCommentHidden ? t('mama.add_comment') : t('mama.hide_comment_form') }}
      </h2>

      <div v-if="!isCommentHidden" class="mb-6">
        <AppTextarea v-model="commentText"/>
        <AppButton :label="t('general.save')" @click.prevent="saveMoodInfo"/>
      </div>
    </div>


    <div>
      <h2 @click="toggleMoodStory" class="cursor-pointer text-brown-dark text-md font-semibold hover:animate-pulse hover:underline mb-4">
        {{ !isMoodStoryHidden ? t('mama.hide_mood_history_list') : t('mama.show_mood_history_list')}}
      </h2>
      <MoodHistoryList v-if="!isMoodStoryHidden" />
    </div>
  </div>
</template>

