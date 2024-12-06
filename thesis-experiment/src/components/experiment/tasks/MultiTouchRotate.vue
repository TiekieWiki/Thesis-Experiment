<template>
  <div :class="['multi-touch-rotate', interfaceOrientation]">
    <img
      src="../../../assets/images/Test.jpg"
      alt="Photo by Greg Becker on Unsplash"
    />
  </div>
  <button @click="next">Next</button>
  <div id="firstDiv"></div>
</template>

<script setup lang="ts">
defineProps<{
  interfaceOrientation: string;
  hand: string;
}>();

const emit = defineEmits(['finishedTask']);
function next() {
  emit('finishedTask');
}

// const firstDiv = document.getElementById('firstDiv');

// // Define coordinates in pixels
// const x1 = currentAction.value.centerX; // Horizontal position in pixels
// const y1 = currentAction.value.centerY; // Vertical position in pixels

// // Apply coordinates to the div
// firstDiv!.style.left = x1 + 'px';
// firstDiv!.style.top = y1 + 'px';
</script>

<style scoped>
#firstDiv,
#secondDiv {
  position: absolute;
  width: 1px;
  height: 1px;
  background-color: red;
}
</style>
