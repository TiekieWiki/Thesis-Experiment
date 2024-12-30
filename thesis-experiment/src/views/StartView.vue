<template>
  <main class="start">
    <Suspense>
      <template #default>
        <StartInstructions
          v-if="showComponent == 'startInstructions'"
          @finished-instructions="
            () => (showComponent = 'demoGraphicQuestions')
          "
        />
        <DemoGraphicQuestions
          v-else-if="showComponent == 'demoGraphicQuestions'"
          @finished-questions="() => (showComponent = 'lateralityTest')"
        />
        <LateralityTest
          v-else-if="showComponent == 'lateralityTest'"
          @finished-test="() => $router.push('/experiment')"
        />
      </template>
      <template #fallback>
        <div class="loader">
          <div class="loaderSpinner"></div>
        </div>
      </template>
    </Suspense>
  </main>
</template>

<script setup lang="ts">
import StartInstructions from '@/components/start/StartInstructions.vue';
import DemoGraphicQuestions from '@/components/start/DemoGraphicQuestions.vue';
import LateralityTest from '@/components/start/LateralityTest.vue';
import { onMounted, ref } from 'vue';
import { getCurrentPage, getStartComponent } from '@/utils/logic/userProgress';
import router from '@/router';

const showComponent = ref<string>('startInstructions');

// Redirect user to the correct page and show the correct component
onMounted(async () => {
  await getCurrentPage().then(async page => {
    if (page !== 'Start') {
      router.push({ name: page });
    } else {
      showComponent.value = await getStartComponent();
    }
  });
});
</script>
