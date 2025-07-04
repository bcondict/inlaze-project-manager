import { Injectable, Logger } from '@nestjs/common';
import { RoleEntitiy } from 'src/domain/entities/role/role.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class RoleService {
  private logger: Logger;
  constructor(private readonly dataSource: DataSource) {
    this.logger = new Logger();
  }

  async createRole(role: RoleEntitiy): Promise<RoleEntitiy> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newRole = await queryRunner.manager.save(role);

      await queryRunner.commitTransaction();

      return newRole;
    } catch (err) {
      this.logger.log(
        'Error creating a role state on taskState service: ',
        err,
      );
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    throw new Error('Error creating a role state on taskState service: ');
  }

  async readRoles(): Promise<RoleEntitiy[]> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    const roles = queryRunner.manager.find(RoleEntitiy);

    await queryRunner.release();
    return roles;
  }

  async readRole(roleId: string): Promise<RoleEntitiy> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    const role = queryRunner.manager.findOneOrFail(RoleEntitiy, {
      where: { id: roleId },
    });

    await queryRunner.release();
    return role;
  }

  async readRoleByName(roleName: string): Promise<RoleEntitiy> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    const role = queryRunner.manager.findOneOrFail(RoleEntitiy, {
      where: { name: roleName },
    });

    await queryRunner.release();
    return role;
  }
}
