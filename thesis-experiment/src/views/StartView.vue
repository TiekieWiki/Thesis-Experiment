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
import StartInstructions from '@/components/start/StartInstructions.vue'
import DemoGraphicQuestions from '@/components/start/DemoGraphicQuestions.vue'
import LateralityTest from '@/components/start/LateralityTest.vue'
import { ref } from 'vue'

const showComponent = ref<string>('startInstructions')
</script>
