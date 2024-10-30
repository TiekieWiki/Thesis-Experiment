<template>
  <main>
    <MultiTouchRotate :interface-orientation="interfaceOrientation" />
  </main>
</template>

<script setup lang="ts">
import MultiTouchRotate from '@/components/experiment/tasks/MultiTouchRotate.vue'
import { ref } from 'vue'

const interfaceOrientation = ref<string>('standard')
</script>
