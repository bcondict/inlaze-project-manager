import { Module } from '@nestjs/common';
import { UserTeamController } from './user-team.controller';
import { UserTeamService } from './user-team.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTeamEntitiy } from 'src/domain/entities/userTeam/userTeam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTeamEntitiy])],
  controllers: [UserTeamController],
  providers: [UserTeamService],
})
export class UserTeamModule {}
