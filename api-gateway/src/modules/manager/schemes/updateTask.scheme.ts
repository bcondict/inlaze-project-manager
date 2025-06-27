import { IsNotEmptyObject, IsUUID } from 'class-validator';
import { TaskUpdater } from './taskUpdater.scheme';

export class UpdateTaskScheme {
  @IsUUID('4', { message: 'Task ID must be a valid UUID.' })
  taskId: string;
  @IsNotEmptyObject({}, { message: "Task object shouln't be empty" })
  taskUpdater: TaskUpdater;
}
