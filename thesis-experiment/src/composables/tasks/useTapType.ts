import type { Action } from '@/utils/types/measurements';
import type { Ref } from 'vue';

export const sentence = 'The quick brown fox jumps over the lazy dog.';
export const firstRow: string[] = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
];
export const secondRow: string[] = [
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
];
export const thirdRow: string[] = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

/**
 * Set next action
 */
export function useNextAction(
  writtenText: Ref<string>,
  capitalization: Ref<boolean>,
  capitalizationRef: Ref<HTMLElement | null>,
  backspaceRef: Ref<HTMLElement | null>,
  spaceBarRef: Ref<HTMLElement | null>,
  punctuationRef: Ref<HTMLElement | null>,
  checkRef: Ref<HTMLElement | null>,
  firstRowRefs: Ref<(HTMLElement | null)[]>,
  secondRowRefs: Ref<(HTMLElement | null)[]>,
  thirdRowRefs: Ref<(HTMLElement | null)[]>,
  keyboardPosition: Ref<{ x: number; y: number }>,
  currentAction: Ref<Action>,
): void {
  // If the written text is empty, click capitalization
  if (writtenText.value === '' && !capitalization.value) {
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
  }
  // If written text is not in the sentence, click backspace
  else if (!sentence.includes(writtenText.value)) {
    currentAction.value = {
      action: 'clickBackspace',
      centerX: backspaceRef.value
        ? window.screenX +
          keyboardPosition.value.x +
          backspaceRef.value.offsetLeft +
          backspaceRef.value.offsetWidth / 2
        : 0,
      centerY: backspaceRef.value
        ? window.screenY +
          keyboardPosition.value.y +
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
        ? window.screenX +
          keyboardPosition.value.x +
          checkRef.value.offsetLeft +
          checkRef.value.offsetWidth / 2
        : 0,
      centerY: checkRef.value
        ? window.screenY +
          keyboardPosition.value.y +
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
          ? window.screenX +
            keyboardPosition.value.x +
            nextCharacterRef.offsetLeft +
            nextCharacterRef.offsetWidth / 2
          : 0,
      centerY:
        nextCharacterRef instanceof HTMLElement
          ? window.screenY +
            keyboardPosition.value.y +
            nextCharacterRef.offsetTop +
            nextCharacterRef.offsetHeight / 2
          : 0,
    };
  }
}
