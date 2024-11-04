<template>
  <div :class="['multi-touch-rotate', interfaceOrientation]">
    <img
      src="../../../assets/images/Test.jpg"
      alt="Photo by Greg Becker on Unsplash"
    />
  </div>
  <button @click="next">Next</button>
</template>

<script setup lang="ts">
defineProps<{
  interfaceOrientation: string
  hand: string
}>()

const emit = defineEmits(['finishedTask'])
function next() {
  emit('finishedTask')
}
</script>
