import { deleteAllCheckpoints, getAllCheckpoints } from './checkpoints';

/**
 * Go to the current page based on the last checkpoint
 * @returns Promise<string>
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
