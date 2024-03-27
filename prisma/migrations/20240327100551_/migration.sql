/*
  Warnings:

  - Added the required column `theme` to the `Processus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theme` to the `Software_Processus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Processus" ADD COLUMN     "theme" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Software_Processus" ADD COLUMN     "theme" TEXT NOT NULL;
