import type { Action } from '@/utils/types/measurements';
import { onMounted, watch, type Ref, type ShallowRef } from 'vue';

type EventMap = {
  currentAction: Action;
};

type EmitFunction<EventMap> = <K extends keyof EventMap>(
  event: K,
  payload: EventMap[K],
) => void;

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
    currentAction.value = {
      action: action,
      centerX: centerRef.value
        ? centerRef.value.offsetLeft + centerRef.value.offsetWidth / 2
        : 0,
      centerY: centerRef.value
        ? centerRef.value.offsetTop + centerRef.value.offsetHeight / 2
        : 0,
    };
  });
}
