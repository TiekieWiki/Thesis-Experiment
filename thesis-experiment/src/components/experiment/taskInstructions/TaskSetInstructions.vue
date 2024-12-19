<template>
  <div class="task-set-instructions">
    <h1 v-if="hand == 'left'">
      Perform oncoming tasks only with your left hand until further notice
    </h1>
    <h1 v-else>
      Perform oncoming tasks only with your right hand until further notice
    </h1>
    <button @click="next">Next</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  hand: string;
}>();

const emit = defineEmits<{
  finishedInstructions: [];
}>();

function next() {
  emit('finishedInstructions');
}
</script>
