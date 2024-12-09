<template>
  <div :class="['double-tap-zoom-in', interfaceOrientation]">
    <img
      @click="imageClicked"
      ref="imageRef"
      :style="{ transform: `scale(${scale})` }"
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
import { resetTimer, resultTimer } from '@/utils/logic/timers';
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
const firstClicked = ref<boolean>(false);
const currentAction = ref<Action>({
  action: 'startDoubleTapZoomIn',
  centerX: 0,
  centerY: 0,
});

// Set initial action
useOnMountedCurrentAction(currentAction, 'startDoubleTapZoomIn', imageRef);

// Emit current action
useEmitCurrentAction(currentAction, emit);

/**
 * Determine the action when the image is clicked
 */
function imageClicked() {
  currentAction.value.action = 'startDoubleTapZoomIn';

  // Check if this is the first image click
  if (firstClicked.value) {
    scale.value = 2;

    // Emit finished task after seeing the zoomed image
    setTimeout(() => {
      emit('finishedTask');
    }, resultTimer);
  } else {
    firstClicked.value = true;
    currentAction.value.action = 'endDoubleTapZoomIn';
    // Reset first click if double tap is not detected
    setTimeout(() => {
      firstClicked.value = false;
      currentAction.value.action = 'startDoubleTapZoomIn';
    }, resetTimer);
  }
}
</script>
