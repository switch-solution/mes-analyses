/*
  Warnings:

  - The primary key for the `SoftwareChapterSoftwareComponent` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "SoftwareChapterSoftwareComponent" DROP CONSTRAINT "SoftwareChapterSoftwareComponent_clientId_bookLabel_bookSo_fkey";

-- AlterTable
ALTER TABLE "SoftwareChapterSoftwareComponent" DROP CONSTRAINT "SoftwareChapterSoftwareComponent_pkey",
ADD CONSTRAINT "SoftwareChapterSoftwareComponent_pkey" PRIMARY KEY ("clientId", "bookLabel", "level_1", "level_2", "level_3", "componentLabel", "softwareLabel", "componentType");

-- AddForeignKey
ALTER TABLE "SoftwareChapterSoftwareComponent" ADD CONSTRAINT "SoftwareChapterSoftwareComponent_clientId_bookLabel_softwa_fkey" FOREIGN KEY ("clientId", "bookLabel", "softwareLabel", "level_1", "level_2", "level_3") REFERENCES "Software_Chapter"("clientId", "bookLabel", "bookSoftwareLabel", "level_1", "level_2", "level_3") ON DELETE CASCADE ON UPDATE CASCADE;
