<template>
  <div class="task-set-instructions">
    <progress :value="(4 - remainingTaskSets) * 0.2" max="1">
      {{ (4 - remainingTaskSets) * 20 + '%' }}
    </progress>
    <h1 v-if="hand == 'left'">
      Perform oncoming tasks ONLY with your LEFT HAND until further notice
    </h1>
    <h1 v-else>
      Perform oncoming tasks ONLY with your RIGHT HAND until further notice
    </h1>
    <button @click="next">Next</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  hand: string;
  remainingTaskSets: number;
}>();

const emit = defineEmits<{
  finishedInstructions: [];
}>();

function next(): void {
  emit('finishedInstructions');
}
</script>
