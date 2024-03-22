/*
  Warnings:

  - Added the required column `pourcentage` to the `Client_Table_Age_Row` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pourcentage` to the `Software_Table_Age_Row` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client_Table_Age_Row" ADD COLUMN     "pourcentage" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Software_Table_Age_Row" ADD COLUMN     "pourcentage" INTEGER NOT NULL;
