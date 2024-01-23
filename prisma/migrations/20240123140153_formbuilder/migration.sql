/*
  Warnings:

  - You are about to drop the `Standard_Book_Composant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Standard_Book_Composant" DROP CONSTRAINT "Standard_Book_Composant_standardBookId_fkey";

-- DropForeignKey
ALTER TABLE "Standard_Book_Composant" DROP CONSTRAINT "Standard_Book_Composant_standardComposantId_fkey";

-- DropTable
DROP TABLE "Standard_Book_Composant";

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChapterStdComposant" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "standardComposantId" TEXT NOT NULL,

    CONSTRAINT "ChapterStdComposant_pkey" PRIMARY KEY ("chapterId","standardComposantId")
);

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Standard_Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterStdComposant" ADD CONSTRAINT "ChapterStdComposant_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterStdComposant" ADD CONSTRAINT "ChapterStdComposant_standardComposantId_fkey" FOREIGN KEY ("standardComposantId") REFERENCES "Standard_Composant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
