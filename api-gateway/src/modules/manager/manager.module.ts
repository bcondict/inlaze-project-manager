import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { HttpModule } from '@nestjs/axios';
import { NotifierModule } from '../notifier/notifier.module';

@Module({
  imports: [HttpModule, NotifierModule],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
