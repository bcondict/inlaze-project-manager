import { Controller, Get, Param } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleEntitiy } from 'src/domain/entities/role/role.entity';

@Controller({ version: '1', path: 'manager/roles/' })
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async readRoles(): Promise<RoleEntitiy[]> {
    return this.roleService.readRoles();
  }

  @Get('/:roleId')
  async readRole(@Param('roleId') roleId: string): Promise<RoleEntitiy> {
    return this.roleService.readRole(roleId);
  }
}
