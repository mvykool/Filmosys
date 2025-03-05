import { Task } from './task.model';

export interface TaskState {
  tasks: Task[];
  selectedTaskId: string | null;
  loading: boolean;
  error: string | null;
  filters: {
    status: string | null;
    priority: string | null;
    assignedTo: string | null;
  };
}
