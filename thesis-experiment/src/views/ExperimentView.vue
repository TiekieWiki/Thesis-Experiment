<template>
  <main :class="interfaceOrientation">
    <DoubleTapZoomIn />
  </main>
</template>

<script setup lang="ts">
import DoubleTapZoomIn from '@/components/experiment/tasks/DoubleTapZoomIn.vue'
import { ref } from 'vue'

const interfaceOrientation = ref<string>('standard')
</script>
