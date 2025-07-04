import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginScheme } from './schemes/login.scheme';
import { UserResponseScheme } from './schemes/user-response.scheme';

@Controller({ version: '1', path: 'auth' })
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  async login(@Body() loginData: LoginScheme) {
    return this.authenticationService.login(
      loginData.email,
      loginData.password,
    );
  }

  @Post('register')
  async register(@Body() userData: UserResponseScheme) {
    return this.authenticationService.register(userData);
  }
}
