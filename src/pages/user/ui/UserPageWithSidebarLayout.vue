<script setup lang="ts">
import SidebarMenu from "../../../entities/sidebar/ui/SidebarMenu.vue";
</script>

<template>
  <div class="flex items-stretch justify-start flex-1">
    <SidebarMenu class="h-full"/>
    <router-view />
  </div>
</template>
