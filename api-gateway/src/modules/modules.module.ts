import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { ManagerModule } from './manager/manager.module';
import { NotifierModule } from './notifier/notifier.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [NotifierModule, AuthenticationModule, ManagerModule, HealthModule],
  providers: [NotifierModule],
})
export class ModulesModule {}
