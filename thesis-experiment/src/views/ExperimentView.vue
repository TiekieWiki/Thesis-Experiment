<template>
  <main
    class="experiment"
    @click.capture="
      oneClickFilter
        ? measurements.push(userClick($event, Date.now(), currentAction))
        : ''
    "
    @touchstart="
      twoClickFilter
        ? measurements.push(
            userTouchStart($event, Date.now(), currentAction, currentTask),
          )
        : ''
    "
    @touchend="
      twoClickFilter
        ? measurements.push(userTouchEnd($event, Date.now(), currentAction))
        : ''
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
      @current-action="
        (a: Action) => {
          currentAction = a;
        }
      "
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
import TaskSetInstructions from '@/components/experiment/taskInstructions/TaskSetInstructions.vue';
import TaskInstructions from '@/components/experiment/taskInstructions/TaskInstructions.vue';
import UserExperienceTest from '@/components/experiment/UserExperienceTest.vue';
import router from '@/router';
import {
  getComponent,
  selectRandomFiltered,
  selectRandomItem,
} from '@/utils/logic/selectTask';
import { tasks, taskSet } from '@/utils/types/tasks';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import {
  correctDeviceType,
  correctScreenOrientation,
} from '@/utils/logic/checkPhone';
import type {
  Action,
  Measurement,
  TaskMeasurements,
} from '@/utils/types/measurements';
import {
  userClick,
  userTouchStart,
  userTouchEnd,
} from '@/utils/measurements/clickMeasurements';

// Check if device and orientation is correct
const isCorrectDevice = ref<boolean>(correctDeviceType());
const isCorrectOrientation = ref<boolean>(correctScreenOrientation());

onMounted(() => {
  window.addEventListener('resize', () => {
    isCorrectOrientation.value = correctScreenOrientation();
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    isCorrectOrientation.value = correctScreenOrientation();
  });
});

// Set task and task set on component mount
const partialTaskSet = ref<string[]>(taskSet);
const currentTaskSet = ref<string>('');
const partialTasks = ref<string[]>(tasks);
const currentTask = ref<string>('');
const showComponent = ref<string>('taskSetInstructions');

onMounted(() => {
  // Select first task set
  ({
    selectedItem: currentTaskSet.value,
    remainingItems: partialTaskSet.value,
  } = selectRandomItem(partialTaskSet.value));

  // Select first task
  ({ selectedItem: currentTask.value, remainingItems: partialTasks.value } =
    selectRandomItem(partialTasks.value));
});

// Compute current hand
const currentHand = computed((): string => {
  return currentTaskSet.value.includes('Left') ? 'left' : 'right';
});

// Compute current interface orientation
const currentInterfaceOrientation = computed((): string => {
  return currentTaskSet.value.includes('Standard') ? 'standard' : 'mirrored';
});

/**
 * Go to next task
 */
function nextTask() {
  // Save measurements
  saveMeasurements();

  // Check if all tasks are finished
  if (partialTasks.value.length !== 0) {
    // Select next task
    ({ selectedItem: currentTask.value, remainingItems: partialTasks.value } =
      selectRandomItem(partialTasks.value));
    showComponent.value = 'taskInstructions';
  } else {
    // Show user experience questionnaire
    showComponent.value = 'userExperienceTest';
  }
}

/**
 * Go to next task set
 */
function nextTaskSet() {
  // Check if task sets are finished
  if (partialTaskSet.value.length !== 0) {
    // Select next task set
    ({
      selectedItem: currentTaskSet.value,
      remainingItems: partialTaskSet.value,
    } = selectRandomFiltered(
      partialTaskSet.value,
      currentTaskSet.value.includes('Left') ? 'left' : 'right',
    ));
    showComponent.value = 'taskSetInstructions';

    // Reset partial tasks
    partialTasks.value = tasks;

    // Select next task
    ({ selectedItem: currentTask.value, remainingItems: partialTasks.value } =
      selectRandomItem(partialTasks.value));
  } else {
    // Go to end page
    showComponent.value = '';
    router.push('/finishing-up');
  }
}

// Measurements
const measurements = ref<Measurement[]>([]);
const currentAction = ref<Action>({
  action: 'startTask',
  centerX: 0,
  centerY: 0,
});

// Filters
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

/**
 * Finish task instructions and register user click
 * @param measurement Measurement of user click
 */
function finishTaskInstructions(measurement: Measurement) {
  measurements.value.push(measurement);
  showComponent.value = 'task';
}

/**
 * Save measurements
 * @returns Task measurements
 */
function saveMeasurements() {
  const taskMeasurements: TaskMeasurements = {
    task: currentTask.value,
    taskSet: currentTaskSet.value,
    measurements: measurements.value,
  };

  console.log(taskMeasurements);
}
</script>
