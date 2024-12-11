<template>
  <div :class="['multi-touch-rotate', interfaceOrientation]">
    <img
      @touchstart="startRotate"
      @touchmove="rotate"
      @touchend="endRotate"
      ref="imageRef"
      :style="{
        transform: `rotate(${rotation}deg)`,
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
import { calculateAngle } from '@/utils/logic/math';
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
const rotation = ref<number>(0);
const startAngle = ref<number>(0);
const currentAction = ref<Action>({
  action: 'startMultiTouchRotate',
  centerX: 0,
  centerY: 0,
});

// Set initial action
useOnMountedCurrentAction(currentAction, 'startMultiTouchRotate', imageRef);

// Emit current action
useEmitCurrentAction(currentAction, emit);

/**
 * Start rotating
 * @param event Touch event
 */
function startRotate(event: TouchEvent) {
  currentAction.value.action = 'startMultiTouchRotate';
  if (event.touches.length === 2) {
    // Prevent page scroll
    event.preventDefault();

    // Calculate the start position
    startAngle.value = calculateAngle(
      event.touches[0].clientX,
      event.touches[0].clientY,
      event.touches[1].clientX,
      event.touches[1].clientY,
    );
  }
}

/**
 * Rotate the image
 * @param event Touch event
 */
function rotate(event: TouchEvent) {
  if (event.touches.length === 2) {
    // Prevent page scroll
    event.preventDefault();

    // Calculate the new rotation
    const currentAngle = calculateAngle(
      event.touches[0].clientX,
      event.touches[0].clientY,
      event.touches[1].clientX,
      event.touches[1].clientY,
    );

    // Update rotation
    rotation.value += currentAngle - startAngle.value;

    // Update start angle
    startAngle.value = currentAngle;
  }
}

/**
 * End rotate
 */
function endRotate() {
  currentAction.value.action = 'endMultiTouchRotate';
  if (rotation.value > 45 || rotation.value < -45) {
    // Emit finished task after seeing the rotated image
    setTimeout(() => {
      emit('finishedTask');
    }, resultTimer);
  } else {
    // Reset the image position
    rotation.value = 0;
  }
}
</script>
