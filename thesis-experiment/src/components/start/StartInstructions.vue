<template>
  <div class="start-instructions">
    <h1>Instructions</h1>
    <p>
      Thank you for participating in this experiment. In this experiment, you
      will be asked to complete four series of tasks, each series with either
      your left or right hand, as instructed before the series. Each series
      consists of a set of tasks that you will be asked to complete. You will be
      asked to complete the tasks as quickly and accurately as possible. You
      will be timed during the tasks, and your time will be recorded. You will
      also be asked to complete a short survey at the end of the experiment.
      Please complete the tasks as quickly and accurately as possible.
    </p>
    <p>Before you begin the experiment, please ensure the following:</p>
    <ul>
      <li>Sit comfortably in an environment without distractions</li>
      <li>
        Use a smartphone device. The experiment will not start on a
        non-smartphone device
      </li>
      <li>Make sure there is no glare on your screen</li>
      <li>
        Set the brightness of your screen to your own comfort, but make sure you
        can see the elements on the screen properly
      </li>
      <li>
        Remove any phone case or pop-socket during the experiment if possible
      </li>
      <li>
        Complete the experiment with the phone in portrait mode. If not, the
        experiment will pause
      </li>
      <li>Complete each task with only one hand</li>
    </ul>
    <button @click="next">Continue</button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['finishedInstructions'])
function next() {
  emit('finishedInstructions')
}
</script>
