import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserTeamInterface } from './userTeam.interface';
import { UserEntity } from '../user/user.entity';
import { TeamEntitiy } from '../team/team.entity';

@Entity('UserTeams')
export class UserTeamEntitiy implements UserTeamInterface {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column()
  userId: string;

  @Column()
  teamId: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'member'],
  })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /* relations */
  @ManyToOne(() => UserEntity, (user) => user.userTeams)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => TeamEntitiy, (team) => team.userTeams)
  @JoinColumn({ name: 'teamId' })
  team: TeamEntitiy;
}
