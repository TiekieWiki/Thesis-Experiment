<template>
  <div :class="['double-tap-zoom-out', interfaceOrientation]">
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
import { resetTimer, resultTimer } from '@/utils/logic/timers';
import type { Action } from '@/utils/types/measurements';
import { onMounted, ref, useTemplateRef, watch } from 'vue';

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
const scale = ref<number>(2);
const firstClicked = ref<boolean>(false);
const currentAction = ref<Action>({
  action: 'startDoubleTapZoomOut',
  centerX: 0,
  centerY: 0,
});

// Set initial action
onMounted(() => {
  currentAction.value = {
    action: 'startDoubleTapZoomOut',
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
 * Determine the action when the image is clicked
 */
function imageClicked() {
  currentAction.value.action = 'startDoubleTapZoomOut';

  // Check if this is the first image click
  if (firstClicked.value) {
    scale.value = 1;

    // Emit finished task after seeing the zoomed image
    setTimeout(() => {
      emit('finishedTask');
    }, resultTimer);
  } else {
    firstClicked.value = true;
    currentAction.value.action = 'endDoubleTapZoomOut';
    // Reset first click if double tap is not detected
    setTimeout(() => {
      firstClicked.value = false;
      currentAction.value.action = 'startDoubleTapZoomOut';
    }, resetTimer);
  }
}
</script>
