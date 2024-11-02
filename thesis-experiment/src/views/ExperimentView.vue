<template>
  <main class="experiment">
    <component
      v-if="!showUXTest"
      :is="getComponent(currentTask)"
      :interface-orientation="
        currentTaskSet.includes('Standard') ? 'standard' : 'mirrored'
      "
      :hand="currentTaskSet.includes('Left') ? 'left' : 'right'"
      @finished-task="(f: string) => nextTask(f)"
    />
    <UserExperienceTest
      v-else
      :task-set="currentTaskSet"
      @finished-task-set="(f: string) => nextTaskSet(f)"
    />
  </main>
</template>

<script setup lang="ts">
import UserExperienceTest from '@/components/experiment/UserExperienceTest.vue'
import router from '@/router'
import {
  getComponent,
  selectRandomFiltered,
  selectRandomItem,
} from '@/utils/logic/selectRandom'
import { tasks, taskSet } from '@/utils/types/tasks'
import { onMounted, ref } from 'vue'

// Set task and task set on component mount
const partialTaskSet = ref<string[]>(taskSet)
const currentTaskSet = ref<string>('')
const partialTasks = ref<string[]>(tasks)
const currentTask = ref<string>('')
const showUXTest = ref<boolean>(false)

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

/**
 * Go to next task
 * @param finishedTask String of finished task
 */
function nextTask(finishedTask: string) {
  // Remove finished task from tasks
  partialTasks.value = partialTasks.value.filter(task => task !== finishedTask)

  // Check if all tasks are finished
  if (partialTasks.value.length !== 0) {
    // Select next task
    ;({ selectedItem: currentTask.value, remainingItems: partialTasks.value } =
      selectRandomItem(partialTasks.value))
  } else {
    // Show user experience questionnaire
    showUXTest.value = true
  }
}

/**
 * Go to next task set
 * @param finishedTaskSet String of finished task set
 */
function nextTaskSet(finishedTaskSet: string) {
  // Remove finished task set from task sets
  partialTaskSet.value = partialTaskSet.value.filter(
    taskSet => taskSet !== finishedTaskSet,
  )

  // Check if task sets are finished
  if (partialTaskSet.value.length !== 0) {
    // Select next task set (left and right following each other)
    ;({
      selectedItem: currentTaskSet.value,
      remainingItems: partialTaskSet.value,
    } = selectRandomFiltered(
      partialTaskSet.value,
      currentTaskSet.value.includes('Left') ? 'left' : 'right',
    ))

    // Reset partial tasks
    partialTasks.value = tasks

    // Select next task
    ;({ selectedItem: currentTask.value, remainingItems: partialTasks.value } =
      selectRandomItem(partialTasks.value))
  } else {
    // Go to end page
    router.push('/finishing-up')
  }
}
</script>
