<template>
  <div :class="['tap-type', interfaceOrientation]">
    <p>{{ sentence }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <textarea
      v-model="writtenText"
      ref="textareaRef"
      :placeholder="sentence"
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
        <div class="key-medium">123</div>
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
const sentence = 'The quick brown fox jumps over the lazy dog.';
const writtenText = ref<string>('');
const errorMessage = ref<string>('');
const keyboardRef = useTemplateRef<HTMLElement>('keyboard');
const keyboardPosition = ref<{ x: number; y: number }>({ x: 0, y: 0 });
const firstRow: string[] = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const firstRowRefs = ref<(HTMLElement | null)[]>([]);
const secondRow: string[] = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const secondRowRefs = ref<(HTMLElement | null)[]>([]);
const thirdRow: string[] = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
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
  setNextAction();
}

/**
 * Add character to the written text
 * @param key Key to add to the written text
 */
function addCharacter(key: string) {
  writtenText.value += key;
  capitalization.value = false;
  setNextAction();
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
  setNextAction();
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
      ? keyboardPosition.value.x +
        capitalizationRef.value.offsetLeft +
        capitalizationRef.value.offsetWidth / 2
      : 0,
    centerY: capitalizationRef.value
      ? keyboardPosition.value.y +
        capitalizationRef.value.offsetTop +
        capitalizationRef.value.offsetHeight / 2
      : 0,
  };
});

// Emit current action
useEmitCurrentAction(currentAction, emit);

/**
 * Set next action
 */
function setNextAction() {
  // If the written text is empty, click capitalization
  if (writtenText.value === '' && !capitalization.value) {
    currentAction.value = {
      action: 'clickCapitalization',
      centerX: capitalizationRef.value
        ? keyboardPosition.value.x +
          capitalizationRef.value.offsetLeft +
          capitalizationRef.value.offsetWidth / 2
        : 0,
      centerY: capitalizationRef.value
        ? keyboardPosition.value.y +
          capitalizationRef.value.offsetTop +
          capitalizationRef.value.offsetHeight / 2
        : 0,
    };
  }
  // If written text is not in the sentence, click backspace
  else if (!sentence.includes(writtenText.value)) {
    currentAction.value = {
      action: 'clickBackspace',
      centerX: backspaceRef.value
        ? keyboardPosition.value.x +
          backspaceRef.value.offsetLeft +
          backspaceRef.value.offsetWidth / 2
        : 0,
      centerY: backspaceRef.value
        ? keyboardPosition.value.y +
          backspaceRef.value.offsetTop +
          backspaceRef.value.offsetHeight / 2
        : 0,
    };
  }
  // If the written text matches the sentence, click check
  else if (sentence === writtenText.value) {
    currentAction.value = {
      action: 'clickCheck',
      centerX: checkRef.value
        ? keyboardPosition.value.x +
          checkRef.value.offsetLeft +
          checkRef.value.offsetWidth / 2
        : 0,
      centerY: checkRef.value
        ? keyboardPosition.value.y +
          checkRef.value.offsetTop +
          checkRef.value.offsetHeight / 2
        : 0,
    };
  }
  // Else, click the next character in the sentence
  else {
    const nextCharacter = sentence[writtenText.value.length].toUpperCase();
    const nextCharacterRef =
      nextCharacter == ' '
        ? punctuationRef.value
        : firstRow.includes(nextCharacter)
          ? firstRowRefs.value[firstRow.indexOf(nextCharacter)]
          : secondRow.includes(nextCharacter)
            ? secondRowRefs.value[secondRow.indexOf(nextCharacter)]
            : thirdRowRefs.value[thirdRow.indexOf(nextCharacter)]
              ? nextCharacter == '.'
              : spaceBarRef.value;
    currentAction.value = {
      action: `click${nextCharacter === ' ' ? 'SpaceBar' : nextCharacter}`,
      centerX:
        nextCharacterRef instanceof HTMLElement
          ? keyboardPosition.value.x +
            nextCharacterRef.offsetLeft +
            nextCharacterRef.offsetWidth / 2
          : 0,
      centerY:
        nextCharacterRef instanceof HTMLElement
          ? keyboardPosition.value.y +
            nextCharacterRef.offsetTop +
            nextCharacterRef.offsetHeight / 2
          : 0,
    };
  }
}

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
