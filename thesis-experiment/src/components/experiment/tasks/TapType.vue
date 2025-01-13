<template>
  <div :class="['tap-type', interfaceOrientation]">
    <p>{{ sentence }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <textarea
      v-model="writtenText"
      ref="textareaRef"
      :placeholder="sentence"
      readonly
    ></textarea>
    <div ref="keyboard" class="keyboard">
      <div class="row-1">
        <div
          v-for="key in firstRow"
          ref="firstRowRefs"
          :key="key"
          @click="addCharacter(capitalizeCharacter(key))"
        >
          {{ capitalizeCharacter(key) }}
        </div>
      </div>
      <div class="row-2">
        <div
          v-for="key in secondRow"
          ref="secondRowRefs"
          :key="key"
          @click="addCharacter(capitalizeCharacter(key))"
        >
          {{ capitalizeCharacter(key) }}
        </div>
      </div>
      <div class="row-3">
        <div ref="capitalizationRef" class="key-medium">
          <font-awesome-icon @click="capitalize" :icon="['fas', 'up-long']" />
        </div>
        <div
          v-for="key in thirdRow"
          ref="thirdRowRefs"
          :key="key"
          @click="addCharacter(capitalizeCharacter(key))"
        >
          {{ capitalizeCharacter(key) }}
        </div>
        <div ref="backspaceRef" class="key-medium">
          <font-awesome-icon
            @click="removeCharacter"
            :icon="['fas', 'left-long']"
          />
        </div>
      </div>
      <div class="row-4">
        <div class="key-medium disabled">123</div>
        <div
          @click="addCharacter(' ')"
          ref="spaceBarRef"
          class="spaceBar"
        ></div>
        <div @click="addCharacter('.')" ref="punctuationRef">.</div>
        <div ref="checkRef" class="key-medium">
          <font-awesome-icon @click="checkSentence" :icon="['fas', 'check']" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  sentence,
  firstRow,
  secondRow,
  thirdRow,
  useNextAction,
} from '@/composables/tasks/useTapType';
import { useEmitCurrentAction } from '@/composables/useTasks';
import type { Action } from '@/utils/types/measurements';
import { onMounted, ref, useTemplateRef } from 'vue';

defineProps<{
  interfaceOrientation: string;
}>();

const emit = defineEmits<{
  finishedTask: [];
  currentAction: [value: Action];
}>();

// Keyboard
const textareaRef = useTemplateRef<HTMLTextAreaElement>('textareaRef');
const writtenText = ref<string>('');
const errorMessage = ref<string>('');
const keyboardRef = useTemplateRef<HTMLElement>('keyboard');
const keyboardPosition = ref<{ x: number; y: number }>({ x: 0, y: 0 });
const firstRowRefs = ref<(HTMLElement | null)[]>([]);
const secondRowRefs = ref<(HTMLElement | null)[]>([]);
const thirdRowRefs = ref<(HTMLElement | null)[]>([]);
const capitalization = ref<boolean>(false);
const capitalizationRef = useTemplateRef<HTMLElement>('capitalizationRef');
const backspaceRef = useTemplateRef<HTMLElement>('backspaceRef');
const spaceBarRef = useTemplateRef<HTMLElement>('spaceBarRef');
const punctuationRef = useTemplateRef<HTMLElement>('punctuationRef');
const checkRef = useTemplateRef<HTMLElement>('checkRef');

/**
 * Capitalize character if capitalization is enabled
 * @param key Key to capitalize
 */
function capitalizeCharacter(key: string) {
  return capitalization.value ? key.toUpperCase() : key.toLowerCase();
}

/**
 * Toggle capitalization
 */
function capitalize() {
  capitalization.value = !capitalization.value;
  useNextAction(
    writtenText,
    capitalization,
    capitalizationRef,
    backspaceRef,
    spaceBarRef,
    punctuationRef,
    checkRef,
    firstRowRefs,
    secondRowRefs,
    thirdRowRefs,
    keyboardPosition,
    currentAction,
  );
}

/**
 * Add character to the written text
 * @param key Key to add to the written text
 */
function addCharacter(key: string) {
  if (textareaRef.value) {
    const cursorPosition = textareaRef.value.selectionStart;
    writtenText.value =
      writtenText.value.slice(0, cursorPosition) +
      key +
      writtenText.value.slice(cursorPosition);
  }
  capitalization.value = false;
  useNextAction(
    writtenText,
    capitalization,
    capitalizationRef,
    backspaceRef,
    spaceBarRef,
    punctuationRef,
    checkRef,
    firstRowRefs,
    secondRowRefs,
    thirdRowRefs,
    keyboardPosition,
    currentAction,
  );
}

/**
 * Remove character from the written text
 */
function removeCharacter() {
  if (textareaRef.value) {
    const cursorPosition = textareaRef.value.selectionStart;
    writtenText.value =
      writtenText.value.slice(0, cursorPosition - 1) +
      writtenText.value.slice(cursorPosition);
  }
  useNextAction(
    writtenText,
    capitalization,
    capitalizationRef,
    backspaceRef,
    spaceBarRef,
    punctuationRef,
    checkRef,
    firstRowRefs,
    secondRowRefs,
    thirdRowRefs,
    keyboardPosition,
    currentAction,
  );
}

// Measurements
const currentAction = ref<Action>({
  action: 'clickCapitalization',
  centerX: 0,
  centerY: 0,
});

// Set initial action
onMounted(() => {
  // Get keyboard position
  keyboardPosition.value = {
    x: keyboardRef.value ? keyboardRef.value.offsetLeft : 0,
    y: keyboardRef.value ? keyboardRef.value.offsetTop : 0,
  };

  currentAction.value = {
    action: 'clickCapitalization',
    centerX: capitalizationRef.value
      ? window.screenX +
        keyboardPosition.value.x +
        capitalizationRef.value.offsetLeft +
        capitalizationRef.value.offsetWidth / 2
      : 0,
    centerY: capitalizationRef.value
      ? window.screenY +
        keyboardPosition.value.y +
        capitalizationRef.value.offsetTop +
        capitalizationRef.value.offsetHeight / 2
      : 0,
  };
});

// Emit current action
useEmitCurrentAction(currentAction, emit);

/**
 * Check if the written text matches the sentence
 */
function checkSentence() {
  errorMessage.value = '';

  if (writtenText.value === sentence) {
    emit('finishedTask');
  } else {
    errorMessage.value = 'The written text does not match the sentence.';
  }
}
</script>
