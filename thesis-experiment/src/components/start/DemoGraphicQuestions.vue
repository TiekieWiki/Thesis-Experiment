<template>
  <form>
    <h1>Personal information</h1>
    <label>Birth date <input type="date" /> </label>
    <div class="label-group">
      Gender
      <label><input type="radio" />Male</label>
      <label><input type="radio" />Female</label>
      <label><input type="radio" />Other</label>
    </div>
    <div class="label-group">
      <label><input type="checkbox" />I agree</label>
    </div>
    <p class="error">Test</p>
    <p class="success">Test</p>
    <button @click.prevent="save">Continue</button>
  </form>
</template>

<script setup lang="ts">
const emit = defineEmits(['finishedQuestions'])
function save() {
  emit('finishedQuestions')
}
</script>
