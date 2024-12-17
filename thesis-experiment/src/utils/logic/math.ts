/**
 * Calculate the angle between two points
 * @param touchX1 The x-coordinate of the first touch
 * @param touchY1 The y-coordinate of the first touch
 * @param touchX2 The x-coordinate of the second touch
 * @param touchY2 The y-coordinate of the second touch
 * @returns The angle between the two points
 */
export function calculateAngle(
  touchX1: number,
  touchY1: number,
  touchX2: number,
  touchY2: number,
) {
  return Math.atan2(touchY2 - touchY1, touchX2 - touchX1) * (180 / Math.PI);
}

/**
 * Distance between two fingers
 * @param event Touch event
 * @returns The distance between two fingers
 */
export function distance(event: TouchEvent): number {
  return Math.hypot(
    event.touches[0].clientX - event.touches[1].clientX,
    event.touches[0].clientY - event.touches[1].clientY,
  );
}
