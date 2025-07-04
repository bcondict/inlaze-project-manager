import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectEntitiy } from '../project/project.entity';
import { CommentEntity } from '../comment/comment.entity';
import { TaskStateEntitiy } from './taskState.entity';
import { TaskInterface } from './task.interface';

@Entity('task')
export class TaskEntity implements TaskInterface {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column()
  projectId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  dueDate: Date;

  @Column()
  delegateUser: string;

  @Column()
  delegateTeam: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /* relations */
  @ManyToOne(() => ProjectEntitiy, (project) => project.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectId' })
  project: ProjectEntitiy;

  @OneToMany(() => CommentEntity, (comment) => comment.task)
  comments: CommentEntity[];

  @OneToMany(() => TaskStateEntitiy, (taskState) => taskState.task)
  taskState: TaskStateEntitiy[];
}
