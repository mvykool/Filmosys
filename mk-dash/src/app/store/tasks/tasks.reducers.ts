import { createReducer, on } from '@ngrx/store';
import { TaskState } from '../../models/task-state.model';
import * as TaskActions from './tasks.actions';

export const initialTaskState: TaskState = {
  tasks: [],
  selectedTaskId: null,
  loading: false,
  error: null,
  filters: {
    status: null,
    priority: null,
    assignedTo: null,
  },
};

export const taskReducer = createReducer(
  initialTaskState,

  // load tasks
  on(TaskActions.loadTasks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    loading: false,
  })),

  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // select tasks

  on(TaskActions.selectTask, (state, { taskId }) => ({
    ...state,
    selectedTaskId: taskId,
  })),

  on(TaskActions.createTask, (state) => ({
    ...state,
    loading: true,
  })),

  on(TaskActions.createTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
  })),

  on(TaskActions.createTaskFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  //update task
  on(TaskActions.updateTask, (state) => ({
    ...state,
    loading: true,
  })),

  on(TaskActions.updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
  })),

  on(TaskActions.updateTaskFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  //delete tasks
  on(TaskActions.deleteTask, (state) => ({
    ...state,
    loading: true,
  })),

  on(TaskActions.deleteTaskSuccess, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter((t) => t.id !== taskId),
  })),

  on(TaskActions.deleteTaskFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  //set filters
  on(TaskActions.setTaskFilter, (state, { filters }) => ({
    ...state,
    filters: {
      ...state.filters,
      ...filters,
    },
  })),
);
