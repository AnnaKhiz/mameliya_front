<script setup lang="ts">
import { ref} from 'vue';
import { useI18n } from "vue-i18n";
import { DiaryAddEditNote, DiaryList } from "@/pages/mama";
import { useMamaStore } from "@/entities/mama";
const { getDiaryPostsList } = useMamaStore();
const { t } = useI18n();
const isShowFull = ref<boolean>(false);

const toggleShowList = async () => {
  isShowFull.value = !isShowFull.value;
  await getDiaryPostsList()
}

</script>

<template>
  <div class="flex justify-between items-center w-full ">
    <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('mama.diary.title') }}</h2>
    <div >
      <h2
        v-if="isShowFull"
        @click="toggleShowList"
        class="text-brown-dark font-semibold mb-4 text-xl cursor-pointer hover:underline hover:text-brown-medium transition-colors duration-500"
      >
        {{ t('mama.diary.hide_list') }}
      </h2>
      <h2
        v-else
        @click="toggleShowList"
        class="text-brown-dark font-semibold mb-4 text-xl cursor-pointer hover:underline hover:text-brown-medium transition-colors duration-500"
      >
        {{ t('mama.diary.show_list') }}
      </h2>
    </div>

  </div>

  <div v-if="!isShowFull">
    <p class="mb-1">{{ t('mama.diary.description_1') }}</p>
    <p class="mb-5">{{ t('mama.diary.description_2') }}</p>
    <DiaryAddEditNote />
  </div>
  <div
    v-else
    class="h-screen overflow-auto w-full"
    id="diary"
  >
    <DiaryList />
  </div>

</template>

<style scoped>
#diary::-webkit-scrollbar {
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

