<template>
  <form class="laterality-test">
    <h1>Laterality test</h1>
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
          ><input v-model="question.useOtherHand" type="checkbox" />I never use
          the other hand</label
        >
      </div>
    </div>

    <p class="error">Test</p>
    <button @click.prevent="save">Continue</button>
  </form>
</template>

<script setup lang="ts">
import type { LateralityQuestion } from '@/utils/types/laterality'
import { ref } from 'vue'

const emit = defineEmits(['finishedTest'])
function save() {
  emit('finishedTest')
}

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
    name: 'lid',
    question: 'Which hand do you use to open a box (holding the lid)?',
    handedness: '',
    useOtherHand: null,
  },
])
</script>
