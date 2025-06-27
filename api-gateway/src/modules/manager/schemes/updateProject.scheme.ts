import { IsNotEmptyObject, IsUUID } from 'class-validator';
import { ProjectUpdater } from './projectUpdater.scheme';

export class UpdateProjects {
  @IsUUID('4', { message: 'Project ID must be a valid UUID.' })
  projectId: string;
  @IsNotEmptyObject({}, { message: "Project object shouln't be empty" })
  projectUpdater: ProjectUpdater;
}
