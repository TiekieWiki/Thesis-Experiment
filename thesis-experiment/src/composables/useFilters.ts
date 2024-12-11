import { computed, type Ref } from 'vue';

/**
 * Filters the tasks based on the component and the current task
 * @param showComponent Component to show
 * @param currentTask Current task
 * @returns Boolean values for one click and two click filters
 */
export function useFilters(
  showComponent: Ref<string>,
  currentTask: Ref<string>,
): { oneClickFilter: Ref<boolean>; twoClickFilter: Ref<boolean> } {
  const oneClickFilter = computed(() => {
    const tasksWithOneClick = [
      'DoubleTapZoomIn',
      'DoubleTapZoomOut',
      'TapMenu',
      'TapType',
    ];
    return (
      showComponent.value == 'task' &&
      tasksWithOneClick.indexOf(currentTask.value) > -1
    );
  });

  const twoClickFilter = computed(() => {
    const tasksWithTwoClicks = [
      'DragList',
      'DragSlider',
      'FlickLeft',
      'FlickRight',
      'LongTapHyperlink',
      'LongTapSelect',
      'MultiTouchRotate',
      'MultiTouchZoom',
    ];
    return (
      showComponent.value == 'task' &&
      tasksWithTwoClicks.indexOf(currentTask.value) > -1
    );
  });
  return { oneClickFilter, twoClickFilter };
}
