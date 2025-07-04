@echo off
set DB_USER=%1
set DB_PASS=%2
set DB_NAME="TaskManagerYL"
set HOST=%4

for %%f in (%SQL_DIR%\*.sql) do (
    echo Executing %%f...
    mysql -h %HOST% -u %DB_USER% -p%DB_PASS% %DB_NAME% < %%f
)

echo All SQL files executed.
pause
