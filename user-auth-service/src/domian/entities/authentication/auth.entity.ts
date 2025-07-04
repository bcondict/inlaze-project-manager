import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IAuth } from './auth.interface';
import { UserEntity } from '../user/user.entity';

@Entity('Authentication')
export class AuthenticationEntity implements IAuth {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column()
  userId: string;

  @Column()
  hashPassword: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /* relations */
  @OneToMany(() => UserEntity, (user) => user.authentications)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
