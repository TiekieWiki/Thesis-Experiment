<template>
  <h1>Instructions</h1>
  <p>{{ getTaskInstruction(task) }}</p>
  <p>Reminder: perform this task with your {{ hand }} hand</p>
  <button @click="next">Next</button>
</template>

<script setup lang="ts">
import { getTaskInstruction } from '@/utils/logic/selectTask'

defineProps<{
  hand: string
  task: string
}>()

const emit = defineEmits(['finishedInstructions'])
function next() {
  emit('finishedInstructions')
}
</script>
