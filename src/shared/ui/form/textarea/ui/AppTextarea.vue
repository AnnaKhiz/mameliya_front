<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

type Props = {
  isReset: boolean;
  message: string;
}
const props = defineProps<Props>();
const { t } = useI18n();

const maxLength = 300;
const commentText = defineModel<string>();

const currentLength = computed(() => {
  const text = commentText.value ?? '';
  return maxLength - text.length;
});
</script>

<template>
  <div class="w-fit">
      <textarea
        v-model="commentText"
        class="placeholder:opacity-25 block mb-2 p-4"
        rows="5"
        cols="50"
        :placeholder="t('mama.write_comment')"
        :maxlength="maxLength"
      />
    <div class="flex justify-between items-center mb-4">
      <p
        class="text-xs"
        :class="`${ !isReset ? 'text-green-900' : 'text-red-800' }`"
      >
        {{ props.message }}
      </p>
      <div class="text-right text-sm text-brown-dark opacity-65" >
        {{ commentText?.length || 0 }} /
        <span :style="`color: ${currentLength === 0 ? 'red' : '#523629'}`">
				  {{ maxLength }}
			  </span>
      </div>
    </div>


  </div>
</template>

