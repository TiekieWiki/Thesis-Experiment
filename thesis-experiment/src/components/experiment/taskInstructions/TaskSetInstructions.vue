<template>
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
