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
import { RoleEntity } from '../role/role.entity';
import { IUser } from './user.interface';
import { UserTeamEntitiy } from '../userTeam/userTeam.entity';
import { AuthenticationEntity } from '../authentication/auth.entity';

@Entity('user')
export class UserEntity implements IUser {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column()
  roleId: string;

  @Column()
  name: string;

  @Column()
  middleName: string;

  @Column()
  lastName: string;

  @Column()
  secondLastName: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /* relations */
  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role: RoleEntity;

  @OneToMany(() => UserTeamEntitiy, (userTeam) => userTeam.user)
  userTeams: UserTeamEntitiy[];

  @OneToMany(() => UserTeamEntitiy, (userTeam) => userTeam.user)
  authentications: AuthenticationEntity[];
}
