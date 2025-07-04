import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'src/domain/entities/user/user.entity';

@Controller({ version: '1', path: 'manager/user' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:userId')
  async readUser(@Param('userId') userId: string): Promise<UserEntity> {
    return this.userService.readUser(userId);
  }
}
