import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskEntity } from '../task/task.entity';
import { IProject } from './project.interface';

@Entity('project')
export class ProjectEntitiy implements IProject {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /* relations */
  @OneToMany(() => TaskEntity, (task) => task.project)
  tasks: TaskEntity[];
}
