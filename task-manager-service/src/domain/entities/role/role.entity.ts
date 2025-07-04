import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { IRole } from './role.interface';

@Entity('role')
export class RoleEntitiy implements IRole {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'member'],
  })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
