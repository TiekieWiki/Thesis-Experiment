import { emitTimer } from '@/utils/logic/timers';
import type { EmitFunction, EventMap } from '@/utils/types/emits';
import type { Action } from '@/utils/types/measurements';
import type { Ref } from 'vue';

/**
 * Set current action and start position when flicking starts
 * @param task Task to perform
 * @param currentAction Current action reference
 * @param imageRef Image reference
 * @param isFlicking Is flicking reference
 * @param startX Start X reference
 * @param event Event to get the touch client X
 */
export function useFlickStarted(
  task: string,
  currentAction: Ref<Action>,
  imageRef: Ref<HTMLElement | null>,
  isFlicking: Ref<boolean>,
  startX: Ref<number>,
  event: TouchEvent,
): void {
  currentAction.value = {
    action: `start${task}`,
    centerX: imageRef.value
      ? window.screen.width -
        window.innerWidth +
        imageRef.value.getBoundingClientRect().left +
        imageRef.value.getBoundingClientRect().width / 2
      : 0,
    centerY: imageRef.value
      ? window.screen.height -
        window.innerHeight +
        imageRef.value.getBoundingClientRect().top +
        imageRef.value.getBoundingClientRect().height / 2
      : 0,
  };

  isFlicking.value = true;
  startX.value = event.touches ? event.touches[0].clientX : 0;
}

/**
 * Move image when flicking
 * @param event Touch event
 */
export function useFlickMoving(
  isFlicking: Ref<boolean>,
  event: TouchEvent,
  translateX: Ref<number>,
  startX: Ref<number>,
): void {
  if (!isFlicking.value) return;

  const currentX = event.touches ? event.touches[0].clientX : 0;
  translateX.value = currentX - startX.value;
}

/**
 * Set current action and end position when flicking ends
 * @param currentAction Current action reference
 * @param goalAction Goal action reference
 * @param isFlicking Is flicking reference
 * @param translateX Translate X reference
 * @param imageRef Image reference
 * @param emit Emit function
 */
export function useFlickEnded(
  task: string,
  currentAction: Ref<Action>,
  goalAction: Ref<Action>,
  isFlicking: Ref<boolean>,
  translateX: Ref<number>,
  imageRef: Ref<HTMLElement | null>,
  emit: EmitFunction<EventMap>,
): void {
  currentAction.value = goalAction.value;
  isFlicking.value = false;

  // Wait for current action to be emitted
  setTimeout(() => {
    // Check if the image has been swiped enough to the left or right
    if (
      (task == 'FlickLeft' &&
        translateX.value < -imageRef.value!.offsetWidth / 2) ||
      (task == 'FlickRight' &&
        translateX.value > imageRef.value!.offsetWidth / 2)
    ) {
      emit('finishedTask', undefined);
    } else {
      translateX.value = 0;
    }
  }, emitTimer);
}
