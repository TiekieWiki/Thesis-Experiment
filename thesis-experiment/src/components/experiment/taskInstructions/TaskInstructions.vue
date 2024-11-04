<template>
  <h1>Instructions {{ hand }} {{ task }}</h1>
  <button @click="next">Next</button>
</template>

<script setup lang="ts">
defineProps<{
  hand: string
  task: string
}>()

const emit = defineEmits(['finishedInstructions'])
function next() {
  emit('finishedInstructions')
}
</script>
