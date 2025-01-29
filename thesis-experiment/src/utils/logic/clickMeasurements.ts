import type { Action, Measurement } from '../types/measurements';

/**
 * Register user click
 * @param clickEvent User click event
 * @param clickTime Click timestamp
 * @param currentAction Current action
 * @returns Measurement
 */
export function userClick(
  clickEvent: MouseEvent,
  clickTime: number,
  currentAction: Action,
): Measurement {
  const measurement: Measurement = {
    action: currentAction.action,
    touchX: clickEvent.screenX,
    touchY: clickEvent.screenY,
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
 * @param currentAction Current action
 * @param currentTask Current task
 * @returns Measurement
 */
export function userTouchStart(
  touchEvent: TouchEvent,
  touchTime: number,
  currentAction: Action,
  currentTask: string,
): Measurement {
  const measurement: Measurement = {
    action: currentAction.action,
    touchX: touchEvent.touches[0].screenX,
    touchY: touchEvent.touches[0].screenY,
    centerX: currentAction.centerX,
    centerY: currentAction.centerY,
    timestamp: touchTime,
  };

  console.log('userTouchStart');

  if (
    (currentTask === 'MultiTouchZoom' || currentTask === 'MultiTouchRotate') &&
    touchEvent.touches.length > 1
  ) {
    measurement.touchX = window.screenX + touchEvent.touches[1].screenX;
    measurement.touchY = window.screenY + touchEvent.touches[1].screenY;
  }
  return measurement;
}

/**
 * Register user touch end
 * @param touchEvent User touch event
 * @param touchTime Touch timestamp
 * @param currentAction Current action
 * @returns Measurement
 */
export function userTouchEnd(
  touchEvent: TouchEvent,
  touchTime: number,
  currentAction: Action,
): Measurement {
  const measurement: Measurement = {
    action: currentAction.action,
    touchX: touchEvent.changedTouches[0].screenX,
    touchY: touchEvent.changedTouches[0].screenY,
    centerX: currentAction.centerX,
    centerY: currentAction.centerY,
    timestamp: touchTime,
  };

  return measurement;
}
