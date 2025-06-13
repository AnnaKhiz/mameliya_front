<script setup lang="ts">
import {type MoodDetailsType, MoodHistoryItem} from "@/entities/mood";
import {computed} from "vue";
import {storeToRefs} from "pinia";
import { useMoodStore } from "@/entities/mood";

const { usersMoodList } = storeToRefs(useMoodStore());

const sortedUsersMoodList = computed(():MoodDetailsType[] => (usersMoodList.value?.sort((a, b) => b.date - a.date)) ?? [])
</script>

<template>
  <div
    v-for="item in sortedUsersMoodList"
    :key="item.id"
    class="mb-2"
  >
    <MoodHistoryItem :item="item" />
  </div>
</template>
