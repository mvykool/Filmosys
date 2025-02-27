export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  assignedTo: string | null;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updated: Date;
}
