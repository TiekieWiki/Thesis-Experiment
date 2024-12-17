import { taskSet } from '../types/tasks';
import { deleteAllCheckpoints, getAllCheckpoints } from './checkpoints';

/**
 * Go to the current page based on the last checkpoint
 * @returns Current page
 */
export async function getCurrentPage(): Promise<string> {
  const checkpoints = await getAllCheckpoints();
  if (checkpoints.length === 0) {
    return 'Start';
  } else {
    const lastCheckpoint = checkpoints.sort(
      (a, b) => b.timestamp - a.timestamp,
    )[0];

    // Check if the experiment is finished
    if (lastCheckpoint.id === 'finishedExperiment') {
      return 'End';
    }
    // Check if the last checkpoint was set within a day
    else if (Date.now() - lastCheckpoint.timestamp > 24 * 60 * 60 * 1000) {
      await deleteAllCheckpoints();
      return 'Start';
    }
    // Check if the user has already answered the demographic questions
    else if (
      lastCheckpoint.id === 'userID' ||
      lastCheckpoint.id === 'demoGraphicQuestions'
    ) {
      return 'Start';
    } else {
      return 'Experiment';
    }
  }
}

/**
 * Get the starting component based on the last checkpoint
 * @returns Component to start with
 */
export async function getStartComponent(): Promise<string> {
  const checkpoints = await getAllCheckpoints();
  if (checkpoints.length !== 0) {
    const lastCheckpoint = checkpoints.sort(
      (a, b) => b.timestamp - a.timestamp,
    )[0];
    if (lastCheckpoint.id === 'userID') {
      return 'demoGraphicQuestions';
    } else if (lastCheckpoint.id === 'demoGraphicQuestions') {
      return 'lateralityTest';
    }
  }
  return 'startInstructions';
}

/**
 * Get the remaining task sets
 * @returns The remaining task sets
 */
export async function getRemainingTaskSets(): Promise<string[]> {
  const checkpoints = await getAllCheckpoints();

  const completedTaskSets = checkpoints
    .filter(checkpoint => checkpoint.id.includes('taskSet-'))
    .map(checkpoint => checkpoint.id.replace('taskSet-', ''));

  return taskSet.filter(taskSet => !completedTaskSets.includes(taskSet));
}
