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
  currentAction: Ref<Action>,
): void {
  // If the written text is empty, click capitalization
  if (writtenText.value === '' && !capitalization.value) {
    currentAction.value = {
      action: 'clickCapitalization',
      centerX: capitalizationRef.value
        ? window.screen.width -
          window.innerWidth +
          capitalizationRef.value.getBoundingClientRect().left +
          capitalizationRef.value.getBoundingClientRect().width / 2
        : 0,
      centerY: capitalizationRef.value
        ? window.screen.height -
          window.innerHeight +
          capitalizationRef.value.getBoundingClientRect().top +
          capitalizationRef.value.getBoundingClientRect().height / 2
        : 0,
    };
  }
  // If written text is not in the sentence, click backspace
  else if (!sentence.includes(writtenText.value)) {
    currentAction.value = {
      action: 'clickBackspace',
      centerX: backspaceRef.value
        ? window.screen.width -
          window.innerWidth +
          backspaceRef.value.getBoundingClientRect().left +
          backspaceRef.value.getBoundingClientRect().width / 2
        : 0,
      centerY: backspaceRef.value
        ? window.screen.height -
          window.innerHeight +
          backspaceRef.value.getBoundingClientRect().top +
          backspaceRef.value.getBoundingClientRect().height / 2
        : 0,
    };
  }
  // If the written text matches the sentence, click check
  else if (sentence === writtenText.value) {
    currentAction.value = {
      action: 'clickCheck',
      centerX: checkRef.value
        ? window.screen.width -
          window.innerWidth +
          checkRef.value.getBoundingClientRect().left +
          checkRef.value.getBoundingClientRect().width / 2
        : 0,
      centerY: checkRef.value
        ? window.screen.height -
          window.innerHeight +
          checkRef.value.getBoundingClientRect().top +
          checkRef.value.getBoundingClientRect().height / 2
        : 0,
    };
  }
  // Else, click the next character in the sentence
  else {
    const nextCharacter = sentence[writtenText.value.length].toUpperCase();
    const nextCharacterRef =
      nextCharacter == ' '
        ? spaceBarRef.value
        : firstRow.includes(nextCharacter)
          ? firstRowRefs.value[firstRow.indexOf(nextCharacter)]
          : secondRow.includes(nextCharacter)
            ? secondRowRefs.value[secondRow.indexOf(nextCharacter)]
            : thirdRow.includes(nextCharacter)
              ? thirdRowRefs.value[thirdRow.indexOf(nextCharacter)]
              : nextCharacter == '.'
                ? punctuationRef.value
                : null;
    currentAction.value = {
      action: `click${nextCharacter === ' ' ? 'SpaceBar' : nextCharacter}`,
      centerX:
        nextCharacterRef instanceof HTMLElement
          ? window.screen.width -
            window.innerWidth +
            nextCharacterRef.getBoundingClientRect().left +
            nextCharacterRef.getBoundingClientRect().width / 2
          : 0,
      centerY:
        nextCharacterRef instanceof HTMLElement
          ? window.screen.height -
            window.innerHeight +
            nextCharacterRef.getBoundingClientRect().top +
            nextCharacterRef.getBoundingClientRect().height / 2
          : 0,
    };
  }
}
