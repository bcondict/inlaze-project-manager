import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskEntity } from './task.entity';

@Entity('TaskStates')
export class TaskStateEntitiy {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column()
  taskId: string;

  @Column({
    type: 'enum',
    enum: ['todo', 'in_progress', 'completed'],
  })
  state: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /* relations */
  @ManyToOne(() => TaskEntity, (task) => task.taskState)
  @JoinColumn({ name: 'taskId' })
  task: TaskEntity;
}
