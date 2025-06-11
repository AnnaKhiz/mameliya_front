<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

type Props = {
  isTimerPaused: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits(['updateCheckedValue', 'updateTimerChecked']);
const timerChecked = defineModel<number>();

const timerList = computed(() => {
  const maxTimer = 60;
  const finalList = [];
  let i = 5;

  do {
    finalList.push({
      text: `${i} min`,
      value: i
    });
    i = i + 5;
  } while (i <= maxTimer);

  return finalList;
})
const handleChange = (event: Event) => {
  const element = event.target as HTMLSelectElement;
  emits('updateCheckedValue', +element?.value);
}
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
