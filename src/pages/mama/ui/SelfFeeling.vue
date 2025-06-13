<script setup lang="ts">
import {MoodPanel, MoodPanelLayout} from "@/entities/mood/mood-panel";
import {ref, onMounted, computed} from "vue";
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

const { addMoodInfo, getMoodInfoList } = useMoodStore()

const { t } = useI18n();
const isMoodPanel = ref<boolean>(false);
const updateModal = (value: boolean) => {
  isMoodPanel.value = value;
}

const commentText = ref<string>();
const isMoodStoryHidden = ref<boolean>(true);
const isCommentHidden = ref<boolean>(true);
const isReset = computed(():boolean => !!commentText?.value?.trim());
const message = ref<string>('');

const saveMoodInfo = async () => {
  const body = ref<MoodDetailsBodyType>({
    mood: mama.value?.mood || '',
    comment: commentText.value || ''
  })

  const result = await addMoodInfo(body.value);

  if (result.code !== 200) {
    message.value = t('mama.error_sending_mood_info');
  }

  if (result.code === 200) {
    commentText.value = '';
    setTimeout(() => {
      message.value = '';
    }, 1000)
    message.value = t('general.successfully_sent');
  }
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
  <div class="flex flex-col justify-between items-start h-full overflow-hidden p-5">
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
      <div class="text-brown-dark flex flex-col justify-between items-start gap-3 mb-6">
        <p>{{ t('mama.stop_and_listen') }}</p>
        <p>{{ t('mama.select_your_mood') }}</p>
        <p>{{ t('mama.appear_mood_history') }}</p>
        <p>{{ t('mama.say_your_mood') }}</p>
      </div>
    </div>

    <div class="w-full">
      <div>
        <h2 @click="toggleCommentVisibility" class="cursor-pointer text-brown-dark text-md font-semibold hover:animate-pulse hover:underline mb-4">
          {{ isCommentHidden ? t('mama.add_comment') : t('mama.hide_comment_form') }}
        </h2>

        <div v-if="!isCommentHidden" class="mb-6">
          <AppTextarea
            v-model="commentText"
            :is-reset="isReset"
            :message="message"
          />
          <AppButton :disabled="!isReset" :label="t('general.save')" @click.prevent="saveMoodInfo"/>
        </div>
      </div>
      <div >
        <h2 @click="toggleMoodStory" class="cursor-pointer text-brown-dark text-md font-semibold hover:animate-pulse hover:underline mb-4">
          {{ !isMoodStoryHidden ? t('mama.hide_mood_history_list') : t('mama.show_mood_history_list')}}
        </h2>
        <div class="max-h-64 overflow-auto w-full" id="history">
          <MoodHistoryList v-if="!isMoodStoryHidden" />
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
#history::-webkit-scrollbar {
  width: 2px;
}

::-webkit-scrollbar-track {
  width: 2px;
  background: #735c52;
}

::-webkit-scrollbar-thumb {
  background: white;
}
</style>
