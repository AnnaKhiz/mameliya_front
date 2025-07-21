<script setup lang="ts">
import SidebarMenu from "../../sidebar/ui/SidebarMenu.vue";
import {SidebarStatistic} from "@/entities/sidebar";
</script>

<template>
  <div class="flex items-stretch justify-between ">
    <SidebarMenu class="h-full"/>
    <router-view class="bg-gradient-main w-full"/>
    <SidebarStatistic class="h-full"/>
  </div>
</template>
