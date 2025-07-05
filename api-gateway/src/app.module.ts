import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/modules.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validate } from './config/config.validator';

@Module({
  imports: [
    HttpModule.register({
      global: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env.local', '.env'],
      cache: true,
      expandVariables: true,
      validate,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    ModulesModule,
  ],
})
export class AppModule {}
