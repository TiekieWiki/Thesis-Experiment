<template>
  <main :class="finishingUp ? 'end' : 'experiment'">
    <Suspense>
      <template #default
        ><TaskSetInstructions
          v-if="showComponent == 'taskSetInstructions' && currentTaskSet"
          :hand="currentHand"
          :remaining-task-sets="partialTaskSet.length"
          @finished-instructions="() => (showComponent = 'taskInstructions')"
        />
        <TaskInstructions
          v-else-if="showComponent == 'taskInstructions' && currentTaskSet"
          :hand="currentHand"
          task="FlickLeft"
          @finished-instructions="showComponent = 'task'"
        />
        <component
          v-else-if="showComponent == 'task'"
          :is="getComponent('FlickLeft')"
          :interface-orientation="currentInterfaceOrientation"
          @finished-task="() => nextTaskSet()"
        >
          <div class="task-instruction">
            <p>
              {{ getTaskInstruction('FlickLeft') }}. Use your
              {{ currentHand }} hand.
            </p>
          </div>
        </component>
        <template v-else-if="showComponent == 'finishingUp'">
          <h1>Thank you for participating!</h1>
          <p>
            You have completed the experiment and your answers have been saved.
            Thank you for your time.
          </p>
        </template>
      </template>
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
import {
  getComponent,
  selectRandomFiltered,
  selectRandomItem,
} from '@/utils/logic/selectTask';
import { taskSet } from '@/utils/types/tasks';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import {
  correctDeviceType,
  correctScreenOrientation,
} from '@/utils/logic/checkPhone';
import { getTaskInstruction } from '@/utils/logic/selectTask';
import { exitFullScreen } from '@/utils/logic/fullScreen';

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
    }
  }
});

// Set task and task set on component mount
const partialTaskSet = ref<string[]>(taskSet);
const currentTaskSet = ref<string>('');
const showComponent = ref<string>('taskSetInstructions');
const finishingUp = ref<boolean>(false);

// Select first task set
onMounted(async () => {
  if (currentTaskSet.value === '') {
    // Select first task set
    ({
      selectedItem: currentTaskSet.value,
      remainingItems: partialTaskSet.value,
    } = selectRandomItem(partialTaskSet.value));
  }
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
  } else {
    // Exit full screen
    exitFullScreen();

    // Go to end page
    showComponent.value = 'finishingUp';
    finishingUp.value = true;
  }
}
</script>
