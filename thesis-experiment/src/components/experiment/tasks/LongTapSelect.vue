<template>
  <div :class="['long-tap-select', interfaceOrientation]">
    <p class="select-text">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro suscipit
      explicabo sapiente similique expedita culpa beatae magni eveniet alias ad!
      Corrupti modi atque eos, optio dolorem aspernatur rem molestiae animi.
    </p>
  </div>
  <button @click="next">Next</button>
  <div id="firstDiv"></div>
  <div id="secondDiv"></div>
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

// const firstDiv = document.getElementById('firstDiv')

// // Define coordinates in pixels
// const x1 = currentAction.value.centerX // Horizontal position in pixels
// const y1 = currentAction.value.centerY // Vertical position in pixels

// // Apply coordinates to the div
// firstDiv!.style.left = x1 + 'px'
// firstDiv!.style.top = y1 + 'px'

// const secondDiv = document.getElementById('secondDiv')

// // Define coordinates in pixels
// const x2 = goalAction.value.centerX // Horizontal position in pixels
// const y2 = goalAction.value.centerY // Vertical position in pixels

// // Apply coordinates to the div
// secondDiv!.style.left = x2 + 'px'
// secondDiv!.style.top = y2 + 'px'
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
