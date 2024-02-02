/*
  Warnings:

  - Added the required column `rank` to the `Standard_Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Standard_Chapter" ADD COLUMN     "rank" INTEGER NOT NULL;
