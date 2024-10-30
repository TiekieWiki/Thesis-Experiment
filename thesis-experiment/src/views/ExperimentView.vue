<template>
  <main>
    <LongTapHyperlink :interface-orientation="interfaceOrientation" />
  </main>
</template>

<script setup lang="ts">
import LongTapHyperlink from '@/components/experiment/tasks/LongTapHyperlink.vue'
import { ref } from 'vue'

const interfaceOrientation = ref<string>('standard')
</script>
