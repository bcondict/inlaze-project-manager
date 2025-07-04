import { Injectable, Logger } from '@nestjs/common';
import { UserTeamEntitiy } from 'src/domain/entities/userTeam/userTeam.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UserTeamService {
  private logger: Logger;
  constructor(private readonly dataSource: DataSource) {
    this.logger = new Logger();
  }

  async createUserTeam(userTeam: UserTeamEntitiy): Promise<UserTeamEntitiy> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newUserTeam =
        await queryRunner.manager.save<UserTeamEntitiy>(userTeam);

      await queryRunner.commitTransaction();

      return newUserTeam;
    } catch (err) {
      this.logger.log('Error creating userTeam on userTeam service: ', err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    throw new Error('Error creating project userTeam on userTeam service: ');
  }

  async readUserTeams(): Promise<UserTeamEntitiy[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const userTeams = await queryRunner.manager.find(UserTeamEntitiy);

    await queryRunner.release();
    return userTeams;
  }

  async readUserTeam(userTeamId: string): Promise<UserTeamEntitiy> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    const userTeam = queryRunner.manager.findOneOrFail(UserTeamEntitiy, {
      where: { id: userTeamId },
    });

    await queryRunner.release();
    return userTeam;
  }
}
