import type { Action, Measurement } from '../types/measurements';
// import { showMeasurementPoints } from './tests';

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
    touchX: window.screen.width - window.innerWidth + clickEvent.clientX,
    touchY: window.screen.height - window.innerHeight + clickEvent.clientY,
    centerX: currentAction.centerX,
    centerY: currentAction.centerY,
    timestamp: clickTime,
  };

  // showMeasurementPoints(measurement.touchX, measurement.touchY, false);
  // showMeasurementPoints(measurement.centerX, measurement.centerY, true);

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
    touchX:
      window.screen.width - window.innerWidth + touchEvent.touches[0].clientX,
    touchY:
      window.screen.height - window.innerHeight + touchEvent.touches[0].clientY,
    centerX: currentAction.centerX,
    centerY: currentAction.centerY,
    timestamp: touchTime,
  };

  if (
    (currentTask === 'MultiTouchZoom' || currentTask === 'MultiTouchRotate') &&
    touchEvent.touches.length > 1
  ) {
    measurement.touchX =
      window.screen.width - window.innerWidth + touchEvent.touches[1].clientX;
    measurement.touchY =
      window.screen.height - window.innerHeight + touchEvent.touches[1].clientY;
  }

  // showMeasurementPoints(measurement.touchX, measurement.touchY, false);
  // showMeasurementPoints(measurement.centerX, measurement.centerY, true);

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
    touchX:
      window.screen.width -
      window.innerWidth +
      touchEvent.changedTouches[0].clientX,
    touchY:
      window.screen.height -
      window.innerHeight +
      touchEvent.changedTouches[0].clientY,
    centerX: currentAction.centerX,
    centerY: currentAction.centerY,
    timestamp: touchTime,
  };

  // showMeasurementPoints(measurement.touchX, measurement.touchY, false);
  // showMeasurementPoints(measurement.centerX, measurement.centerY, true);

  return measurement;
}
