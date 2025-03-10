<template>
  <teleport to="body">
    <div
      class="task-instructions pop-up-background"
      @click="startTask($event, Date.now())"
    >
      <div class="pop-up">
        <h1>Instructions</h1>
        <p>{{ getTaskInstruction(task) }}</p>
        <p>
          Reminder: perform this task using <b>only your {{ hand }} hand</b>
        </p>
        <img
          :src="videoSrc"
          alt="Finger animated icons created by Freepik - Flaticon cannot be
          displayed."
        />
        <!-- <video autoplay loop muted>
          <source :src="videoSrc" type="video/mp4" />
          Finger animated icons created by Freepik - Flaticon cannot be
          displayed.
        </video> -->
        <p>
          Hold the phone in a neutral position and click this pop-up to start
          the task
        </p>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { enterFullScreen } from '@/utils/logic/fullScreen';
import { getTaskInstruction } from '@/utils/logic/selectTask';
import type { Measurement } from '@/utils/types/measurements';
import { computed } from 'vue';

const props = defineProps<{
  hand: string;
  task: string;
}>();

const emit = defineEmits<{
  finishedInstructions: [value: Measurement];
}>();

// Compute animation path
const videoSrc = computed(
  () =>
    `${import.meta.env.BASE_URL}animations/${animation.value}-${props.hand.charAt(0).toUpperCase() + props.hand.slice(1)}.gif`,
);

/**
 * Start the task and register user click
 * @param clickEvent User click event
 * @param clickTime Click timestamp
 */
function startTask(clickEvent: MouseEvent, clickTime: number): void {
  const measurement: Measurement = {
    action: 'startTask',
    touchX: clickEvent.clientX,
    touchY: clickEvent.clientY,
    centerX: 0,
    centerY: 0,
    timestamp: clickTime,
  };
  emit('finishedInstructions', measurement);

  // Enter full screen
  enterFullScreen();
}

/**
 * Get the animation for the task
 */
const animation = computed(() => {
  switch (props.task) {
    case 'DoubleTapZoomIn':
      return 'DoubleTap';
    case 'DoubleTapZoomOut':
      return 'DoubleTap';
    case 'DragList':
      return 'Drag';
    case 'DragSlider':
      return 'FlickRight';
    case 'FlickLeft':
      return 'FlickLeft';
    case 'FlickRight':
      return 'FlickRight';
    case 'LongTapHyperlink':
      return 'LongTap';
    case 'LongTapSelect':
      return 'LongTap';
    case 'MultiTouchRotate':
      return 'MultiTouchRotate';
    case 'MultiTouchZoom':
      return 'MultiTouchZoom';
    case 'TapMenu':
      return 'Tap';
    case 'TapType':
      return 'Tap';
    default:
      return 'Tap';
  }
});
</script>
