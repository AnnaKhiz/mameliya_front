<script setup lang="ts">
import {computed, ref, watch} from "vue";
import { useI18n } from "vue-i18n";
import {useMamaStore} from "@/entities/mama";
import {storeToRefs} from "pinia";
const { t } = useI18n();
const { mama } = storeToRefs(useMamaStore());
const { updateTimerValue } = useMamaStore();
type Props = {
  isTimerPaused?: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits(['updateCheckedValue', 'updateTimerChecked']);
// const timerChecked = defineModel<number>();
const timerChecked = ref<number>(5);

const timerList = computed(() => {
  const maxTimer = 60;
  const finalList = [];
  let i = 5;

  do {
    finalList.push({
      text: `${i} ${t('general.min')}`,
      value: i
    });
    i = i + 5;
  } while (i <= maxTimer);

  return finalList;
})
const handleChange = async (event: Event) => {
  const element = event.target as HTMLSelectElement;
  await updateTimerValue({ total_time: +element?.value})
  // emits('updateCheckedValue', +element?.value);
}

watch(() => mama.value?.timer, (newValue) => {
  if (newValue) {
    timerChecked.value = mama.value?.timer?.total_time;
  }
})
</script>

<template>
  <div class="mb-3">
    <h3 class="text-brown-dark mb-2">{{ t('mama.set_time') }}:</h3>
    <select
      v-model.number="timerChecked"
      @change="handleChange"
      class="w-full mb-3"
      :disabled="props.isTimerPaused"
    >
      <option
        v-for="option in timerList"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>
