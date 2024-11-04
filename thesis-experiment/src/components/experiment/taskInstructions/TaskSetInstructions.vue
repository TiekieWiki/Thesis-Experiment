<template>
  <h1 v-if="hand == 'left'">Perform tasks only with left hand</h1>
  <h1 v-else>Perform tasks only with right hand</h1>
  <button @click="next">Next</button>
</template>

<script setup lang="ts">
defineProps<{
  hand: string
}>()

const emit = defineEmits(['finishedInstructions'])
function next() {
  emit('finishedInstructions')
}
</script>
