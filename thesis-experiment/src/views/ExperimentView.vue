<template>
  <main
    class="experiment"
    @click.capture="
      showComponent == 'task' ? userClick($event, Date.now()) : ''
    "
  >
    <TaskSetInstructions
      v-if="showComponent == 'taskSetInstructions' && currentTaskSet"
      :hand="currentHand"
      @finished-instructions="() => (showComponent = 'taskInstructions')"
    />
    <TaskInstructions
      v-else-if="showComponent == 'taskInstructions' && currentTaskSet"
      :hand="currentHand"
      :task="currentTask"
      @finished-instructions="m => finishTaskInstructions(m)"
    />
    <component
      v-else-if="showComponent == 'task' && currentTask"
      :is="getComponent(currentTask)"
      :interface-orientation="currentInterfaceOrientation"
      :hand="currentHand"
      @current-action="(a: Action) => (currentAction = a)"
      @finished-task="() => nextTask()"
    />
    <UserExperienceTest
      v-else-if="showComponent == 'userExperienceTest'"
      :task-set="currentTaskSet"
      @finished-task-set="() => nextTaskSet()"
    />
  </main>
  <teleport v-if="!isCorrectDevice || !isCorrectOrientation" to="body">
    <div class="pop-up-background">
      <div class="pop-up">
        <p v-if="!isCorrectDevice">
          The experiment needs to be conducted on a mobile device. Please reload
          the experiment on another device.
        </p>
        <p v-else-if="!isCorrectOrientation">
          The experiment needs to be conducted in portrait mode. Please rotate
          your device to portrait mode.
        </p>
      </div>
    </div>
  </teleport>
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
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  correctDeviceType,
  correctScreenOrientation,
} from '@/utils/logic/checkPhone'
import type { Action, Measurement } from '@/utils/types/measurements'

// Check if device and orientation is correct
const isCorrectDevice = ref<boolean>(correctDeviceType())
const isCorrectOrientation = ref<boolean>(correctScreenOrientation())

onMounted(() => {
  window.addEventListener('resize', () => {
    isCorrectOrientation.value = correctScreenOrientation()
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    isCorrectOrientation.value = correctScreenOrientation()
  })
})

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

// Measurements
const measurements = ref<Measurement[]>([])
const currentAction = ref<Action>({
  action: 'startTask',
  centerX: 0,
  centerY: 0,
})

/**
 * Finish task instructions and register user click
 * @param measurement Measurement of user click
 */
function finishTaskInstructions(measurement: Measurement) {
  measurements.value.push(measurement)
  showComponent.value = 'task'
}

/**
 * Register user click
 * @param clickEvent User click event
 * @param clickTime Click timestamp
 */
function userClick(clickEvent: MouseEvent, clickTime: number) {
  const measurement: Measurement = {
    action: currentAction.value.action,
    touchX: clickEvent.clientX,
    touchY: clickEvent.clientY,
    centerX: currentAction.value.centerX,
    centerY: currentAction.value.centerY,
    timestamp: clickTime,
  }
  measurements.value.push(measurement)
}

// Print measurements
watch(
  () => measurements.value,
  () => {
    console.log(measurements.value)
  },
  { deep: true },
)
</script>
