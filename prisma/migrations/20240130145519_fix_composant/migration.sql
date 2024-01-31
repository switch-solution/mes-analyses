/*
  Warnings:

  - You are about to drop the column `bookChapterId` on the `Composant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Composant" DROP CONSTRAINT "Composant_bookChapterId_fkey";

-- AlterTable
ALTER TABLE "Composant" DROP COLUMN "bookChapterId",
ADD COLUMN     "chapterId" TEXT;

-- AddForeignKey
ALTER TABLE "Composant" ADD CONSTRAINT "Composant_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
