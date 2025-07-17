<script setup lang="ts">
import { ref } from 'vue';


const content = defineModel<string>();
</script>

<template>
  <div class="bg-white min-h-60 quill-wrapper">
    <QuillEditor
      v-model:content="content"
      content-type="html"
    />
  </div>
</template>

<style scoped>
.quill-wrapper :deep(.ql-editor) {
  max-height: 250px;
  min-height: 250px;
}
</style>
