<template>
  <div :class="['drag-slider', interfaceOrientation]">
    <div class="slider">
      <input type="range" min="1" max="100" value="1" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  interfaceOrientation: string
  hand: string
}>()
</script>
