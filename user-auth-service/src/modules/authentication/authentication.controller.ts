import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserEntity } from 'src/domian/entities/user/user.entity';
import { UserRegisterDTO } from 'src/domian/entities/user/userRegister.dto';
import { LoginDto } from 'src/domian/entities/authentication/login.dto';

@Controller({ version: '1', path: 'auth' })
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('register')
  async register(@Body() user: UserRegisterDTO): Promise<UserEntity> {
    return this.authService.registerUser(user);
  }

  @Post('login')
  async login(@Body() loginInfo: LoginDto): Promise<object> {
    return this.authService.login(loginInfo);
  }
}
