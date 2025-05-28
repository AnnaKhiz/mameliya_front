<script setup lang="ts">
import { LogoImage, LogoText } from '@/shared/ui/logo'
import SocialPanel from '@/shared/ui/social/ui/SocialPanel.vue';
import ContactsFooter from '@/shared/ui/contacts'
</script>

<template>
  <footer class="sm:flex items-start justify-between p-5 bg-gray-lighter xs:block">
    <div class="xs:m-auto xs:w-fit sm:m-0 xs:mb-5">
      <LogoText />
      <SocialPanel />
    </div>
    <LogoImage class="xs:m-auto xs:w-fit sm:m-0 xs:mb-5" />
    <ContactsFooter class="xs:m-auto xs:w-fit sm:m-0" />
  </footer>
</template>
