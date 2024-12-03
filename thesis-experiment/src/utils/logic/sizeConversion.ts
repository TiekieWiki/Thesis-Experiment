/**
 * Converts a unit of measurement to pixels
 * @param x Unit of measurement
 * @returns Pixels
 */
export function xToPx(x: string): number {
  const div = document.createElement('div');
  div.style.display = 'block';
  div.style.height = x;
  document.body.appendChild(div);
  const px = parseFloat(window.getComputedStyle(div, null).height);
  div.parentNode?.removeChild(div);
  return px;
}
