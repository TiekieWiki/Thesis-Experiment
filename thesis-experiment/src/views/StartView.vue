<template>
  <main class="start">
    <StartInstructions
      v-if="showComponent == 'startInstructions'"
      @finished-instructions="() => (showComponent = 'demoGraphicQuestions')"
    />
    <DemoGraphicQuestions
      v-else-if="showComponent == 'demoGraphicQuestions'"
      @finished-questions="() => (showComponent = 'lateralityTest')"
    />
    <LateralityTest
      v-else-if="showComponent == 'lateralityTest'"
      @finished-test="() => $router.push('/experiment')"
    />
  </main>
</template>

<script setup lang="ts">
import StartInstructions from '@/components/start/StartInstructions.vue';
import DemoGraphicQuestions from '@/components/start/DemoGraphicQuestions.vue';
import LateralityTest from '@/components/start/LateralityTest.vue';
import { onMounted, ref } from 'vue';
import { getCurrentPage } from '@/utils/logic/userProgress';
import router from '@/router';

const showComponent = ref<string>('startInstructions');

onMounted(async () => {
  await getCurrentPage().then(async page => {
    if (page !== 'Start') {
      console.log(page);
      router.push({ name: page });
    }
  });
});
</script>
