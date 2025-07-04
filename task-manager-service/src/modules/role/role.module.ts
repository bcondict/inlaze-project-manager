import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntitiy } from 'src/domain/entities/role/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntitiy])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
