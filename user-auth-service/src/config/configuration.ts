import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthenticationEntity } from 'src/domian/entities/authentication/auth.entity';
import { RoleEntity } from 'src/domian/entities/role/role.entity';
import { TeamEntitiy } from 'src/domian/entities/team/team.entity';
import { UserEntity } from 'src/domian/entities/user/user.entity';
import { UserTeamEntitiy } from 'src/domian/entities/userTeam/userTeam.entity';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as 'mysql',
  host: process.env.DB_HOST! ?? 'localhost',
  port: parseInt(process.env.DB_PORT!, 10) ?? 3306,
  database: process.env.DB_NAME! ?? 'inlaze_project_manager',
  username: process.env.DB_USER! ?? 'root',
  password: process.env.DB_PASSWORD! ?? '',

  entities: [
    UserEntity,
    AuthenticationEntity,
    RoleEntity,
    TeamEntitiy,
    UserTeamEntitiy,
  ],
};

export default typeOrmConfig;
