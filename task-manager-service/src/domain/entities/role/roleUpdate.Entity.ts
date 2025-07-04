import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('role')
export class RoleUpdateEntitiy {
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
