/*
  Warnings:

  - A unique constraint covering the columns `[bookId,rank,level]` on the table `Standard_Chapter` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Standard_Chapter_bookId_rank_level_label_key";

-- CreateIndex
CREATE UNIQUE INDEX "Standard_Chapter_bookId_rank_level_key" ON "Standard_Chapter"("bookId", "rank", "level");
