import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationEntity } from 'src/domian/entities/authentication/auth.entity';
import { LoginDto } from 'src/domian/entities/authentication/login.dto';
import { RoleEntity } from 'src/domian/entities/role/role.entity';
import { UserEntity } from 'src/domian/entities/user/user.entity';
import { UserRegisterDTO } from 'src/domian/entities/user/userRegister.dto';
import { DataSource } from 'typeorm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  private logger: Logger;
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {
    this.logger = new Logger();
  }

  async registerUser(userInfo: UserRegisterDTO): Promise<UserEntity> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const userExistance = await queryRunner.manager.findOne(UserEntity, {
      where: { email: userInfo.email },
    });
    if (userExistance) {
      throw new Error('User is alredy registered!');
    }

    try {
      const userCount = await queryRunner.manager.count(UserEntity);

      const role = await queryRunner.manager.findOneByOrFail(RoleEntity, {
        name: userCount < 1 ? 'admin' : 'member',
      });
      const userComplete = {
        id: userInfo.id,
        roleId: role.id,
        name: userInfo.name,
        middleName: userInfo.middleName,
        lastName: userInfo.lastName,
        secondLastName: userInfo.secondLastName,
        email: userInfo.email,
        password: userInfo.password,
        createdAt: userInfo.createdAt,
        updatedAt: userInfo.updatedAt,
      };

      /* crate user */
      const newUser = await queryRunner.manager.save(UserEntity, userComplete);

      /* didn't like to do this */
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const hashPassword: string = await bcrypt.hash(userInfo.password, 10);
      const authComplete = {
        id: crypto.randomUUID(),
        userId: userInfo.id,
        hashPassword: hashPassword,
        email: userInfo.email,
        createdAt: userInfo.createdAt,
        updatedAt: userInfo.updatedAt,
      };
      await queryRunner.manager.save(AuthenticationEntity, authComplete);

      await queryRunner.commitTransaction();

      return newUser;
    } catch (err) {
      this.logger.log('Error registerin user on user service: ', err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    throw new Error('Error registerin user on user service: ');
  }

  async login(loginInfo: LoginDto): Promise<object> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const user = await queryRunner.manager.findOne(UserEntity, {
      where: { email: loginInfo.email },
    });

    const auth = await queryRunner.manager.findOneOrFail(AuthenticationEntity, {
      where: { userId: user?.id },
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const isMatch = await bcrypt.compare(loginInfo.password, auth.hashPassword);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user?.id,
      email: user?.email,
    };
    const token = this.jwtService.sign(payload);

    await queryRunner.release();
    return { token };
  }
}
