import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/modules.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ModulesModule,
  ],
})
export class AppModule {}
