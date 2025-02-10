/**
 * Show measurement points on the screen
 * @param x X coordinate
 * @param y Y coordinate
 */
export function showMeasurementPoints(
  x: number,
  y: number,
  center: boolean,
): void {
  const div = document.createElement('div');
  div.className = 'measurement-point';
  div.style.position = 'absolute';
  div.style.left = `${x - 2}px`;
  div.style.top = `${y - 2 - (window.screen.height - window.innerHeight)}px`;
  div.style.width = '4px';
  div.style.height = '4px';
  div.style.backgroundColor = center ? 'red' : 'blue';

  document.body.appendChild(div);
}

/**
 * Clear measurement points from the screen
 */
export function clearMeasurementPoints(): void {
  const points = document.querySelectorAll('.measurement-point');
  points.forEach(point => point.remove());
}
