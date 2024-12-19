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
import { addData } from '@/utils/db';
import { getMobileBrowser, getOperatingSystem } from '@/utils/logic/checkPhone';
import { getAllCheckpoints, writeCheckpoint } from '@/utils/logic/checkpoints';
import { calculateAge } from '@/utils/logic/math';
import type { Checkpoint } from '@/utils/types/checkpoint';
import type { User } from '@/utils/types/user';
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
async function save() {
  // Check if the user has the correct age
  if (calculateAge(birthDate.value!) < 18) {
    error.value = 'You must be at least 18 years old to participate';
    return;
  } else if (new Date(birthDate.value!).getFullYear() < 1964) {
    error.value = 'You must be born after 1964 to participate';
    return;
  }

  // Save the demographic information
  const user: User = {
    id: (await getAllCheckpoints()).sort((a, b) => a.timestamp - b.timestamp)[0]
      .data,
    birthDate: birthDate.value!,
    gender: gender.value!,
    os: getOperatingSystem(),
    browser: getMobileBrowser(),
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
  };

  addData('user', user);

  // Write a checkpoint
  const checkpoint: Checkpoint = {
    id: 'demoGraphicQuestions',
    data: '',
    timestamp: Date.now(),
  };
  await writeCheckpoint(checkpoint);

  // Go to the next step
  emit('finishedQuestions');
}
</script>
