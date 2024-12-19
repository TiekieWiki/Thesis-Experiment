<template>
  <main class="end">
    <h1>Thank you for participating!</h1>
    <p>
      You have completed the experiment and your answers have been saved. Thank
      you for your time.
    </p>
  </main>
</template>

<script setup lang="ts">
import router from '@/router';
import { getCurrentPage } from '@/utils/logic/userProgress';
import { onMounted } from 'vue';

// Redirect user to the correct page
onMounted(async () => {
  await getCurrentPage().then(async page => {
    if (page !== 'End') {
      router.push({ name: page });
    }
  });
});
</script>
