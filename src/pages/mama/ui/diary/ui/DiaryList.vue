<script setup lang="ts">
import { storeToRefs } from "pinia";
import { type DiaryObjectType, useMamaStore } from "@/entities/mama";
import { computed } from "vue";
import { DiaryItem } from "@/pages/mama";

const { mama } = storeToRefs(useMamaStore())

const sortedPostsList = computed(():DiaryObjectType[] => (mama.value?.diary?.sort((a, b) => b.created_at - a.created_at)) ?? [])
</script>

<template>
  <div
    v-for="item in sortedPostsList"
    :key="item.id"
    class="mb-2"
  >
    <DiaryItem :item="item" />
  </div>
</template>

<style scoped>

</style>
