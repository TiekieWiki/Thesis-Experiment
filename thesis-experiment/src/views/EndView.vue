<template>
  <main class="end">
    <h1>Thank you for participating!</h1>
    <p>
      You have completed the experiment and your answers have been saved. Thank
      you for your time.
    </p>
    <p>
      Do you want to receive the results of this research when it is finished?
      Enter your email address below:
    </p>
    <template v-if="emailSubmitted === false">
      <input v-model="emailAddress" placeholder="Email address" type="email" />
      <p v-if="error" class="error">{{ error }}</p>
      <button @click.prevent="submitEmail">Submit email address</button>
    </template>
    <p v-else>Your email address has been submitted successfully!</p>
  </main>
</template>

<script setup lang="ts">
import router from '@/router';
import { addData, getData } from '@/utils/db';
import { getAllCheckpoints } from '@/utils/logic/checkpoints';
import { getCurrentPage } from '@/utils/logic/userProgress';
import type { UserEmail } from '@/utils/types/user';
import { where } from 'firebase/firestore';
import { onMounted, ref } from 'vue';

const userId = ref<string | null>(null);

// Redirect user to the correct page
onMounted(async () => {
  await getCurrentPage().then(async page => {
    if (page !== 'End') {
      router.push({ name: page });
    } else {
      // Determine if the user has already entered their email address
      const checkpoints = await getAllCheckpoints();
      if (checkpoints) {
        const user = checkpoints.find(checkpoint => checkpoint.id === 'userID');

        if (user) {
          userId.value = user.data;
          const email = await getData(
            'resultEmail',
            where('userId', '==', userId.value),
          );
          emailSubmitted.value = email.length > 0;
        }
      }
    }
  });
});

// Enter email address
const emailAddress = ref<string>('');
const error = ref<string | null>(null);
const emailSubmitted = ref<boolean>(false);

/**
 * Submit the email address
 */
function submitEmail(): void {
  const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!checkEmail.test(emailAddress.value)) {
    error.value = 'Please enter a valid email address';
  } else {
    const userEmail: UserEmail = {
      userId: userId.value!,
      email: emailAddress.value,
    };
    addData('resultEmail', userEmail);
    emailSubmitted.value = true;
  }
}
</script>
