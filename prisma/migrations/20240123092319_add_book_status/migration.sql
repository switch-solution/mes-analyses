/*
  Warnings:

  - Added the required column `status` to the `Standard_Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Standard_Book" ADD COLUMN     "status" TEXT NOT NULL;
