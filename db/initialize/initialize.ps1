param (
  [Parameter(Mandatory, HelpMessage = "Please provide a mysql user")]
  [string]$DB_USER,
  [Parameter(Mandatory, HelpMessage = "Please provide a mysql host")]
  [string]$DB_HOST,
  [Parameter(Mandatory, HelpMessage = "Please provide a database")]
  [string]$DB_NAME = "TaskManagerYL"
)
[string]$SQL_DIR = "./create";

$SQL_FILES = Get-ChildItem -Path $SQL_DIR -Include *.sql -File -Recurse
#
$SQL_FILES | ForEach-Object {
  Write-Host "Executing $($_.FullName)..."
  if ($($_.FullName) -like "*0-database.sql")
  {
    Get-Content $($_.FullName) | mysql -h $DB_HOST -u $DB_USER -p
  } else
  {
    Get-Content $($_.FullName) | mysql -h $DB_HOST -u $DB_USER -p $DB_NAME
  }
}
