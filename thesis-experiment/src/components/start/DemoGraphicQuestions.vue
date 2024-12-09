<template>
  <form>
    <h1>Personal information</h1>
    <label>Birth date <input v-model="birthDate" type="date" /> </label>
    <div class="label-group">
      Gender
      <label
        ><input
          v-model="gender"
          value="male"
          type="radio"
          name="gender"
        />Male</label
      >
      <label
        ><input
          v-model="gender"
          value="female"
          type="radio"
          name="gender"
        />Female</label
      >
      <label
        ><input
          v-model="gender"
          value="other"
          type="radio"
          name="gender"
        />Other</label
      >
    </div>
    <p v-if="error" class="error">{{ error }}</p>
    <button :disabled="!requiredFieldsFilled" @click.prevent="save">
      Continue
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits<{
  finishedQuestions: [];
}>();

// Check if the user has filled in the required fields
const birthDate = ref<string | null>(null);
const gender = ref<string | null>(null);
const requiredFieldsFilled = ref<boolean>(false);
const error = ref<string | null>(null);

// Enable the continue button when the user has filled in the required fields
watch([birthDate, gender], () => {
  if (birthDate.value && gender.value) {
    requiredFieldsFilled.value = true;
  }
});

/**
 * Save the demographic information and continue to the next step
 */
function save() {
  // Check if the user has the correct age
  if (calculateAge(birthDate.value!) < 18) {
    error.value = 'You must be at least 18 years old to participate';
    return;
  } else if (new Date(birthDate.value!).getFullYear() < 1964) {
    error.value = 'You must be born after 1964 to participate';
    return;
  }

  // Go to the next step
  emit('finishedQuestions');
}

/**
 * Calculate the age of the user
 * @param dateString The birth date of the user
 */
function calculateAge(birthDate: string) {
  const today = new Date();
  const date = new Date(birthDate);
  let age = today.getFullYear() - date.getFullYear();
  const month = today.getMonth() - date.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < date.getDate())) {
    age--;
  }
  return age;
}
</script>
