<template>
  <form class="user-experience-test">
    <h1>User experience test</h1>
    <div
      v-for="question in userExperienceQuestions"
      :key="question.name"
      class="question"
    >
      <p>{{ question.question }}</p>
      <div class="label-group">
        <label
          ><input
            v-model="question.answer"
            value="1"
            type="radio"
            :name="question.name"
          />Strongly disagree</label
        >
        <label
          ><input
            v-model="question.answer"
            value="2"
            type="radio"
            :name="question.name"
          />Disagree</label
        >
        <label
          ><input
            v-model="question.answer"
            value="3"
            type="radio"
            :name="question.name"
          />Somewhat disagree</label
        >
        <label
          ><input
            v-model="question.answer"
            value="4"
            type="radio"
            :name="question.name"
          />Neutral</label
        >
        <label
          ><input
            v-model="question.answer"
            value="5"
            type="radio"
            :name="question.name"
          />Somewhat agree</label
        >
        <label
          ><input
            v-model="question.answer"
            value="6"
            type="radio"
            :name="question.name"
          />Agree</label
        >
        <label
          ><input
            v-model="question.answer"
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
import type { UserExperience } from '@/utils/types/userExperience'
import { ref, watch } from 'vue'

defineProps<{
  taskSet: string
}>()

const emit = defineEmits(['finishedTaskSet'])

const userExperienceQuestions = ref<UserExperience[]>([
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
])

// Check if the user has filled in the required fields
const requiredFieldsFilled = ref<boolean>(false)

// Enable the continue button when the user has filled in the required fields
watch(userExperienceQuestions.value, () => {
  if (userExperienceQuestions.value.every(question => question.answer)) {
    requiredFieldsFilled.value = true
  }
})

/**
 * Save the laterality test information and continue to the next step
 */
function save() {
  emit('finishedTaskSet')
}
</script>
