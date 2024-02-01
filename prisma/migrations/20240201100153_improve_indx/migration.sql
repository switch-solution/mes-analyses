/*
  Warnings:

  - A unique constraint covering the columns `[bookId,level,rank,underRank]` on the table `Standard_Chapter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `underRank` to the `Standard_Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Standard_Chapter_bookId_rank_level_key";

-- AlterTable
ALTER TABLE "Standard_Chapter" ADD COLUMN     "underRank" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Standard_Chapter_bookId_level_rank_underRank_key" ON "Standard_Chapter"("bookId", "level", "rank", "underRank");
