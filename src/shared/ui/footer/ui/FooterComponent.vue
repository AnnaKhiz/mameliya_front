<script setup lang="ts">
import { LogoImage, LogoText } from '@/shared/ui/logo'
import SocialPanel from '@/shared/ui/social/ui/SocialPanel.vue';
import ContactsFooter from '@/shared/ui/contacts'
</script>

<template>
  <footer class="flex items-start justify-between p-5 bg-gray-lighter">
    <div>
      <LogoText />
      <SocialPanel />
    </div>
    <LogoImage />
    <ContactsFooter />
  </footer>
</template>
