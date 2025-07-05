-- Test database connection and tables
USE inlaze_project_manager;

-- Show all tables
SHOW TABLES;

-- Check table structures
DESCRIBE Users;
DESCRIBE Teams;
DESCRIBE Roles;
DESCRIBE UserRoles;
DESCRIBE Projects;
DESCRIBE Tasks;
DESCRIBE Commentaries;
DESCRIBE UserTeams;
DESCRIBE TaskStates;

-- Check if there are any projects
SELECT COUNT(*) as project_count FROM Projects;

-- Check if there are any tasks
SELECT COUNT(*) as task_count FROM Tasks;

-- Check if there are any users
SELECT COUNT(*) as user_count FROM Users;

-- Check if there are any teams
SELECT COUNT(*) as team_count FROM Teams; 