import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { TeamModule } from './team/team.module';
import { RoleModule } from './role/role.module';
import { CommentModule } from './comment/comment.module';
import { UserTeamModule } from './user-team/user-team.module';
import { TaskStateModule } from './task-state/task-state.module';

@Module({
  imports: [
    UserModule,
    ProjectModule,
    TaskModule,
    TeamModule,
    RoleModule,
    CommentModule,
    UserTeamModule,
    TaskStateModule,
  ],
})
export class ModulesModule {}
