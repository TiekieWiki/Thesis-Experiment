export interface LateralityQuestion {
  name: string;
  question: string;
  handedness: string;
  useOtherHand: boolean | null;
}

export interface Laterality {
  userId: string;
  writing: string;
  writingOtherHand: boolean | null;
  drawing: string;
  drawingOtherHand: boolean | null;
  throwing: string;
  throwingOtherHand: boolean | null;
  scissors: string;
  scissorsOtherHand: boolean | null;
  toothbrush: string;
  toothbrushOtherHand: boolean | null;
  knife: string;
  knifeOtherHand: boolean | null;
  spoon: string;
  spoonOtherHand: boolean | null;
  broom: string;
  broomOtherHand: boolean | null;
  match: string;
  matchOtherHand: boolean | null;
  box: string;
  boxOtherHand: boolean | null;
}
