import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { UseCasesModule } from './use-cases/use-cases.module';
import { ConfigModule } from '@nestjs/config';
import { ModulesModule } from './modules/modules.module';

import typeOrmConfig from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    InfrastructureModule,
    UseCasesModule,
    DomainModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ModulesModule,
  ],
})
export class AppModule {}
