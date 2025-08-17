<script setup lang="ts">
import { TabContent, TabTitles } from "@/shared/ui/tabs";
import { ref } from "vue";
const content = ref('all');

const updateContent = (value: string) => {
  content.value = value;
}
</script>

<template>
  <div class="w-full p-2 bg-brown-dark h-full mt-10 relative text-white">
    <TabContent :content="content" />
    <div class="absolute -top-10 left-0 h-10">
      <TabTitles @update:content="updateContent"/>
    </div>
  </div>
</template>

