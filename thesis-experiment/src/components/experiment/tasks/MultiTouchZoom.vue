<template>
  <div :class="['multi-touch-zoom', interfaceOrientation]">
    <img
      src="../../../assets/images/Test.jpg"
      alt="Photo by Greg Becker on Unsplash"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  interfaceOrientation: string
  hand: string
}>()
</script>
