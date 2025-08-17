<script setup lang="ts">
type Props = {
  content: string;
}
defineProps<Props>();
</script>

<template>
  <div>
    content {{ content }}
  </div>
</template>
