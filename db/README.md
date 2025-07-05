# Inlaze Project Manager - Database Setup

Database initialization for the Inlaze Project Manager application.

## Prerequisites

- MySQL/MariaDB server running
- MySQL client installed
- Access to create databases and tables

## Quick Setup

### Windows (PowerShell)

```powershell
cd db/initialize
powershell -ExecutionPolicy Bypass -File initialize-complete.ps1 -DB_USER "root" -DB_HOST "localhost" -DB_NAME "inlaze_project_manager"
```

### Linux/MacOS

```bash
cd db/initialize
./initialize.sh "root" "localhost"
```

## Manual Setup

If you prefer to run the scripts manually:

1. **Create the database:**
   ```sql
   CREATE DATABASE IF NOT EXISTS `inlaze_project_manager`;
   ```

2. **Execute the table creation scripts in order:**
   ```bash
   mysql -u root -p inlaze_project_manager < create/Users.sql
   mysql -u root -p inlaze_project_manager < create/Teams.sql
   mysql -u root -p inlaze_project_manager < create/Roles.sql
   mysql -u root -p inlaze_project_manager < create/UserRoles.sql
   mysql -u root -p inlaze_project_manager < create/Projects.sql
   mysql -u root -p inlaze_project_manager < create/Tasks.sql
   mysql -u root -p inlaze_project_manager < create/Commentaries.sql
   mysql -u root -p inlaze_project_manager < create/UserTeams.sql
   mysql -u root -p inlaze_project_manager < create/TaskStates.sql
   ```

## Database Schema

The database includes the following tables:

- **Users**: User information and authentication
- **Teams**: Team definitions
- **Roles**: User roles and permissions
- **UserRoles**: User-role relationships
- **Projects**: Project definitions
- **Tasks**: Task definitions and assignments
- **Commentaries**: Comments on tasks
- **UserTeams**: User-team relationships
- **TaskStates**: Task state tracking

## Environment Variables

Make sure your services are configured with the correct database connection:

```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=inlaze_project_manager
DB_USER=root
DB_PASSWORD=your_password_here
```

## Troubleshooting

### Common Issues

1. **"Table doesn't exist" errors**: Run the database initialization scripts
2. **Connection refused**: Ensure MySQL server is running
3. **Access denied**: Check user permissions and credentials
4. **Foreign key constraint errors**: Ensure tables are created in the correct order

### Verification

To verify the database is set up correctly:

```sql
USE inlaze_project_manager;
SHOW TABLES;
```

You should see all 9 tables listed.
