<template>
  <div :class="['double-tap-zoom-in', interfaceOrientation]">
    <img
      @click="imageClicked"
      ref="image"
      :style="{ transform: `scale(${scale})` }"
      src="../../../assets/images/Test.jpg"
      alt="Photo by Greg Becker on Unsplash"
    />
  </div>
  <div id="firstDiv"></div>
  <div id="secondDiv"></div>
</template>

<script setup lang="ts">
import type { Action } from '@/utils/types/measurements'
import { onMounted, ref, useTemplateRef, watch } from 'vue'

defineProps<{
  interfaceOrientation: string
  hand: string
}>()

const emit = defineEmits(['finishedTask', 'currentAction'])

// Image
const image = useTemplateRef<HTMLElement>('image')

// Measurements
const scale = ref<number>(1)
const firstClicked = ref<boolean>(false)
const currentAction = ref<Action>({
  action: 'startDoubleTapZoomIn',
  centerX: 0,
  centerY: 0,
})

// Set initial action
onMounted(() => {
  currentAction.value = {
    action: 'startDoubleTapZoomIn',
    centerX: image.value
      ? image.value.offsetLeft + image.value.offsetWidth / 2
      : 0,
    centerY: image.value
      ? image.value.offsetTop + image.value.offsetHeight / 2
      : 0,
  }

  const firstDiv = document.getElementById('firstDiv')

  // Define coordinates in pixels
  const x1 = currentAction.value.centerX // Horizontal position in pixels
  const y1 = currentAction.value.centerY // Vertical position in pixels

  // Apply coordinates to the div
  firstDiv!.style.left = x1 + 'px'
  firstDiv!.style.top = y1 + 'px'

  // const secondDiv = document.getElementById('secondDiv')

  // // Define coordinates in pixels
  // const x2 = goalAction.value.centerX // Horizontal position in pixels
  // const y2 = goalAction.value.centerY // Vertical position in pixels

  // // Apply coordinates to the div
  // secondDiv!.style.left = x2 + 'px'
  // secondDiv!.style.top = y2 + 'px'
})

// Emit current action
watch(
  currentAction,
  () => {
    emit('currentAction', currentAction.value)
  },
  { immediate: true, flush: 'sync' },
)

/**
 * Determine the action when the image is clicked
 */
function imageClicked() {
  currentAction.value.action = 'startDoubleTapZoomIn'

  // Check if this is the first image click
  if (firstClicked.value) {
    scale.value = 2

    // Emit finished task after seeing the zoomed image
    setTimeout(() => {
      emit('finishedTask')
    }, 500)
  } else {
    firstClicked.value = true
    currentAction.value.action = 'endDoubleTapZoomIn'
    // Reset first click if double tap is not detected
    setTimeout(() => {
      firstClicked.value = false
      currentAction.value.action = 'startDoubleTapZoomIn'
    }, 500)
  }
}
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
