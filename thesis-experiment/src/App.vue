<template>
  <template v-if="experimentClosed">
    <main class="start">
      <div class="start-instructions">
        <h1>Experiment closed</h1>
        <p>This experiment is currently closed for new participants.</p>
      </div>
    </main>
  </template>
  <RouterView v-else />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const experimentClosed = ref<boolean>(false);
</script>
