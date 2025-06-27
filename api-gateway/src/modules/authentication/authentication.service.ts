import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { JwtResponseScheme } from './schemes/jwt-response.scheme';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { loginCatchError } from './interceptors/login.interceptor';
import { AxiosResponse } from 'axios';
import { RegisterScheme } from './schemes/register.scheme';
import { registerCatchError } from './interceptors/register.interceptor';
import { HttpException } from '@nestjs/common';
import { UserResponseScheme } from './schemes/user-response.scheme';

@Injectable()
export class AuthenticationService {
  domainName: string = 'DOMAIN_AUTH';
  constructor(
    private readonly logger = new Logger(AuthenticationService.name),
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private get domain(): string {
    const authDomain = this.configService.get<string>(this.domainName);
    if (!authDomain) {
      this.logger.error(`Configuration for ${this.domainName} is missing.`);
      throw new InternalServerErrorException(
        'Authentication domain not configured.',
      );
    }
    return authDomain;
  }

  async login(email: string, password: string): Promise<JwtResponseScheme> {
    const user2login = {
      email,
      password,
    };

    const response = await firstValueFrom<AxiosResponse>(
      this.httpService
        .post(`${this.domain}/api/v1/login`, user2login, {
          params: { save: false },
        })
        .pipe(loginCatchError(this.logger)),
    );

    const jwtResponse = plainToInstance(JwtResponseScheme, response.data);

    await validateOrReject(jwtResponse).catch((errors) => {
      this.logger.error(
        `Invalid JWT response schema from authentication service: ${JSON.stringify(errors)}`,
      );
      throw new InternalServerErrorException(
        'Invalid authentication response format received.',
      );
    });

    this.logger.log(`Successfully authenticated user: ${email}`);

    return jwtResponse;
  }

  async register(registerPayload: RegisterScheme): Promise<UserResponseScheme> {
    this.logger.log(`Attempting to register user: ${registerPayload.email}`);
    try {
      const response = await firstValueFrom<AxiosResponse<UserResponseScheme>>(
        this.httpService
          .post<UserResponseScheme>(
            `${this.domain}/api/v1/register`,
            registerPayload,
          )
          .pipe(registerCatchError(this.logger)),
      );

      const userRegisteredResponse = plainToInstance(
        UserResponseScheme,
        response.data,
      );

      await validateOrReject(userRegisteredResponse).catch((errors) => {
        this.logger.error(
          `Invalid user registration response schema from authentication service for ${registerPayload.email}: ${JSON.stringify(errors)}`,
        );
        throw new InternalServerErrorException(
          'Invalid registration response format received.',
        );
      });

      this.logger.log(`Successfully registered user: ${registerPayload.email}`);
      return userRegisteredResponse;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(
        `Error during registration for ${registerPayload.email}: ${error}`,
      );
      throw new InternalServerErrorException(
        'An unexpected error occurred during registration.',
      );
    }
  }
}
