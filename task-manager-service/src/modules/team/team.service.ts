import { Injectable, Logger } from '@nestjs/common';
import { TeamEntitiy } from 'src/domain/entities/team/team.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class TeamService {
  private logger: Logger;
  constructor(private readonly dataSource: DataSource) {
    this.logger = new Logger();
  }

  async createTeam(team: TeamEntitiy): Promise<TeamEntitiy> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newTeam = await queryRunner.manager.save<TeamEntitiy>(team);

      await queryRunner.commitTransaction();

      return newTeam;
    } catch (err) {
      this.logger.log('Error creating team on team service: ', err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    throw new Error('Error creating team on team service: ');
  }
  async readTeams(): Promise<TeamEntitiy[]> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    try {
      const teams = await queryRunner.manager.find(TeamEntitiy);
      this.logger.log(`Found ${teams.length} teams`);
      return teams;
    } catch (error) {
      this.logger.error(`Error reading teams: ${error.message}`);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async readTeam(teamId: string): Promise<TeamEntitiy> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const team = await queryRunner.manager.findOneOrFail(TeamEntitiy, {
        where: { id: teamId },
      });
      return team;
    } catch (error) {
      this.logger.error(`Error reading team ${teamId}: ${error.message}`);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
