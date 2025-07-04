export interface TaskStateInterface {
  id: string;
  taskId: string;
  state: ['todo', 'in_progress', 'completed'];
  createdAt: Date;
}
