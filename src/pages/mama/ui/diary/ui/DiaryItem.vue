<script setup lang="ts">
import { parseDateToLocaleString } from "@/shared/lib/parseDateToLocaleString.ts";
import type { DiaryObjectType } from "@/entities/mama";

type Props = {
  item: DiaryObjectType;
}

defineProps<Props>();
</script>

<template>
  <div class="flex justify-between items-start gap-4 text-brown-dark bg-brown-light/15 hover:bg-brown-medium/15 hover:shadow-xl transition-all duration-500 hover:cursor-pointer rounded-md shadow-md p-2 ">
    <div class="flex justify-start items-center gap-4">

      <p class="w-32 p-2">
        {{ item.title }}
      </p>

      <p class="truncate-html " v-html="item.description"></p>
    </div>
    <div>
      <p class="text-brown-medium opacity-65 text-end">{{ parseDateToLocaleString(item.created_at)[0] }}</p>
      <p class="text-brown-medium opacity-65 text-end">{{ parseDateToLocaleString(item.created_at)[1] }}</p>
    </div>
  </div>
</template>

<style scoped>
.truncate-html {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
