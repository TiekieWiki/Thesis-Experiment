<template>
  <form class="laterality-test">
    <progress value="0.15" max="1">15 %</progress>
    <h1>Laterality test</h1>
    <p>
      In this test, you will be asked to indicate which hand you use for
      different activities. Please answer the questions as accurately as
      possible. If you do not have a preference, please select "No preference".
      If you select "Left hand" or "Right hand" and never use the other hand,
      please indicate this as well.
    </p>
    <div
      v-for="question in lateralityQuestions"
      :key="question.name"
      class="question"
    >
      <p>{{ question.question }}</p>
      <div class="label-group">
        <label
          ><input
            v-model="question.handedness"
            value="left"
            type="radio"
            :name="question.name"
          />Left hand</label
        >
        <label
          ><input
            v-model="question.handedness"
            value="noPref"
            type="radio"
            :name="question.name"
          />No preference</label
        >
        <label
          ><input
            v-model="question.handedness"
            value="right"
            type="radio"
            :name="question.name"
          />Right hand</label
        >
      </div>
      <div class="label-group">
        <label
          v-if="question.handedness !== '' && question.handedness !== 'noPref'"
          ><input v-model="question.useOtherHand" type="checkbox" />I never use
          the other hand</label
        >
      </div>
    </div>
    <button :disabled="!requiredFieldsFilled" @click.prevent="save">
      Continue
    </button>
  </form>
</template>

<script setup lang="ts">
import { addData } from '@/utils/db';
import { getAllCheckpoints, writeCheckpoint } from '@/utils/logic/checkpoints';
import { enterFullScreen } from '@/utils/logic/fullScreen';
import type { Checkpoint } from '@/utils/types/checkpoint';
import type { Laterality, LateralityQuestion } from '@/utils/types/laterality';
import { ref, watch } from 'vue';

const emit = defineEmits<{
  finishedTest: [];
}>();

// Laterality test questions
const lateralityQuestions = ref<LateralityQuestion[]>([
  {
    name: 'write',
    question: 'Which hand do you use to write?',
    handedness: '',
    useOtherHand: null,
  },
  {
    name: 'draw',
    question: 'Which hand do you use to draw?',
    handedness: '',
    useOtherHand: null,
  },
  {
    name: 'throw',
    question: 'Which hand do you use to throw?',
    handedness: '',
    useOtherHand: null,
  },
  {
    name: 'scissors',
    question: 'Which hand do you use when using scissors?',
    handedness: '',
    useOtherHand: null,
  },
  {
    name: 'toothbrush',
    question: 'Which hand do you use when using a toothbrush?',
    handedness: '',
    useOtherHand: null,
  },
  {
    name: 'knife',
    question: 'Which hand do you use when using a knife (without a fork)?',
    handedness: '',
    useOtherHand: null,
  },
  {
    name: 'spoon',
    question: 'Which hand do you use when using a spoon?',
    handedness: '',
    useOtherHand: null,
  },
  {
    name: 'broom',
    question: 'Which hand do you use when using a broom (upper hand)?',
    handedness: '',
    useOtherHand: null,
  },
  {
    name: 'match',
    question: 'Which hand do you use to strike a match?',
    handedness: '',
    useOtherHand: null,
  },
  {
    name: 'box',
    question: 'Which hand do you use to open a box (holding the lid)?',
    handedness: '',
    useOtherHand: null,
  },
]);

// Check if the user has filled in the required fields
const requiredFieldsFilled = ref<boolean>(false);

// Enable the continue button when the user has filled in the required fields
watch(lateralityQuestions.value, () => {
  if (lateralityQuestions.value.every(question => question.handedness)) {
    requiredFieldsFilled.value = true;
  }
});

/**
 * Save the laterality test information and continue to the next step
 */
async function save(): Promise<void> {
  // Save the laterality test
  const laterality: Laterality = {
    userId: (await getAllCheckpoints()).sort(
      (a, b) => a.timestamp - b.timestamp,
    )[0].data,
    writing: lateralityQuestions.value.find(
      question => question.name === 'write',
    )!.handedness,
    writingOtherHand: lateralityQuestions.value.find(
      question => question.name === 'write',
    )!.useOtherHand,
    drawing: lateralityQuestions.value.find(
      question => question.name === 'draw',
    )!.handedness,
    drawingOtherHand: lateralityQuestions.value.find(
      question => question.name === 'draw',
    )!.useOtherHand,
    throwing: lateralityQuestions.value.find(
      question => question.name === 'throw',
    )!.handedness,
    throwingOtherHand: lateralityQuestions.value.find(
      question => question.name === 'throw',
    )!.useOtherHand,
    scissors: lateralityQuestions.value.find(
      question => question.name === 'scissors',
    )!.handedness,
    scissorsOtherHand: lateralityQuestions.value.find(
      question => question.name === 'scissors',
    )!.useOtherHand,
    toothbrush: lateralityQuestions.value.find(
      question => question.name === 'toothbrush',
    )!.handedness,
    toothbrushOtherHand: lateralityQuestions.value.find(
      question => question.name === 'toothbrush',
    )!.useOtherHand,
    knife: lateralityQuestions.value.find(
      question => question.name === 'knife',
    )!.handedness,
    knifeOtherHand: lateralityQuestions.value.find(
      question => question.name === 'knife',
    )!.useOtherHand,
    spoon: lateralityQuestions.value.find(
      question => question.name === 'spoon',
    )!.handedness,
    spoonOtherHand: lateralityQuestions.value.find(
      question => question.name === 'spoon',
    )!.useOtherHand,
    broom: lateralityQuestions.value.find(
      question => question.name === 'broom',
    )!.handedness,
    broomOtherHand: lateralityQuestions.value.find(
      question => question.name === 'broom',
    )!.useOtherHand,
    match: lateralityQuestions.value.find(
      question => question.name === 'match',
    )!.handedness,
    matchOtherHand: lateralityQuestions.value.find(
      question => question.name === 'match',
    )!.useOtherHand,
    box: lateralityQuestions.value.find(question => question.name === 'box')!
      .handedness,
    boxOtherHand: lateralityQuestions.value.find(
      question => question.name === 'box',
    )!.useOtherHand,
  };

  // addData('laterality', laterality);

  // Write a checkpoint
  const checkpoint: Checkpoint = {
    id: 'lateralityTest',
    data: '',
    timestamp: Date.now(),
  };
  await writeCheckpoint(checkpoint);

  // Go to the next step
  emit('finishedTest');

  // Enter full screen
  enterFullScreen();
}
</script>
