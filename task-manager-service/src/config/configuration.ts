import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { CommentEntity } from 'src/domain/entities/comment/comment.entity';
import { ProjectEntitiy } from 'src/domain/entities/project/project.entity';
import { RoleEntitiy } from 'src/domain/entities/role/role.entity';
import { TaskEntity } from 'src/domain/entities/task/task.entity';
import { TaskStateEntitiy } from 'src/domain/entities/task/taskState.entity';
import { TeamEntitiy } from 'src/domain/entities/team/team.entity';
import { UserEntity } from 'src/domain/entities/user/user.entity';
import { UserTeamEntitiy } from 'src/domain/entities/userTeam/userTeam.entity';

config();

const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as 'mysql',
  host: process.env.DB_HOST! || 'localhost',
  port: parseInt(process.env.DB_PORT!, 10) || 3306,
  database: process.env.DB_NAME! || 'inlaze_project_manager',
  username: process.env.DB_USER! || 'root',
  password: process.env.DB_PASSWORD! || '',

  entities: [
    UserEntity,
    ProjectEntitiy,
    TaskEntity,
    TeamEntitiy,
    RoleEntitiy,
    CommentEntity,
    UserTeamEntitiy,
    TaskStateEntitiy,
  ],
};

export default typeOrmConfig;
