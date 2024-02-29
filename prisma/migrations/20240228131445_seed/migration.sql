/*
  Warnings:

  - Added the required column `previousLabel` to the `Prisma_Seed` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prisma_Seed" ADD COLUMN     "error" TEXT,
ADD COLUMN     "previousLabel" TEXT NOT NULL;
