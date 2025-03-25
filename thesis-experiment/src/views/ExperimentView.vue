<template>
  <main
    class="experiment"
    @click.capture="
      oneClickFilter
        ? (measurements.push(userClick($event, Date.now(), currentAction)),
          clickCount++)
        : ''
    "
    @touchstart="
      twoClickFilter
        ? (measurements.push(
            userTouchStart($event, Date.now(), currentAction, currentTask),
          ),
          clickCount++)
        : ''
    "
    @touchend="
      twoClickFilter
        ? (measurements.push(userTouchEnd($event, Date.now(), currentAction)),
          clickCount++)
        : ''
    "
  >
    <Suspense>
      <template #default
        ><TaskSetInstructions
          v-if="showComponent == 'taskSetInstructions' && currentTaskSet"
          :hand="currentHand"
          :remaining-task-sets="partialTaskSet.length"
          @finished-instructions="() => (showComponent = 'taskInstructions')" />
        <TaskInstructions
          v-else-if="showComponent == 'taskInstructions' && currentTaskSet"
          :hand="currentHand"
          :task="currentTask"
          @finished-instructions="m => finishTaskInstructions(m)" />
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
        >
          <div class="task-instruction">
            <p>
              {{ getTaskInstruction(currentTask) }}. Use your
              {{ currentHand }} hand.
            </p>
            <p v-show="taskSkippable(currentTask, clickCount)">
              Is the task too difficult to finish? Skip the task by clicking the
              button below.
            </p>
            <button
              v-show="taskSkippable(currentTask, clickCount)"
              @click="skipTask"
            >
              Skip task
            </button>
          </div>
        </component>
        <UserExperienceTest
          v-else-if="showComponent == 'userExperienceTest'"
          :task-set="currentTaskSet"
          :hand="currentHand"
          @finished-task-set="() => nextTaskSet()"
      /></template>
      <template #fallback>
        <div class="loader">
          <div class="loaderSpinner"></div>
        </div>
      </template>
    </Suspense>
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
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
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
} from '@/utils/logic/clickMeasurements';
import { useFilters } from '@/composables/useFilters';
import type { Checkpoint } from '@/utils/types/checkpoint';
import { getAllCheckpoints, writeCheckpoint } from '@/utils/logic/checkpoints';
import {
  getCurrentPage,
  getExperimentComponent,
} from '@/utils/logic/userProgress';
import { addData } from '@/utils/db';
import { getTaskInstruction } from '@/utils/logic/selectTask';
import { exitFullScreen } from '@/utils/logic/fullScreen';
import { taskSkippable } from '@/utils/logic/skipTask';
// import { clearMeasurementPoints } from '@/utils/logic/tests';

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

// Reset task instructions when orientation was corrected
watch(isCorrectOrientation, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    if (showComponent.value === 'task') {
      showComponent.value = 'taskInstructions';
      measurements.value = [];
    }
  }
});

// Set task and task set on component mount
const partialTaskSet = ref<string[]>(taskSet);
const currentTaskSet = ref<string>('');
const partialTasks = ref<string[]>(tasks);
const currentTask = ref<string>('');
const showComponent = ref<string>('taskSetInstructions');

// Redirect user to the correct page
onMounted(async () => {
  await getCurrentPage().then(async page => {
    if (page !== 'Experiment') {
      router.push({ name: page });
    } else {
      const { curTaskSet, partTaskSets, partTasks, showComp } =
        await getExperimentComponent();
      currentTaskSet.value = curTaskSet;
      partialTaskSet.value = partTaskSets;
      partialTasks.value = partTasks;
      showComponent.value = showComp;

      if (currentTaskSet.value === '') {
        // Select first task set
        ({
          selectedItem: currentTaskSet.value,
          remainingItems: partialTaskSet.value,
        } = selectRandomItem(partialTaskSet.value));

        // Write a checkpoint
        const checkpoint: Checkpoint = {
          id: `taskSet-${currentTaskSet.value}`,
          data: '',
          timestamp: Date.now(),
        };
        await writeCheckpoint(checkpoint);
      }
      // Select first task
      ({ selectedItem: currentTask.value, remainingItems: partialTasks.value } =
        selectRandomItem(partialTasks.value));
    }
  });
});

// Compute current hand
const currentHand = computed((): string => {
  return currentTaskSet.value.includes('Left') ? 'left' : 'right';
});

// Compute current interface orientation
const currentInterfaceOrientation = computed((): string => {
  return currentTaskSet.value.includes('Standard') ? 'standard' : 'mirrored';
});

// Filters
const oneClickFilter = useFilters(showComponent, currentTask).oneClickFilter;
const twoClickFilter = useFilters(showComponent, currentTask).twoClickFilter;

// Click count
const clickCount = ref<number>(0);

/**
 * Go to next task
 */
async function nextTask(): Promise<void> {
  // Save measurements
  await saveMeasurements();

  // Reset click count
  clickCount.value = 0;

  // Write a checkpoint
  const checkpoint: Checkpoint = {
    id: `task-${currentTask.value}`,
    data: '',
    timestamp: Date.now(),
  };
  await writeCheckpoint(checkpoint);

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
 * Skip task
 */
function skipTask(): void {
  // Add skip task measurement
  const measurement: Measurement = {
    action: 'skipTask',
    touchX: 0,
    touchY: 0,
    centerX: 0,
    centerY: 0,
    timestamp: 0,
  };
  measurements.value.push(measurement);

  // Go to next task
  nextTask();
}

/**
 * Go to next task set
 */
async function nextTaskSet(): Promise<void> {
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

    // Write a checkpoint
    const checkpoint: Checkpoint = {
      id: `taskSet-${currentTaskSet.value}`,
      data: '',
      timestamp: Date.now(),
    };
    await writeCheckpoint(checkpoint);

    // Reset partial tasks
    partialTasks.value = tasks;

    // Select next task
    ({ selectedItem: currentTask.value, remainingItems: partialTasks.value } =
      selectRandomItem(partialTasks.value));
  } else {
    // Write a checkpoint
    const checkpoint: Checkpoint = {
      id: 'finishedExperiment',
      data: '',
      timestamp: Date.now(),
    };
    await writeCheckpoint(checkpoint);

    // Exit full screen
    exitFullScreen();

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

/**
 * Finish task instructions and register user click
 * @param measurement Measurement of user click
 */
function finishTaskInstructions(measurement: Measurement): void {
  measurements.value.push(measurement);
  showComponent.value = 'task';
  // clearMeasurementPoints();
}

/**
 * Save measurements
 * @returns Task measurements
 */
async function saveMeasurements(): Promise<void> {
  const taskMeasurements: TaskMeasurements = {
    userId: (await getAllCheckpoints()).sort(
      (a, b) => a.timestamp - b.timestamp,
    )[0].data,
    taskSet: currentTaskSet.value,
    task: currentTask.value,
    measurements: measurements.value,
  };

  addData('measurements', taskMeasurements);

  measurements.value = [];
}
</script>
