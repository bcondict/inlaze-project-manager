import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities/user/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async readUser(userId: string): Promise<UserEntity> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    const user = await queryRunner.manager.findOneOrFail(UserEntity, {
      where: { id: userId },
    });

    await queryRunner.release();
    return user;
  }
}
