<script setup lang="ts">
import { onMounted, watch} from 'vue';

import {
  NewRitualForm,
  RitualDetailsActionsMenu,
  RitualDetailsList,
  RitualDetailsLayout, type RitualSectionType
} from "@/entities/ritual";

import { parseDateToString } from "@/shared/lib/parseDateToString.ts";

type Props = {
  checkedMenu: RitualSectionType;
}
const props = defineProps<Props>();
import { useRitualStore } from "@/entities/ritual/model/useRitualStore.ts";
import {storeToRefs} from "pinia";
import TagComponent from "@/shared/ui/tag";
import {TranslateButton} from "@/shared/ui/translate-button";
const { getRitualsBySection, getFavoriteRituals, resetIsChecked, updateCheckedRitual } = useRitualStore();
const { ritualsList, checkedFavorites, isAddNewForm, checkedRitual } = storeToRefs(useRitualStore());

watch(() => ritualsList.value, (newValue) => {
  if (newValue) {
    checkedFavorites.value = newValue.filter(e => e.checked);
  }
}, { deep: true });

watch(() => props.checkedMenu, async (newValue) => {
  resetIsChecked();
  if (newValue && newValue === 'my_rituals') {
    await getFavoriteRituals();
  } else {
    await getRitualsBySection(props.checkedMenu);
  }
})

onMounted(async () => {
  if (props.checkedMenu === 'my_rituals') {
    await getFavoriteRituals();
  } else {
    await getRitualsBySection(props.checkedMenu);
  }
})



</script>

<template>
  <RitualDetailsLayout>
    <template #content-left>
      <RitualDetailsActionsMenu :is-add-icon="props.checkedMenu === 'my_rituals'" />
      <RitualDetailsList />
    </template>

    <template #content-right>
      <div v-if="checkedRitual && !isAddNewForm" class="overflow-auto">

        <div class="flex gap-2 text-xs text-gray-500/50 ml-auto w-fit">
          <span>{{ checkedRitual?.creator }},</span>
          <span>{{ parseDateToString(checkedRitual?.created_at) }}</span>
        </div>

        <TagComponent
          class="px-5"
          :new-ritual-form="checkedRitual"
          no-actions
        />

        <h2 class="pt-5 px-5 font-bold text-lg">{{ checkedRitual.title }}</h2>

        <div class="p-5 " v-html="checkedRitual.description"></div>
        <TranslateButton
          :lang="checkedRitual.lang"
          :title="checkedRitual.title"
          :html="checkedRitual.description"
          @update:description="updateCheckedRitual($event)"
        />
      </div>

      <div v-else-if="isAddNewForm && props.checkedMenu === 'my_rituals'" class="w-full h-full">
        <NewRitualForm />
      </div>
    </template>
  </RitualDetailsLayout>
</template>

<style scoped>

</style>
