import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [AuthenticationModule, HealthModule],
})
export class ModulesModule {}
