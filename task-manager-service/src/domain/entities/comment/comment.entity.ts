import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { TaskEntity } from '../task/task.entity';
import { CommentInterface } from './comment.interface';

@Entity('comments')
export class CommentEntity implements CommentInterface {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column()
  userId: string;

  @Column()
  taskId: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /* relations */
  @OneToMany(() => UserEntity, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToMany(() => TaskEntity, (task) => task.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'taskId' })
  task: TaskEntity;
}
