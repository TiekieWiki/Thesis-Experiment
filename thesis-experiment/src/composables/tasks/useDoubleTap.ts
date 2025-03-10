import { enterFullScreen } from '@/utils/logic/fullScreen';
import { resetTimer, resultTimer } from '@/utils/logic/timers';
import type { EmitFunction, EventMap } from '@/utils/types/emits';
import type { Action } from '@/utils/types/measurements';
import type { Ref } from 'vue';

/**
 * Zoom in and out on double tap
 * @param task Task to perform
 * @param currentAction Current action reference
 * @param firstClicked First clicked reference
 * @param scale Scale reference
 * @param scaleValue Scale value
 * @param emit Emit function
 */
export function useDoubleTap(
  task: string,
  currentAction: Ref<Action>,
  firstClicked: Ref<boolean>,
  scale: Ref<number>,
  scaleValue: number,
  emit: EmitFunction<EventMap>,
): void {
  currentAction.value.action = `start${task}`;

  // Check if this is the first image click
  if (firstClicked.value) {
    scale.value = scaleValue;

    // Emit finished task after seeing the zoomed image
    setTimeout(() => {
      emit('finishedTask', undefined);

      // Enter full screen
      enterFullScreen();
    }, resultTimer);
  } else {
    firstClicked.value = true;
    currentAction.value.action = `end${task}`;
    // Reset first click if double tap is not detected
    setTimeout(() => {
      firstClicked.value = false;
      currentAction.value.action = `start${task}`;
    }, resetTimer);
  }
}
