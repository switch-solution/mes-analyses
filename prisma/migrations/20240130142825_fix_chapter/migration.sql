/*
  Warnings:

  - You are about to drop the column `projectBookId` on the `Chapter` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_projectBookId_fkey";

-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "projectBookId";

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
