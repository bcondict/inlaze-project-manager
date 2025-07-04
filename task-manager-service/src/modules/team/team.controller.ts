import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamEntitiy } from 'src/domain/entities/team/team.entity';

@Controller({ version: '1', path: 'manager/teams' })
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async createTeam(@Body() team: TeamEntitiy): Promise<TeamEntitiy> {
    return this.teamService.createTeam(team);
  }

  @Post()
  async readTeams(): Promise<TeamEntitiy[]> {
    return this.teamService.readTeams();
  }

  @Get('/:teamId')
  async readTeam(@Param('teamId') teamId: string): Promise<TeamEntitiy> {
    return this.teamService.readTeam(teamId);
  }
}
