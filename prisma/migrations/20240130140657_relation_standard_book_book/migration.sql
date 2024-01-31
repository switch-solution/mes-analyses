/*
  Warnings:

  - Made the column `bookId` on table `Chapter` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_bookId_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "standard_BookId" TEXT;

-- AlterTable
ALTER TABLE "Chapter" ALTER COLUMN "bookId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_standard_BookId_fkey" FOREIGN KEY ("standard_BookId") REFERENCES "Standard_Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Standard_Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
