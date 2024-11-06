<template>
  <form class="laterality-test">
    <h1>Laterality test</h1>
    <div class="question">
      <p>Which hand do you use to write?</p>
      <div class="label-group">
        <label><input type="radio" />Left hand</label>
        <label><input type="radio" />No preference</label>
        <label><input type="radio" />Right hand</label>
      </div>
      <div class="label-group">
        <label><input type="checkbox" />I never use the other hand</label>
      </div>
    </div>
    <div class="question">
      <p>Which hand do you use to draw?</p>
      <div class="label-group">
        <label><input type="radio" />Left hand</label>
        <label><input type="radio" />No preference</label>
        <label><input type="radio" />Right hand</label>
      </div>
      <div class="label-group">
        <label><input type="checkbox" />I never use the other hand</label>
      </div>
    </div>
    <div class="question">
      <p>Which hand do you use to throw?</p>
      <div class="label-group">
        <label><input type="radio" />Left hand</label>
        <label><input type="radio" />No preference</label>
        <label><input type="radio" />Right hand</label>
      </div>
      <div class="label-group">
        <label><input type="checkbox" />I never use the other hand</label>
      </div>
    </div>
    <div class="question">
      <p>Which hand do you use when using scissors?</p>
      <div class="label-group">
        <label><input type="radio" />Left hand</label>
        <label><input type="radio" />No preference</label>
        <label><input type="radio" />Right hand</label>
      </div>
      <div class="label-group">
        <label><input type="checkbox" />I never use the other hand</label>
      </div>
    </div>
    <div class="question">
      <p>Which hand do you use when using a toothbrush?</p>
      <div class="label-group">
        <label><input type="radio" />Left hand</label>
        <label><input type="radio" />No preference</label>
        <label><input type="radio" />Right hand</label>
      </div>
      <div class="label-group">
        <label><input type="checkbox" />I never use the other hand</label>
      </div>
    </div>
    <div class="question">
      <p>Which hand do you use when using a knife (without a fork)?</p>
      <div class="label-group">
        <label><input type="radio" />Left hand</label>
        <label><input type="radio" />No preference</label>
        <label><input type="radio" />Right hand</label>
      </div>
      <div class="label-group">
        <label><input type="checkbox" />I never use the other hand</label>
      </div>
    </div>
    <div class="question">
      <p>Which hand do you use when using a spoon?</p>
      <div class="label-group">
        <label><input type="radio" />Left hand</label>
        <label><input type="radio" />No preference</label>
        <label><input type="radio" />Right hand</label>
      </div>
      <div class="label-group">
        <label><input type="checkbox" />I never use the other hand</label>
      </div>
    </div>
    <div class="question">
      <p>Which hand do you use when using a broom (upper hand)?</p>
      <div class="label-group">
        <label><input type="radio" />Left hand</label>
        <label><input type="radio" />No preference</label>
        <label><input type="radio" />Right hand</label>
      </div>
      <div class="label-group">
        <label><input type="checkbox" />I never use the other hand</label>
      </div>
    </div>
    <div class="question">
      <p>Which hand do you use to strike a match?</p>
      <div class="label-group">
        <label><input type="radio" />Left hand</label>
        <label><input type="radio" />No preference</label>
        <label><input type="radio" />Right hand</label>
      </div>
      <div class="label-group">
        <label><input type="checkbox" />I never use the other hand</label>
      </div>
    </div>
    <div class="question">
      <p>Which hand do you use to open a box (holding the lid)?</p>
      <div class="label-group">
        <label><input type="radio" />Left hand</label>
        <label><input type="radio" />No preference</label>
        <label><input type="radio" />Right hand</label>
      </div>
      <div class="label-group">
        <label><input type="checkbox" />I never use the other hand</label>
      </div>
    </div>
    <p class="error">Test</p>
    <p class="success">Test</p>
    <button @click.prevent="save">Continue</button>
  </form>
</template>

<script setup lang="ts">
const emit = defineEmits(['finishedTest'])
function save() {
  emit('finishedTest')
}
</script>
