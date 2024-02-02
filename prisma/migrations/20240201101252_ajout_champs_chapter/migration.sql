/*
  Warnings:

  - Added the required column `rank` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `underRank` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `level` on the `Chapter` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "parentId" TEXT,
ADD COLUMN     "rank" INTEGER NOT NULL,
ADD COLUMN     "underRank" INTEGER NOT NULL,
DROP COLUMN "level",
ADD COLUMN     "level" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
