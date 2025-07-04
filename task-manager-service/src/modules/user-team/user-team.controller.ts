import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserTeamService } from './user-team.service';
import { UserTeamEntitiy } from 'src/domain/entities/userTeam/userTeam.entity';

@Controller({ version: '1', path: 'manager/user_team' })
export class UserTeamController {
  constructor(private readonly userTeamService: UserTeamService) {}

  @Get()
  async createUserTeam(userTeam: UserTeamEntitiy): Promise<UserTeamEntitiy> {
    return this.userTeamService.createUserTeam(userTeam);
  }

  @Post()
  async readUserTeams(): Promise<UserTeamEntitiy[]> {
    return this.userTeamService.readUserTeams();
  }
  @Get('/:userTeamId')
  async readUserTeam(@Param('userTeamId') userTeamId: string) {
    return this.userTeamService.readUserTeam(userTeamId);
  }
}
