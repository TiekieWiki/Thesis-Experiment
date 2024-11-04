import { defineAsyncComponent, type Component } from 'vue'

/**
 * Selects a random item from the list of items
 * @param items String array of items
 * @returns Object with the selected item and the remaining items
 */
export function selectRandomItem(items: string[]): {
  selectedItem: string
  remainingItems: string[]
} {
  const randomIndex = Math.floor(Math.random() * items.length)
  const reducedTaskSets = items.filter((_, index) => index !== randomIndex)
  return { selectedItem: items[randomIndex], remainingItems: reducedTaskSets }
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
  selectedItem: string
  remainingItems: string[]
} {
  const filteredItems = items.filter(item => !item.includes(filter))
  const { selectedItem } = selectRandomItem(filteredItems)
  const remainingItems = items.filter(item => item !== selectedItem)
  return { selectedItem, remainingItems }
}

/**
 * Get the component that matches the component title
 * @param title Title of the component to get
 * @returns The component that matches the title
 */
export function getComponent(title: string): Component {
  return defineAsyncComponent(
    () => import(`@/components/experiment/tasks/${title}.vue`),
  )
}
