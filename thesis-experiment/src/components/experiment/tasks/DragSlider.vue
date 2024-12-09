<template>
  <div :class="['drag-slider', interfaceOrientation]">
    <div class="slider">
      <input
        @touchstart="dragStarted"
        @touchend="dragEnded"
        v-model="sliderValue"
        ref="sliderRef"
        type="range"
        min="1"
        max="100"
        value="1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { xToPx } from '@/utils/logic/sizeConversion';
import { emitTimer } from '@/utils/logic/timers';
import type { Action } from '@/utils/types/measurements';
import { onMounted, ref, useTemplateRef, watch } from 'vue';

defineProps<{
  interfaceOrientation: string;
  hand: string;
}>();

const emit = defineEmits<{
  finishedTask: [];
  currentAction: [value: Action];
}>();

// Slider
const sliderRef = useTemplateRef<HTMLElement>('sliderRef');
const sliderValue = ref<number>(1);

// Measurements
const currentAction = ref<Action>({
  action: 'startDragSlider',
  centerX: 0,
  centerY: 0,
});

// Set initial action
onMounted(() => {
  currentAction.value = {
    action: 'startDragSlider',
    centerX: sliderRef.value ? sliderRef.value.offsetLeft + xToPx('5mm') : 0,
    centerY: sliderRef.value ? sliderRef.value.offsetTop + xToPx('5mm') : 0,
  };
});

// Emit current action
watch(
  currentAction,
  () => {
    emit('currentAction', currentAction.value);
  },
  { immediate: true, flush: 'sync' },
);

/**
 * Set current action when drag starts
 */
function dragStarted() {
  currentAction.value = {
    action: 'startDragSlider',
    centerX: sliderRef.value ? sliderRef.value.offsetLeft + xToPx('5mm') : 0,
    centerY: sliderRef.value ? sliderRef.value.offsetTop + xToPx('5mm') : 0,
  };
}

/**
 * Set current action when drag ends
 */
function dragEnded() {
  currentAction.value = {
    action: 'endDragSlider',
    centerX: sliderRef.value
      ? sliderRef.value!.offsetLeft +
        sliderRef.value!.offsetWidth -
        xToPx('5mm')
      : 0,
    centerY: sliderRef.value ? sliderRef.value!.offsetTop + xToPx('5mm') : 0,
  };

  // Wait for current action to be emitted
  setTimeout(() => {
    if (sliderValue.value == 100) {
      emit('finishedTask');
    }
  }, emitTimer);
}
</script>
