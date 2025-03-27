-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('admin', 'pelanggan') NOT NULL DEFAULT 'pelanggan';
