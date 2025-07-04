#!/bin/bash

# Set database credentials
DB_USER=$1
HOST=$2

# Path to SQL files
DB_NAME="TaskManagerYL"
SQL_DIR="../create/"

# Loop over .sql files and execute them
for file in "$SQL_DIR"/*.sql; do
  echo "Executing $file..."
  if [[ $file ]]; then
    mysql -h "$HOST" -u "$DB_USER" -p <"$file"
  fi
  mysql -h "$HOST" -u "$DB_USER" -p "DB_NAME" <"$file"
done

echo "All SQL files executed."
