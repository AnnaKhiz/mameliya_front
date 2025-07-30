<script setup lang="ts">
type Props = {
  title?: string;
  error?: string;
}

defineProps<Props>();

const content = defineModel<string>();
</script>

<template>
  <div>
    <h2 v-if="title" class="mb-1 text-brown-dark">{{ title }}</h2>
    <div class="bg-white min-h-60 quill-wrapper" :class="error ? 'error-style' : ''">
      <QuillEditor
        v-model:content="content"
        content-type="html"
      />
    </div>
  </div>

</template>

<style scoped>
.quill-wrapper :deep(.ql-editor) {
  max-height: 250px;
  min-height: 250px;
}
:deep(.ql-container.ql-snow) {
  border: none;
  border-radius: 12px;
}
</style>
