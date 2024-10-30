<template>
  <main>
    <TapMenu :interface-orientation="interfaceOrientation" />
  </main>
</template>

<script setup lang="ts">
import TapMenu from '@/components/experiment/tasks/TapMenu.vue'
import { ref } from 'vue'

const interfaceOrientation = ref<string>('standard')
</script>
