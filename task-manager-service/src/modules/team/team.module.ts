import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEntitiy } from 'src/domain/entities/team/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntitiy])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
