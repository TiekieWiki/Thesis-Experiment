<template>
  <main>
    <DoubleTapZoomIn :interface-orientation="interfaceOrientation" />
  </main>
</template>

<script setup lang="ts">
import DoubleTapZoomIn from '@/components/experiment/tasks/DoubleTapZoomIn.vue'
import { ref } from 'vue'

const interfaceOrientation = ref<string>('standard')
</script>
