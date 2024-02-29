/*
  Warnings:

  - Added the required column `description` to the `Prisma_Seed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Prisma_Seed` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prisma_Seed" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL;
