import { TaskState } from '../models/task-state.model';

export interface AppState {
  tasks: TaskState;
  users: UserState;
  ui: UiState;
}
