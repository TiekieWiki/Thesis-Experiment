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
import type { Action } from '@/utils/types/measurements';
import { onMounted, ref, useTemplateRef, watch } from 'vue';

defineProps<{
  interfaceOrientation: string;
  hand: string;
}>();

const emit = defineEmits(['finishedTask', 'currentAction']);

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
onMounted(() => {
  currentAction.value = {
    action: 'startMultiTouchZoom',
    centerX: imageRef.value
      ? imageRef.value.offsetLeft + imageRef.value.offsetWidth / 2
      : 0,
    centerY: imageRef.value
      ? imageRef.value.offsetTop + imageRef.value.offsetHeight / 2
      : 0,
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
    }, 500);
  } else {
    // Reset the image position
    scale.value = 1;
  }
}
</script>
