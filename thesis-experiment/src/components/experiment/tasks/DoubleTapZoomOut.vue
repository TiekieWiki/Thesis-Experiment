<template>
  <div :class="['double-tap-zoom-out', interfaceOrientation]">
    <slot></slot>
    <img
      @click="imageClicked"
      ref="imageRef"
      :style="{ transform: `scale(${scale})` }"
      src="/public/Test.jpg"
      alt="Photo by Greg Becker on Unsplash"
    />
  </div>
</template>

<script setup lang="ts">
import { useDoubleTap } from '@/composables/tasks/useDoubleTap';
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
const scale = ref<number>(2);
const firstClicked = ref<boolean>(false);
const currentAction = ref<Action>({
  action: 'startDoubleTapZoomOut',
  centerX: 0,
  centerY: 0,
});

// Set initial action
useOnMountedCurrentAction(currentAction, 'startDoubleTapZoomOut', imageRef);

// Emit current action
useEmitCurrentAction(currentAction, emit);

/**
 * Determine the action when the image is clicked
 */
function imageClicked(): void {
  useDoubleTap('DoubleTapZoomOut', currentAction, firstClicked, scale, 1, emit);
}
</script>
