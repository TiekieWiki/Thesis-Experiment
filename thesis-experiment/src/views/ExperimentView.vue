<template>
  <main>
    <TapType :interface-orientation="interfaceOrientation" />
  </main>
</template>

<script setup lang="ts">
import TapType from '@/components/experiment/tasks/TapType.vue'
import { ref } from 'vue'

const interfaceOrientation = ref<string>('standard')
</script>
