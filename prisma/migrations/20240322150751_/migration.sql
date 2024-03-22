/*
  Warnings:

  - Added the required column `pourcentage` to the `Table_Age_Row` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Table_Age_Row" ADD COLUMN     "pourcentage" INTEGER NOT NULL;
