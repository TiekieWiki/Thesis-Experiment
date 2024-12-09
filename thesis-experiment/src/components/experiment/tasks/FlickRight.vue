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
  useEmitCurrentAction,
  useOnMountedCurrentAction,
} from '@/composables/useTasks';
import { emitTimer } from '@/utils/logic/timers';
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
 * Set current action and start position when flicking starts
 * @param event Touch event
 */
function flickStarted(event: TouchEvent) {
  currentAction.value = {
    action: 'startFlickRight',
    centerX: imageRef.value
      ? imageRef.value.offsetLeft + imageRef.value.offsetWidth / 2
      : 0,
    centerY: imageRef.value
      ? imageRef.value.offsetTop + imageRef.value.offsetHeight / 2
      : 0,
  };

  isFlicking.value = true;
  startX.value = event.touches ? event.touches[0].clientX : 0;
}

/**
 * Move image when flicking
 * @param event Touch event
 */
function flickMoving(event: TouchEvent) {
  if (!isFlicking.value) return;

  const currentX = event.touches ? event.touches[0].clientX : 0;
  translateX.value = currentX - startX.value;
}

/**
 * Set current action and end position when flicking ends
 */
function flickEnded() {
  currentAction.value = goalAction.value;
  isFlicking.value = false;

  // Wait for current action to be emitted
  setTimeout(() => {
    // Check if the image has been swiped enough to the right
    if (translateX.value > imageRef.value!.offsetWidth / 2) {
      emit('finishedTask');
    } else {
      translateX.value = 0;
    }
  }, emitTimer);
}
</script>
