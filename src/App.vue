<script setup lang="ts">
import { RouterView } from 'vue-router';
import FooterComponent from '@/shared/ui/footer'
import HeaderComponent from '@/shared/ui/header'
</script>

<template>
  <header-component />
  <router-view class="p-5"/>
  <footer-component />
</template>


