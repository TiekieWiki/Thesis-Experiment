<template>
  <main class="experiment">
    <component
      :is="getComponent(currentTask)"
      :interface-orientation="
        currentTaskSet.includes('Standard') ? 'standard' : 'mirrored'
      "
      :hand="currentTaskSet.includes('Left') ? 'left' : 'right'"
    />
  </main>
</template>

<script setup lang="ts">
import { getComponent, selectRandomItem } from '@/utils/logic/selectRandom'
import { tasks, taskSet } from '@/utils/types/tasks'
import { onMounted, ref } from 'vue'

// Set task and task set on component mount
const partialTaskSet = ref<string[]>(taskSet)
const currentTaskSet = ref<string>('')
const partialTasks = ref<string[]>(tasks)
const currentTask = ref<string>('')

onMounted(() => {
  // Select first task set
  ;({
    selectedItem: currentTaskSet.value,
    remainingItems: partialTaskSet.value,
  } = selectRandomItem(partialTaskSet.value))

  // Select first task
  ;({ selectedItem: currentTask.value, remainingItems: partialTasks.value } =
    selectRandomItem(partialTasks.value))
})
</script>
