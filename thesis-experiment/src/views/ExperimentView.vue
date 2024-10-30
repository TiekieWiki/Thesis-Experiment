<template>
  <main>
    <DragSlider :interface-orientation="interfaceOrientation" />
  </main>
</template>

<script setup lang="ts">
import DragSlider from '@/components/experiment/tasks/DragSlider.vue'
import { ref } from 'vue'

const interfaceOrientation = ref<string>('standard')
</script>
