CREATE TABLE IF NOT EXISTS `Tasks` (
  `id` VARCHAR(36) PRIMARY KEY,
  `projectId` VARCHAR(36),
  `title` VARCHAR(150),
  `description` TEXT,
  `dueDate` DATE,
  `delegateUser` VARCHAR(36),
  `delegateTeam` VARCHAR(36),
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_tasks_project` FOREIGN KEY (`projectId`) REFERENCES `Projects`(`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tasks_user` FOREIGN KEY (`delegateUser`) REFERENCES `Users`(`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_tasks_team` FOREIGN KEY (`delegateTeam`) REFERENCES `Teams`(`id`) ON DELETE SET NULL
);

