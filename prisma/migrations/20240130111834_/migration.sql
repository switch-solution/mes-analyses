/*
  Warnings:

  - You are about to drop the column `name` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the `StandardChapter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChapterStdComposant" DROP CONSTRAINT "ChapterStdComposant_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "StandardChapter" DROP CONSTRAINT "StandardChapter_bookId_fkey";

-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "name";

-- DropTable
DROP TABLE "StandardChapter";

-- CreateTable
CREATE TABLE "Standard_Chapter" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,

    CONSTRAINT "Standard_Chapter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Standard_Chapter" ADD CONSTRAINT "Standard_Chapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Standard_Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterStdComposant" ADD CONSTRAINT "ChapterStdComposant_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Standard_Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
