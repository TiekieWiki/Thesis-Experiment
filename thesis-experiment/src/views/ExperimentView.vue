<template>
  <main>
    <LongTapSelect :interface-orientation="interfaceOrientation" />
  </main>
</template>

<script setup lang="ts">
import LongTapSelect from '@/components/experiment/tasks/LongTapSelect.vue'
import { ref } from 'vue'

const interfaceOrientation = ref<string>('standard')
</script>
