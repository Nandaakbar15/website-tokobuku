-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Buku` (
    `id_buku` INTEGER NOT NULL AUTO_INCREMENT,
    `judul_buku` VARCHAR(191) NOT NULL,
    `penulis` VARCHAR(191) NOT NULL,
    `penerbit` VARCHAR(191) NOT NULL,
    `stok` INTEGER NOT NULL,
    `harga` INTEGER NOT NULL,

    PRIMARY KEY (`id_buku`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
