<script setup lang="ts">
import { AppButton } from "@/shared/ui/button";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

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
    <div class="mb-4 text-right text-sm text-brown-dark opacity-65" >
      {{ commentText?.length }} /
      <span :style="`color: ${currentLength === 0 ? 'red' : '#523629'}`">
				  {{ maxLength }}
			  </span>
    </div>

  </div>
</template>

