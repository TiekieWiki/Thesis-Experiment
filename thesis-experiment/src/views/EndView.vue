<template>
  <main class="end">
    <h1>Thank you for participating!</h1>
    <p>
      You have completed the experiment and your answers have been saved. Thank
      you for your time.
    </p>
  </main>
</template>

<script setup lang="ts">
import { writeCheckpoint } from '@/utils/localDb';
import type { Checkpoint } from '@/utils/types/checkpoint';
import { timestamp } from '@vueuse/core';
import { onMounted } from 'vue';

onMounted(async () => {
  // Write a checkpoint
  const checkpoint: Checkpoint = {
    id: 'finishedExperiment',
    data: '',
    timestamp: timestamp(),
  };
  await writeCheckpoint(checkpoint);
});
</script>
