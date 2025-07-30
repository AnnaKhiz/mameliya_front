<script setup lang="ts">
import {type DiaryObjectType, useMamaStore} from "@/entities/mama";
import { parseDateToLocaleString } from "@/shared/lib/parseDateToLocaleString.ts";
import {storeToRefs} from "pinia";
import LoaderComponent from "@/features/loader";
const { isLoading } = storeToRefs(useMamaStore());
type Props = {
  item: DiaryObjectType;
}
defineProps<Props>();
</script>

<template>
  <div v-if="!isLoading" class="w-full h-2/3 overflow-auto ">
    <div class="text-right mb-2">
      <span class="text-brown-medium opacity-65 text-sm">{{ parseDateToLocaleString(item.created_at)[0]}}, </span>
      <span class="text-brown-medium opacity-65 text-sm">{{ parseDateToLocaleString(item.created_at)[1]}}</span>
    </div>

    <p v-html="item.description"></p>
  </div>
  <LoaderComponent v-else />
</template>

<style scoped>

</style>
