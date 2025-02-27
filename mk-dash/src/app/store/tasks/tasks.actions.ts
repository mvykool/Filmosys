import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

//load tasks
export const loadTasks = createAction('[Tasks] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Tasks] Load Tasks Success',
  props<{ tasks: Task[] }>(),
);
export const loadTasksFailure = createAction(
  '[Tasks] Load Tasks Failure',
  props<{ error: string }>(),
);

//select Task
export const selectTask = createAction(
  '[Tasks] Select Task',
  props<{ taskId: string }>(),
);

//create Tasks
export const createTask = createAction(
  '[Tasks] Create Task',
  props<{ task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> }>(),
);

export const createTaskSuccess = createAction(
  '[Tasks] Create Task Success',
  props<{ task: Task }>(),
);

export const createTaskFailure = createAction(
  '[Tasks] Create Task Failure',
  props<{ error: string }>(),
);

//update tasks
export const updateTask = createAction(
  '[Tasks] Update Task',
  props<{ taskId: string; changes: Partial<Task> }>(),
);
export const updateTaskSuccess = createAction(
  '[Tasks] Create Task Success',
  props<{ task: Task }>(),
);

export const updateTaskFailure = createAction(
  '[Tasks] Create Task Failure',
  props<{ error: string }>(),
);

//delete tasks
export const deleteTask = createAction(
  '[Tasks] Update Task',
  props<{ taskId: string }>(),
);
export const deleteTaskSuccess = createAction(
  '[Tasks] Create Task Success',
  props<{ taskId: string }>(),
);

export const deleteTaskFailure = createAction(
  '[Tasks] Create Task Failure',
  props<{ error: string }>(),
);

//filter tasks
export const setTaskFilter = createAction(
  '[Task] Set Task Filters',
  props<{
    filters: {
      status?: string | null;
      priority?: string | null;
      assignedTo?: string | null;
    };
  }>(),
);
