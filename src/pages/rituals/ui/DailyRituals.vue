<script setup lang="ts">
import { RitualsList } from "@/entities/ritual";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

</script>

<template>
    <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('mama.daily_rituals') }}:</h2>
    <RitualsList />
</template>

