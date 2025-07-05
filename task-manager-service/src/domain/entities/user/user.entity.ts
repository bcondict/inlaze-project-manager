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
import { RoleEntitiy } from '../role/role.entity';
import { CommentEntity } from '../comment/comment.entity';
import { UserInterface } from './user.interface';
import { UserTeamEntitiy } from '../userTeam/userTeam.entity';

@Entity('Users')
export class UserEntity implements UserInterface {
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
  @ManyToOne(() => RoleEntitiy, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role: RoleEntitiy;

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => UserTeamEntitiy, (userTeam) => userTeam.user)
  userTeams: UserTeamEntitiy[];
}
