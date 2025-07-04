CREATE TABLE IF NOT EXISTS `Tasks` (
  `id` VARCHAR(36) PRIMARY KEY,
  `projectId` VARCHAR(36),
  `title` VARCHAR(150),
  `description` TEXT,
  `dueDate` DATE,
  `state` ENUM('todo', 'in progress', 'completed'),
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_tasks_project` FOREIGN KEY (`projectId`) REFERENCES `Projects`(`id`) ON DELETE CASCADE
);

