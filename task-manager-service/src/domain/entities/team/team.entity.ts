import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TeamInterface } from './team.interface';
import { UserTeamEntitiy } from '../userTeam/userTeam.entity';

@Entity('Teams')
export class TeamEntitiy implements TeamInterface {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /* relations */
  @OneToMany(() => UserTeamEntitiy, (userTeam) => userTeam.team)
  userTeams: UserTeamEntitiy[];
}
