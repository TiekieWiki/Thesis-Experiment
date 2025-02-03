<template>
  <div :class="['multi-touch-zoom', interfaceOrientation]">
    <slot></slot>
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
import { distance } from '@/utils/logic/math';
import { resultTimer } from '@/utils/logic/timers';
import type { Action } from '@/utils/types/measurements';
import { ref, useTemplateRef } from 'vue';

defineProps<{
  interfaceOrientation: string;
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
const finished = ref<boolean>(false);

// Set initial action
useOnMountedCurrentAction(currentAction, 'startMultiTouchZoom', imageRef);

// Emit current action
useEmitCurrentAction(currentAction, emit);

/**
 * Start zooming
 * @param event Touch event
 */
function startZoom(event: TouchEvent): void {
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
function zoom(event: TouchEvent): void {
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
function endZoom(): void {
  currentAction.value.action = 'endMultiTouchZoom';
  if (scale.value > 1.5 && !finished.value) {
    finished.value = true;
    // Emit finished task after seeing the zoomed image
    setTimeout(() => {
      emit('finishedTask');
    }, resultTimer);
  } else if (!finished.value) {
    // Reset the image position
    scale.value = 1;
  }
}
</script>
