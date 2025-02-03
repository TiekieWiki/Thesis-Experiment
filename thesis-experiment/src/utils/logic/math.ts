/**
 * Calculate the angle between two points
 * @param touchX1 The x-coordinate of the first touch
 * @param touchY1 The y-coordinate of the first touch
 * @param touchX2 The x-coordinate of the second touch
 * @param touchY2 The y-coordinate of the second touch
 * @returns The angle between the two points
 */
export function calculateAngle(
  touchX1: number,
  touchY1: number,
  touchX2: number,
  touchY2: number,
): number {
  return Math.atan2(touchY2 - touchY1, touchX2 - touchX1) * (180 / Math.PI);
}

/**
 * Distance between two fingers
 * @param event Touch event
 * @returns The distance between two fingers
 */
export function distance(event: TouchEvent): number {
  return Math.hypot(
    event.touches[0].clientX - event.touches[1].clientX,
    event.touches[0].clientY - event.touches[1].clientY,
  );
}

/**
 * Calculate the age of the user
 * @param dateString The birth date of the user
 */
export function calculateAge(birthDate: string): number {
  const today = new Date();
  const date = new Date(birthDate);
  let age = today.getFullYear() - date.getFullYear();
  const month = today.getMonth() - date.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < date.getDate())) {
    age--;
  }
  return age;
}

/**
 * Wrap a sentence to fit the maximum number of characters per line
 * @param charactersPerLine Maximum number of characters per line
 * @param sentence Sentence to wrap
 * @returns Sentence wrapped to fit the maximum number of characters per line
 */
export function wrapSentence(
  charactersPerLine: number,
  sentence: string,
): string[] {
  const words = sentence.split(' ');
  let currentLine = '';
  const sentenceLines: string[] = [];

  for (const word of words) {
    if ((currentLine + word).length > charactersPerLine) {
      sentenceLines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  }

  if (currentLine.trim()) {
    if (sentence[sentence.length - 1] === ' ') {
      sentenceLines.push(currentLine.trim() + ' ');
    } else {
      sentenceLines.push(currentLine.trim());
    }
  }

  return sentenceLines;
}

/**
 * Get the line index and cursor index of the cursor position
 * @param sentenceLines Line of the sentence
 * @param cursorPosition Position of the cursor
 * @returns Object with the line index and cursor index
 */
export function getCursorPosition(
  sentenceLines: string[],
  cursorPosition: number,
): { lineIndex: number; cursorIndex: number } {
  let charCount = 0;

  for (let i = 0; i < sentenceLines.length; i++) {
    const lineLength = sentenceLines[i].length;

    if (cursorPosition < charCount + lineLength) {
      return { lineIndex: i, cursorIndex: cursorPosition - charCount };
    }

    charCount += lineLength + 1;
  }

  return {
    lineIndex: sentenceLines.length - 1,
    cursorIndex: sentenceLines[sentenceLines.length - 1].length,
  };
}
