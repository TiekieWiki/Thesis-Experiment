<template>
  <div :class="['flick-left', interfaceOrientation]">
    <img
      @touchstart="flickStarted"
      @touchmove="flickMoving"
      @touchend="flickEnded"
      ref="image"
      :style="{ transform: `translateX(${translateX}px)` }"
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
const translateX = ref<number>(0)
const isFlicking = ref<boolean>(false)
const startX = ref<number>(0)
const currentAction = ref<Action>({
  action: 'startFlickLeft',
  centerX: 0,
  centerY: 0,
})
const goalAction = ref<Action>({
  action: 'endFlickLeft',
  centerX: 0,
  centerY: 0,
})

// Set initial action and goal
onMounted(() => {
  currentAction.value = {
    action: 'startFlickLeft',
    centerX: image.value
      ? image.value.offsetLeft + image.value.offsetWidth / 2
      : 0,
    centerY: image.value
      ? image.value.offsetTop + image.value.offsetHeight / 2
      : 0,
  }
  goalAction.value = {
    action: 'endFlickLeft',
    centerX: image.value
      ? image.value.offsetLeft - image.value.offsetWidth / 2
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

  const secondDiv = document.getElementById('secondDiv')

  // Define coordinates in pixels
  const x2 = goalAction.value.centerX // Horizontal position in pixels
  const y2 = goalAction.value.centerY // Vertical position in pixels

  // Apply coordinates to the div
  secondDiv!.style.left = x2 + 'px'
  secondDiv!.style.top = y2 + 'px'
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
 * Set current action and start position when flicking starts
 * @param event Touch event
 */
function flickStarted(event: TouchEvent) {
  currentAction.value = {
    action: 'startFlickLeft',
    centerX: image.value
      ? image.value.offsetLeft + image.value.offsetWidth / 2
      : 0,
    centerY: image.value
      ? image.value.offsetTop + image.value.offsetHeight / 2
      : 0,
  }

  isFlicking.value = true
  startX.value = event.touches ? event.touches[0].clientX : 0
}

/**
 * Move image when flicking
 * @param event Touch event
 */
function flickMoving(event: TouchEvent) {
  if (!isFlicking.value) return

  const currentX = event.touches ? event.touches[0].clientX : 0
  translateX.value = currentX - startX.value
}

/**
 * Set current action and end position when flicking ends
 */
function flickEnded() {
  currentAction.value = goalAction.value
  isFlicking.value = false

  // Wait for current action to be emitted
  setTimeout(() => {
    // Check if the image has been swiped enough to the left
    if (translateX.value < -image.value!.offsetWidth / 2) {
      emit('finishedTask')
    } else {
      translateX.value = 0
    }
  }, 100)
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
