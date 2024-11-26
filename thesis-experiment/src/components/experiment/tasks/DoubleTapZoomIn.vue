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
