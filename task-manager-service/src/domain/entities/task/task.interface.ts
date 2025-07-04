export interface TaskInterface {
  id: string;
  projectId: string;
  title: string;
  description: string;
  dueDate: Date;
  delegateUser: string;
  delegateTeam: string;
  createdAt: Date;
  updatedAt: Date;
}
