<template>
  <div :class="['flick-right', interfaceOrientation]">
    <img
      @touchstart="flickStarted"
      @touchmove="flickMoving"
      @touchend="flickEnded"
      ref="imageRef"
      :style="{ transform: `translateX(${translateX}px)` }"
      src="../../../assets/images/Test.jpg"
      alt="Photo by Greg Becker on Unsplash"
    />
  </div>
</template>

<script setup lang="ts">
import {
  useFlickEnded,
  useFlickMoving,
  useFlickStarted,
} from '@/composables/tasks/useFlick';
import {
  useEmitCurrentAction,
  useOnMountedCurrentAction,
} from '@/composables/useTasks';
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
const translateX = ref<number>(0);
const isFlicking = ref<boolean>(false);
const startX = ref<number>(0);
const currentAction = ref<Action>({
  action: 'startFlickRight',
  centerX: 0,
  centerY: 0,
});
const goalAction = ref<Action>({
  action: 'endFlickRight',
  centerX: 0,
  centerY: 0,
});

// Set initial action and goal
useOnMountedCurrentAction(currentAction, 'startFlickRight', imageRef);
useOnMountedCurrentAction(goalAction, 'endFlickRight', imageRef);

// Emit current action
useEmitCurrentAction(currentAction, emit);

/**
 * Start flicking
 * @param event Touch event
 */
function flickStarted(event: TouchEvent) {
  useFlickStarted(
    'FlickRight',
    currentAction,
    imageRef,
    isFlicking,
    startX,
    event,
  );
}
/**
 * Move when flicking
 * @param event Touch event
 */
function flickMoving(event: TouchEvent) {
  useFlickMoving(isFlicking, event, translateX, startX);
}

/**
 * End flicking
 */
function flickEnded() {
  useFlickEnded(
    'FlickRight',
    currentAction,
    goalAction,
    isFlicking,
    translateX,
    imageRef,
    emit,
  );
}
</script>
