const skipCutOff = [
  { task: 'DoubleTapZoomIn', cutOff: 10 },
  { task: 'DoubleTapZoomOut', cutOff: 10 },
  { task: 'DragList', cutOff: 10 },
  { task: 'DragSlider', cutOff: 10 },
  { task: 'FlickLeft', cutOff: 10 },
  { task: 'FlickRight', cutOff: 10 },
  { task: 'LongTapHyperlink', cutOff: 10 },
  { task: 'LongTapSelect', cutOff: 10 },
  { task: 'MultiTouchRotate', cutOff: 20 },
  { task: 'MultiTouchZoom', cutOff: 20 },
  { task: 'TapMenu', cutOff: 10 },
  { task: 'TapType', cutOff: 55 },
];

/**
 * Check if task is skippable
 * @param task Task name
 * @param clickCount Number of clicks
 * @returns True if task is skippable
 */
export function taskSkippable(task: string, clickCount: number): boolean {
  const cutOff = skipCutOff.find(taskCutOff => taskCutOff.task === task);
  if (cutOff) {
    return clickCount >= cutOff.cutOff;
  }
  return false;
}
