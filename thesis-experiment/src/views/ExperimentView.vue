<template>
  <main>
    <DragList :interface-orientation="interfaceOrientation" />
  </main>
</template>

<script setup lang="ts">
import DragList from '@/components/experiment/tasks/DragList.vue'
import { ref } from 'vue'

const interfaceOrientation = ref<string>('standard')
</script>
