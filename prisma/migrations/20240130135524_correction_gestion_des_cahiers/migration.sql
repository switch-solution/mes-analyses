/*
  Warnings:

  - You are about to drop the column `standard_BookId` on the `Chapter` table. All the data in the column will be lost.
  - Added the required column `description` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Standard_Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_standard_BookId_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "standard_BookId",
ADD COLUMN     "bookId" TEXT;

-- AlterTable
ALTER TABLE "Standard_Book" ADD COLUMN     "description" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Standard_Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
