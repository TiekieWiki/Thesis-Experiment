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
 * Get the component that matches the component title
 * @param title Title of the component to get
 * @returns The component that matches the title
 */
export function getComponent(title: string): Component {
  return defineAsyncComponent(
    () => import(`@/components/experiment/tasks/${title}.vue`),
  )
}
