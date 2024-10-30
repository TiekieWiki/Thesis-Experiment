<template>
  <div :class="['double-tap-zoom-out', interfaceOrientation]">
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
