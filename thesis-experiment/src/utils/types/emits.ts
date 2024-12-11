import type { Action } from './measurements';

export type EventMap = {
  finishedTask?: void;
  currentAction?: Action;
};

export type EmitFunction<EventMap> = <K extends keyof EventMap>(
  event: K,
  payload: EventMap[K],
) => void;
