param (
  [Parameter(Mandatory, HelpMessage = "Please provide a mysql user")]
  [string]$DB_USER,
  [Parameter(Mandatory, HelpMessage = "Please provide a mysql host")]
  [string]$DB_HOST,
  [Parameter(Mandatory, HelpMessage = "Please provide a database name")]
  [string]$DB_NAME = "inlaze_project_manager",
  [Parameter(HelpMessage = "Drop and recreate database")]
  [switch]$Recreate
)

[string]$SQL_DIR = "./create";

Write-Host "Initializing database: $DB_NAME" -ForegroundColor Green

# Drop database if recreate flag is set
if ($Recreate) {
  Write-Host "Dropping existing database..." -ForegroundColor Yellow
  Get-Content "$SQL_DIR/1-drop-database.sql" | mysql -h $DB_HOST -u $DB_USER -p
}

# Create database first
Write-Host "Creating database..." -ForegroundColor Yellow
Get-Content "$SQL_DIR/0-database.sql" | mysql -h $DB_HOST -u $DB_USER -p

# Execute all other SQL files
$SQL_FILES = @(
  "Users.sql",
  "Teams.sql", 
  "Roles.sql",
  "UserRoles.sql",
  "Projects.sql",
  "Tasks.sql",
  "Commentaries.sql",
  "UserTeams.sql",
  "TaskStates.sql"
)

foreach ($file in $SQL_FILES) {
  $filePath = "$SQL_DIR/$file"
  if (Test-Path $filePath) {
    Write-Host "Executing $file..." -ForegroundColor Yellow
    Get-Content $filePath | mysql -h $DB_HOST -u $DB_USER -p $DB_NAME
  } else {
    Write-Host "Warning: $file not found" -ForegroundColor Red
  }
}

Write-Host "Database initialization completed!" -ForegroundColor Green 