import { tasks, taskSet } from '../types/tasks';
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
 * Get the current task set, partial task sets, partial tasks, and component to show
 * @returns Current task set, partial task sets, partial tasks, and component to show
 */
export async function getExperimentComponent(): Promise<{
  curTaskSet: string;
  partTaskSets: string[];
  partTasks: string[];
  showComp: string;
}> {
  const checkpoints = await getAllCheckpoints();

  // Sort the checkpoints by timestamp
  checkpoints.sort((a, b) => a.timestamp - b.timestamp);

  // Check if experiment has started
  if (checkpoints.length === 0) {
    return {
      curTaskSet: '',
      partTaskSets: [],
      partTasks: [],
      showComp: 'taskSetInstructions',
    };
  }

  // Get the last checkpoint and the completed task sets
  const lastCheckpoint = checkpoints[checkpoints.length - 1];
  const completedTaskSetsCheckpoints = checkpoints.filter(checkpoint =>
    checkpoint.id.includes('taskSet-'),
  );
  const completedTaskSets = completedTaskSetsCheckpoints.map(checkpoint =>
    checkpoint.id.replace('taskSet-', ''),
  );

  // Determine the current component to show
  if (lastCheckpoint.id.includes('UXtest-')) {
    return {
      curTaskSet: '',
      partTaskSets: taskSet.filter(
        taskSet => !completedTaskSets.includes(taskSet),
      ),
      partTasks: tasks,
      showComp: 'taskSetInstructions',
    };
  } else if (lastCheckpoint.id.includes('taskSet-')) {
    return {
      curTaskSet: lastCheckpoint.id.replace('taskSet-', ''),
      partTaskSets: taskSet.filter(
        taskSet => !completedTaskSets.includes(taskSet),
      ),
      partTasks: tasks,
      showComp: 'taskSetInstructions',
    };
  } else if (lastCheckpoint.id.includes('task-')) {
    const lastTaskSet =
      completedTaskSetsCheckpoints[completedTaskSetsCheckpoints.length - 1];
    const completedTasks = checkpoints
      .slice(checkpoints.indexOf(lastTaskSet) + 1)
      .map(checkpoint => checkpoint.id.replace('task-', ''));
    if (completedTasks.length !== tasks.length) {
      return {
        curTaskSet: lastTaskSet.id.replace('taskSet-', ''),
        partTaskSets: taskSet.filter(
          taskSet => !completedTaskSets.includes(taskSet),
        ),
        partTasks: tasks.filter(task => !completedTasks.includes(task)),
        showComp: 'taskInstructions',
      };
    } else {
      return {
        curTaskSet: lastTaskSet.id.replace('taskSet-', ''),
        partTaskSets: taskSet.filter(
          taskSet => !completedTaskSets.includes(taskSet),
        ),
        partTasks: tasks,
        showComp: 'userExperienceTest',
      };
    }
  } else {
    return {
      curTaskSet: '',
      partTaskSets: taskSet,
      partTasks: tasks,
      showComp: 'taskSetInstructions',
    };
  }
}
