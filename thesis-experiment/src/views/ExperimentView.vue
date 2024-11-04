<template>
  <main class="experiment">
    <TaskSetInstructions
      v-if="showComponent == 'taskSetInstructions' && currentTaskSet"
      :hand="currentHand"
      @finished-instructions="() => (showComponent = 'taskInstructions')"
    />
    <TaskInstructions
      v-else-if="showComponent == 'taskInstructions' && currentTaskSet"
      :hand="currentHand"
      :task="currentTask"
      @finished-instructions="() => (showComponent = 'task')"
    />
    <component
      v-else-if="showComponent == 'task' && currentTask"
      :is="getComponent(currentTask)"
      :interface-orientation="currentInterfaceOrientation"
      :hand="currentHand"
      @finished-task="() => nextTask()"
    />
    <UserExperienceTest
      v-else-if="showComponent == 'userExperienceTest'"
      :task-set="currentTaskSet"
      @finished-task-set="() => nextTaskSet()"
    />
  </main>
</template>

<script setup lang="ts">
import TaskSetInstructions from '@/components/experiment/taskInstructions/TaskSetInstructions.vue'
import TaskInstructions from '@/components/experiment/taskInstructions/TaskInstructions.vue'
import UserExperienceTest from '@/components/experiment/UserExperienceTest.vue'
import router from '@/router'
import {
  getComponent,
  selectRandomFiltered,
  selectRandomItem,
} from '@/utils/logic/selectTask'
import { tasks, taskSet } from '@/utils/types/tasks'
import { computed, onMounted, ref } from 'vue'

// Set task and task set on component mount
const partialTaskSet = ref<string[]>(taskSet)
const currentTaskSet = ref<string>('')
const partialTasks = ref<string[]>(tasks)
const currentTask = ref<string>('')
const showComponent = ref<string>('taskSetInstructions')

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

// Compute current hand
const currentHand = computed((): string => {
  return currentTaskSet.value.includes('Left') ? 'left' : 'right'
})

// Compute current interface orientation
const currentInterfaceOrientation = computed((): string => {
  return currentTaskSet.value.includes('Standard') ? 'standard' : 'mirrored'
})

/**
 * Go to next task
 */
function nextTask() {
  // Check if all tasks are finished
  if (partialTasks.value.length !== 0) {
    // Select next task
    ;({ selectedItem: currentTask.value, remainingItems: partialTasks.value } =
      selectRandomItem(partialTasks.value))
    showComponent.value = 'taskInstructions'
  } else {
    // Show user experience questionnaire
    showComponent.value = 'userExperienceTest'
  }
}

/**
 * Go to next task set
 */
function nextTaskSet() {
  // Check if task sets are finished
  if (partialTaskSet.value.length !== 0) {
    // Select next task set
    ;({
      selectedItem: currentTaskSet.value,
      remainingItems: partialTaskSet.value,
    } = selectRandomFiltered(
      partialTaskSet.value,
      currentTaskSet.value.includes('Left') ? 'left' : 'right',
    ))
    showComponent.value = 'taskSetInstructions'

    // Reset partial tasks
    partialTasks.value = tasks

    // Select next task
    ;({ selectedItem: currentTask.value, remainingItems: partialTasks.value } =
      selectRandomItem(partialTasks.value))
  } else {
    // Go to end page
    showComponent.value = ''
    router.push('/finishing-up')
  }
}
</script>
