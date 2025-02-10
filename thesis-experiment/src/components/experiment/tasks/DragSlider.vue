<template>
  <div :class="['drag-slider', interfaceOrientation]">
    <slot></slot>
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
import { useEmitCurrentAction } from '@/composables/useTasks';
import { xToPx } from '@/utils/logic/sizeConversion';
import { showMeasurementPoints } from '@/utils/logic/tests';
import { emitTimer } from '@/utils/logic/timers';
import type { Action } from '@/utils/types/measurements';
import { onMounted, ref, useTemplateRef } from 'vue';

defineProps<{
  interfaceOrientation: string;
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
    centerX: sliderRef.value
      ? window.screen.width -
        window.innerWidth +
        sliderRef.value.getBoundingClientRect().left +
        xToPx('5mm')
      : 0,
    centerY: sliderRef.value
      ? window.screen.height -
        window.innerHeight +
        sliderRef.value.getBoundingClientRect().top +
        xToPx('5mm')
      : 0,
  };
  showMeasurementPoints(
    currentAction.value.centerX,
    currentAction.value.centerY,
    true,
  );
});

// Emit current action
useEmitCurrentAction(currentAction, emit);

/**
 * Set current action when drag starts
 */
function dragStarted(): void {
  currentAction.value = {
    action: 'startDragSlider',
    centerX: sliderRef.value
      ? window.screen.width -
        window.innerWidth +
        sliderRef.value.getBoundingClientRect().left +
        xToPx('5mm')
      : 0,
    centerY: sliderRef.value
      ? window.screen.height -
        window.innerHeight +
        sliderRef.value.getBoundingClientRect().top +
        xToPx('5mm')
      : 0,
  };
}

/**
 * Set current action when drag ends
 */
function dragEnded(): void {
  currentAction.value = {
    action: 'endDragSlider',
    centerX: sliderRef.value
      ? window.screen.width -
        window.innerWidth +
        sliderRef.value.getBoundingClientRect().left +
        sliderRef.value.getBoundingClientRect().width -
        xToPx('5mm')
      : 0,
    centerY: sliderRef.value
      ? window.screen.height -
        window.innerHeight +
        sliderRef.value.getBoundingClientRect().top +
        xToPx('5mm')
      : 0,
  };

  // Wait for current action to be emitted
  setTimeout(() => {
    if (sliderValue.value == 100) {
      emit('finishedTask');
    }
  }, emitTimer);
}
</script>
