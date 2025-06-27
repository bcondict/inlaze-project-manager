import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { ManagerModule } from './manager/manager.module';
import { NotifierModule } from './notifier/notifier.module';

@Module({
  imports: [NotifierModule, AuthenticationModule, ManagerModule],
})
export class ModulesModule {}
