<template>
  <div :class="['flick-left', interfaceOrientation]">
    <slot></slot>
    <img
      @touchstart="flickStarted"
      @touchmove="flickMoving"
      @touchend="flickEnded"
      ref="imageRef"
      :style="{ transform: `translateX(${translateX}px)` }"
      src="/public/Test.jpg"
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
  action: 'startFlickLeft',
  centerX: 0,
  centerY: 0,
});
const goalAction = ref<Action>({
  action: 'endFlickLeft',
  centerX: 0,
  centerY: 0,
});

// Set initial action and goal
useOnMountedCurrentAction(currentAction, 'startFlickLeft', imageRef);
useOnMountedCurrentAction(goalAction, 'endFlickLeft', imageRef);

// Emit current action
useEmitCurrentAction(currentAction, emit);

/**
 * Start flicking
 * @param event Touch event
 */
function flickStarted(event: TouchEvent): void {
  useFlickStarted(
    'FlickLeft',
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
function flickMoving(event: TouchEvent): void {
  useFlickMoving(isFlicking, event, translateX, startX);
}

/**
 * End flicking
 */
function flickEnded(): void {
  useFlickEnded(
    'FlickLeft',
    currentAction,
    goalAction,
    isFlicking,
    translateX,
    imageRef,
    emit,
  );
}
</script>
