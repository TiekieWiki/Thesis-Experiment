<template>
  <div :class="['drag-slider', interfaceOrientation]">
    <div class="slider">
      <input
        @touchend="dragEnded()"
        v-model="sliderValue"
        ref="slider"
        type="range"
        min="1"
        max="100"
        value="1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { xToPx } from '@/utils/logic/sizeConversion'
import type { Action } from '@/utils/types/measurements'
import { onMounted, ref, useTemplateRef, watch } from 'vue'

defineProps<{
  interfaceOrientation: string
  hand: string
}>()

const emit = defineEmits(['finishedTask', 'currentAction'])

// Slider
const slider = useTemplateRef('slider')
const sliderValue = ref<number>(1)

// Measurements
const currentAction = ref<Action>({
  action: 'startDragList',
  centerX: 0,
  centerY: 0,
})

// Set initial action
onMounted(() => {
  currentAction.value = {
    action: 'startDragSlider',
    centerX: slider.value ? slider.value.offsetLeft + xToPx('5mm') + 2 : 0,
    centerY: slider.value ? slider.value.offsetTop + xToPx('5mm') + 2 : 0,
  }
})

// Emit current action
watch(
  () => currentAction.value,
  () => {
    emit('currentAction', currentAction.value)
  },
  { immediate: true },
)

/**
 * Set current action when drag ends
 */
async function dragEnded() {
  currentAction.value = {
    action: 'endDragSlider',
    centerX: slider.value
      ? slider.value!.offsetLeft +
        slider.value!.offsetWidth -
        (xToPx('5mm') + 2)
      : 0,
    centerY: slider.value ? slider.value!.offsetTop + xToPx('5mm') + 2 : 0,
  }
  if (sliderValue.value == 100) {
    emit('finishedTask')
  } else {
    currentAction.value = {
      action: 'startDragSlider',
      centerX: slider.value
        ? slider.value.offsetLeft + slider.value.offsetWidth / 2
        : 0,
      centerY: slider.value
        ? slider.value.offsetTop + slider.value.offsetHeight / 2
        : 0,
    }
  }
}
</script>
