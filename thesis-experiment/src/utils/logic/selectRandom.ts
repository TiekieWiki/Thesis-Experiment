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
