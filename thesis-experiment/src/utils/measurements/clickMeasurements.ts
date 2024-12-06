import type { Action, Measurement } from '../types/measurements';

/**
 * Register user click
 * @param clickEvent User click event
 * @param clickTime Click timestamp
 */
export function userClick(
  clickEvent: MouseEvent,
  clickTime: number,
  currentAction: Action,
): Measurement {
  const measurement: Measurement = {
    action: currentAction.action,
    touchX: clickEvent.clientX,
    touchY: clickEvent.clientY,
    centerX: currentAction.centerX,
    centerY: currentAction.centerY,
    timestamp: clickTime,
  };
  return measurement;
}

/**
 * Register user touch start
 * @param touchEvent User touch event
 * @param touchTime Touch timestamp
 */
export function userTouchStart(
  touchEvent: TouchEvent,
  touchTime: number,
  currentAction: Action,
  currentTask: string,
): Measurement {
  const measurement: Measurement = {
    action: currentAction.action,
    touchX: touchEvent.touches[0].clientX,
    touchY: touchEvent.touches[0].clientY,
    centerX: currentAction.centerX,
    centerY: currentAction.centerY,
    timestamp: touchTime,
  };

  if (currentTask === 'MultiTouchZoom' && touchEvent.touches.length > 1) {
    measurement.touchX = touchEvent.touches[1].clientX;
    measurement.touchY = touchEvent.touches[1].clientY;
  }
  return measurement;
}

/**
 * Register user touch end
 * @param touchEvent User touch event
 * @param touchTime Touch timestamp
 */
export function userTouchEnd(
  touchEvent: TouchEvent,
  touchTime: number,
  currentAction: Action,
): Measurement {
  const measurement: Measurement = {
    action: currentAction.action,
    touchX: touchEvent.changedTouches[0].clientX,
    touchY: touchEvent.changedTouches[0].clientY,
    centerX: currentAction.centerX,
    centerY: currentAction.centerY,
    timestamp: touchTime,
  };

  return measurement;
}
