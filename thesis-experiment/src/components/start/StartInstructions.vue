<template>
  <div v-if="!consentGiven" class="start-instructions">
    <h1>Master thesis experiment</h1>
    <div>
      Thank you for participating in this research. This research aims to
      investigate the effects of handedness on smartphone interaction.
      Participating in this research is voluntary. You can stop participating at
      any time without any consequences or withdraw consent after participating.
      The data collected will be used for research purposes only and will be
      kept confidential. The data will be stored securely and will be
      anonymized. The results of this research may be published in scientific
      journals or presented at conferences. If you have any questions about this
      research, please contact the researcher at
      <a href="mailto: t.stellingwerf1@students.uu.nl"
        >t.stellingwerf1@students.uu.nl</a
      >.
    </div>
    <div class="label-group">
      <label
        ><input v-model="consent" type="checkbox" />I agree with the statement
        above and give my consent to use my data in this research.</label
      >
    </div>
    <button :disabled="!consent" @click="consentGiven = true">Continue</button>
  </div>
  <div v-else class="start-instructions">
    <h1>Instructions</h1>
    <p>
      In this research, you will first be asked to complete a set of personal
      questions. After that, you will be asked to complete four series of tasks,
      each series with either your left or right hand, as instructed before the
      series. Each series consists of a set of tasks that you will be asked to
      complete. You will be asked to complete the tasks as quickly and
      accurately as possible. You will be timed during the tasks, and your time
      will be recorded. You will also be asked to complete a short survey at the
      end of each series. Please complete the tasks as quickly and accurately as
      possible.
    </p>
    <p>Before you begin the experiment, please ensure the following:</p>
    <ul>
      <li>Sit comfortably in an environment without distractions.</li>
      <li>
        Use a smartphone device. The experiment will not start on a
        non-smartphone device.
      </li>
      <li>
        Remove any phone case or pop-socket during the experiment if possible.
      </li>
      <li>Make sure there is no glare on your screen.</li>
      <li>
        Set the brightness of your screen to your own comfort, but make sure you
        can see the elements on the screen properly.
      </li>
      <li>
        Complete the experiment with the phone in portrait mode. If not, the
        experiment will pause.
      </li>
      <li>Complete each task with only the instructed hand.</li>
    </ul>
    <button @click="next">Continue</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  finishedInstructions: [];
}>();

/**
 * Continue to the next step
 */
function next() {
  emit('finishedInstructions');
}

// Check consent
const consentGiven = ref<boolean>(false);
const consent = ref<boolean>(false);
</script>
