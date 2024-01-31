/*
  Warnings:

  - You are about to drop the column `standard_BookId` on the `Book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_standard_BookId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "standard_BookId";
