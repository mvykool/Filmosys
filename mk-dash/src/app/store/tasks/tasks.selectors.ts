import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from '../../models/task-state.model';
//import { AppState } from '../app.state';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectAllTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks,
);

export const selectTasksLoading = createSelector(
  selectTaskState,
  (state: TaskState) => state.loading,
);

export const selectTasksError = createSelector(
  selectTaskState,
  (state: TaskState) => state.error,
);

export const selectSelectorTaskId = createSelector(
  selectTaskState,
  (state: TaskState) => state.selectedTaskId,
);

export const selectSelectedTask = createSelector(
  selectAllTasks,
  selectSelectorTaskId,
  (tasks, selectedTaskId) =>
    tasks.find((task) => task.id === selectedTaskId) || null,
);

export const selectTaskFilters = createSelector(
  selectTaskState,
  (state: TaskState) => state.filters,
);

export const selectFilteredTasks = createSelector(
  selectAllTasks,
  selectTaskFilters,
  (tasks, filters) => {
    return tasks.filter((task) => {
      //appy filter status
      if (filters.status && task.status !== filters.status) {
        return false;
      }
      // apply filter priority
      if (filters.priority && task.priority !== filters.priority) {
        return false;
      }
      //apply filter assigned to

      if (filters.assignedTo && task.assignedTo !== filters.assignedTo) {
        return false;
      }

      return true;
    });
  },
);
