<template>
  <form class="user-experience-test">
    <h1>User experience test</h1>
    <p>
      Answer the questions below about the last twelve tasks performed with your
      <b>{{ hand }} hand.</b>
    </p>
    <div
      v-for="question in userExperienceQuestions"
      :key="question.name"
      class="question"
    >
      <p>{{ question.question }}</p>
      <div class="label-group">
        <label
          ><input
            v-model.number="question.answer"
            value="1"
            type="radio"
            :name="question.name"
          />Strongly disagree</label
        >
        <label
          ><input
            v-model.number="question.answer"
            value="2"
            type="radio"
            :name="question.name"
          />Disagree</label
        >
        <label
          ><input
            v-model.number="question.answer"
            value="3"
            type="radio"
            :name="question.name"
          />Somewhat disagree</label
        >
        <label
          ><input
            v-model.number="question.answer"
            value="4"
            type="radio"
            :name="question.name"
          />Neutral</label
        >
        <label
          ><input
            v-model.number="question.answer"
            value="5"
            type="radio"
            :name="question.name"
          />Somewhat agree</label
        >
        <label
          ><input
            v-model.number="question.answer"
            value="6"
            type="radio"
            :name="question.name"
          />Agree</label
        >
        <label
          ><input
            v-model.number="question.answer"
            value="7"
            type="radio"
            :name="question.name"
          />Strongly agree</label
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
import type { Checkpoint } from '@/utils/types/checkpoint';
import type {
  UserExperience,
  UserExperienceQuestion,
} from '@/utils/types/userExperience';
import { ref, watch } from 'vue';

const props = defineProps<{
  taskSet: string;
  hand: string;
}>();

const emit = defineEmits<{
  finishedTaskSet: [];
}>();

// User experience questions
const userExperienceQuestions = ref<UserExperienceQuestion[]>([
  {
    name: 'meetingRequirements',
    question: "This system's capabilities meet my requirements",
    answer: null,
  },
  {
    name: 'easyToUse',
    question: 'This system is easy to use',
    answer: null,
  },
]);

// Check if the user has filled in the required fields
const requiredFieldsFilled = ref<boolean>(false);

// Enable the continue button when the user has filled in the required fields
watch(userExperienceQuestions.value, () => {
  if (userExperienceQuestions.value.every(question => question.answer)) {
    requiredFieldsFilled.value = true;
  }
});

/**
 * Save the laterality test information and continue to the next step
 */
async function save() {
  // Save the user experience test data
  const uxTest: UserExperience = {
    userId: (await getAllCheckpoints()).sort(
      (a, b) => a.timestamp - b.timestamp,
    )[0].data,
    taskSet: props.taskSet,
    meetRequirements: userExperienceQuestions.value[0].answer!,
    easeOfUse: userExperienceQuestions.value[1].answer!,
  };

  addData('userExperience', uxTest);

  // Write a checkpoint
  const checkpoint: Checkpoint = {
    id: `UXtest-${props.taskSet}`,
    data: '',
    timestamp: Date.now(),
  };
  await writeCheckpoint(checkpoint);

  emit('finishedTaskSet');
}
</script>
