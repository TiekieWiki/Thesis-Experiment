import { defineAsyncComponent, type Component } from 'vue';

/**
 * Selects a random item from the list of items
 * @param items String array of items
 * @returns Object with the selected item and the remaining items
 */
export function selectRandomItem(items: string[]): {
  selectedItem: string;
  remainingItems: string[];
} {
  const randomIndex = Math.floor(Math.random() * items.length);
  const reducedTaskSets = items.filter((_, index) => index !== randomIndex);
  return { selectedItem: items[randomIndex], remainingItems: reducedTaskSets };
}

/**
 * Selects a random item from the list of items that does not contain the filter
 * @param items String array of items
 * @param filter String to filter out
 * @returns Object with the selected item and the remaining items
 */
export function selectRandomFiltered(
  items: string[],
  filter: string,
): {
  selectedItem: string;
  remainingItems: string[];
} {
  const filteredItems = items.filter(
    item => !item.includes(filter.charAt(0).toUpperCase() + filter.slice(1)),
  );
  const { selectedItem } = selectRandomItem(filteredItems);
  const remainingItems = items.filter(item => item !== selectedItem);
  return { selectedItem, remainingItems };
}

/**
 * Get the component that matches the component title
 * @param title Title of the component to get
 * @returns The component that matches the title
 */
export function getComponent(title: string): Component {
  return defineAsyncComponent(
    () => import(`@/components/experiment/tasks/${title}.vue`),
  );
}

/**
 * Get the task instruction based on the task
 * @param task Task to get the instruction for
 * @returns Instruction for the task
 */
export function getTaskInstruction(task: string): string {
  switch (task) {
    case 'DoubleTapZoomIn':
      return 'Double tap the picture to zoom in';
    case 'DoubleTapZoomOut':
      return 'Double tap the picture to zoom out';
    case 'DragList':
      return 'Drag the first list item (A) to the bottom of the list';
    case 'DragSlider':
      return 'Drag the slider to the right to answer the phone call';
    case 'FlickLeft':
      return 'Swipe the picture to the left';
    case 'FlickRight':
      return 'Swipe the picture to the right';
    case 'LongTapHyperlink':
      return 'Hold down on the hyperlink to open a pop-up';
    case 'LongTapSelect':
      return 'Hold down on the text and move the cursors to select it';
    case 'MultiTouchRotate':
      return 'Rotate the picture in any direction with two fingers';
    case 'MultiTouchZoom':
      return 'Zoom in on the picture with two fingers';
    case 'TapMenu':
      return 'Click the menu button with one tap and select the about page with one tap';
    case 'TapType':
      return 'Type the sentence shown on the screen, including punctuation and capitalization';
    default:
      return '';
  }
}
