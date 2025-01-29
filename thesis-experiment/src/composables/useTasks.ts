import type { EmitFunction, EventMap } from '@/utils/types/emits';
import type { Action } from '@/utils/types/measurements';
import { onMounted, watch, type Ref, type ShallowRef } from 'vue';

/**
 * Composable function to set the current action on mounted
 * @param currentAction Reactive reference to the current action
 * @param action Action to set the current action to
 * @param centerRef Center reference to the element to center the action on
 */
export function useOnMountedCurrentAction(
  currentAction: Ref<Action>,
  action: string,
  centerRef: Readonly<ShallowRef<HTMLElement | null>>,
): void {
  onMounted(() => {
    console.log(window.screen.height, window.innerHeight, window.outerHeight);
    currentAction.value = {
      action: action,
      centerX: centerRef.value
        ? window.screen.width -
          window.innerWidth +
          centerRef.value.getBoundingClientRect().left +
          centerRef.value.getBoundingClientRect().width / 2
        : 0,
      centerY: centerRef.value
        ? window.screen.height -
          window.innerHeight +
          centerRef.value.getBoundingClientRect().top +
          centerRef.value.getBoundingClientRect().height / 2
        : 0,
    };
  });
}

/**
 * Composable function to emit the current action to the parent component
 * @param currentAction Reactive reference to the current action
 * @param emit Emit function to send the current action to the parent component
 */
export function useEmitCurrentAction(
  currentAction: Ref<Action>,
  emit: EmitFunction<EventMap>,
): void {
  watch(
    currentAction,
    () => {
      emit('currentAction', currentAction.value);
    },
    { immediate: true, flush: 'sync' },
  );
}
