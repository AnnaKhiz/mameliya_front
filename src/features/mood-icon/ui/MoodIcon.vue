<script setup lang="ts">
import { FaceFrownIcon, FaceSmileIcon } from "@heroicons/vue/16/solid";
import { onMounted } from "vue";
import { useMamaStore } from "@/entities/mama";
import {storeToRefs} from "pinia";
const { mama } = storeToRefs(useMamaStore());
const { getMamaInfo } = useMamaStore();

onMounted(async () => {
  await getMamaInfo();
})
</script>

<template>
  <div>
    <FaceSmileIcon
      v-if="mama?.mood === 'good'"
      class="fill-green-mood w-7 cursor-pointer"

    />
    <FaceSmileIcon
      v-if="mama?.mood === 'normal'"
      class="fill-yellow-600 w-7 cursor-pointer"
    />
    <FaceFrownIcon
      v-if="mama?.mood === 'bad'"
      class="w-7 cursor-pointer fill-red-900"
    />
  </div>
</template>
