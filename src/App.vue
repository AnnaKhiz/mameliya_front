<script setup lang="ts">
import { RouterView } from 'vue-router';
import FooterComponent from '@/shared/ui/footer'
import { MainHeader, UserHeader } from '@/shared/ui/header';
import { useUserStore } from "@/entities/user";
import {storeToRefs} from "pinia";
const { isAuthenticated } = storeToRefs(useUserStore())
</script>

<template>
  <MainHeader v-if="!isAuthenticated" />
  <UserHeader v-else />
  <router-view/>
  <footer-component />
</template>


