<template>
  <div :class="['multi-touch-zoom', interfaceOrientation]">
    <img
      @touchstart="startZoom"
      @touchmove="zoom"
      @touchend="endZoom"
      ref="imageRef"
      :style="{
        transform: `scale(${scale})`,
      }"
      src="../../../assets/images/Test.jpg"
      alt="Photo by Greg Becker on Unsplash"
    />
  </div>
</template>

<script setup lang="ts">
import {
  useEmitCurrentAction,
  useOnMountedCurrentAction,
} from '@/composables/useTasks';
import { resultTimer } from '@/utils/logic/timers';
import type { Action } from '@/utils/types/measurements';
import { ref, useTemplateRef } from 'vue';

defineProps<{
  interfaceOrientation: string;
  hand: string;
}>();

const emit = defineEmits<{
  finishedTask: [];
  currentAction: [value: Action];
}>();

// Image
const imageRef = useTemplateRef<HTMLElement>('imageRef');

// Measurements
const scale = ref<number>(1);
const startDistance = ref<number>(0);
const currentAction = ref<Action>({
  action: 'startMultiTouchZoom',
  centerX: 0,
  centerY: 0,
});

// Set initial action
useOnMountedCurrentAction(currentAction, 'startMultiTouchZoom', imageRef);

// Emit current action
useEmitCurrentAction(currentAction, emit);

/**
 * Distance between two fingers
 * @param event Touch event
 */
function distance(event: TouchEvent) {
  return Math.hypot(
    event.touches[0].clientX - event.touches[1].clientX,
    event.touches[0].clientY - event.touches[1].clientY,
  );
}

/**
 * Start zooming
 * @param event Touch event
 */
function startZoom(event: TouchEvent) {
  currentAction.value.action = 'startMultiTouchZoom';
  if (event.touches.length === 2) {
    // Prevent page scroll
    event.preventDefault();

    // Calculate the start distance of the fingers
    startDistance.value = distance(event);
  }
}

/**
 * Zoom the image
 * @param event Touch event
 */
function zoom(event: TouchEvent) {
  if (event.touches.length === 2) {
    // Prevent page scroll
    event.preventDefault();

    // Calculate the new scale
    scale.value = Math.min(
      Math.max(1, distance(event) / startDistance.value),
      4,
    );
  }
}

/**
 * End zooming
 */
function endZoom() {
  currentAction.value.action = 'endMultiTouchZoom';
  if (scale.value > 1.5) {
    // Emit finished task after seeing the zoomed image
    setTimeout(() => {
      emit('finishedTask');
    }, resultTimer);
  } else {
    // Reset the image position
    scale.value = 1;
  }
}
</script>
