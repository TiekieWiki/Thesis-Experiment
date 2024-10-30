<template>
  <div :class="['multi-touch-rotate', interfaceOrientation]">
    <img
      src="../../../assets/images/Test.jpg"
      alt="Photo by Greg Becker on Unsplash"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  interfaceOrientation: string
}>()
</script>
