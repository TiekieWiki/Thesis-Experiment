<template>
  <main>
    <DoubleTapZoomOut :interface-orientation="interfaceOrientation" />
  </main>
</template>

<script setup lang="ts">
import DoubleTapZoomOut from '@/components/experiment/tasks/DoubleTapZoomIn.vue'
import { ref } from 'vue'

const interfaceOrientation = ref<string>('standard')
</script>
