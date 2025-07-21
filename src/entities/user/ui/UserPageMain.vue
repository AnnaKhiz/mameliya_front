<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from 'vue';
import { UserPageWithSidebarLayout, UserSectionsMenu } from "@/entities/user";

const route = useRoute();

const path = computed(() => (route.name === 'user-home'));
</script>

<template>
  <UserSectionsMenu v-if="path"  />
  <UserPageWithSidebarLayout v-else />
</template>

