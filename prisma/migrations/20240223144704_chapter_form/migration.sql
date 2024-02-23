/*
  Warnings:

  - You are about to drop the `ChapterStdComponent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChapterStdComponent" DROP CONSTRAINT "ChapterStdComponent_clientId_bookLabel_bookSoftwareLabel_l_fkey";

-- DropForeignKey
ALTER TABLE "ChapterStdComponent" DROP CONSTRAINT "ChapterStdComponent_componentLabel_softwareLabel_clientId__fkey";

-- DropTable
DROP TABLE "ChapterStdComponent";

-- CreateTable
CREATE TABLE "SoftwareChapterSoftwareComponent" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "componentLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "componentType" TEXT NOT NULL,
    "bookLabel" TEXT NOT NULL,
    "bookSoftwareLabel" TEXT NOT NULL,
    "level_1" INTEGER NOT NULL,
    "level_2" INTEGER NOT NULL,
    "level_3" INTEGER NOT NULL,

    CONSTRAINT "SoftwareChapterSoftwareComponent_pkey" PRIMARY KEY ("clientId","bookLabel","bookSoftwareLabel","level_1","level_2","level_3","componentLabel","softwareLabel","componentType")
);

-- AddForeignKey
ALTER TABLE "SoftwareChapterSoftwareComponent" ADD CONSTRAINT "SoftwareChapterSoftwareComponent_clientId_bookLabel_bookSo_fkey" FOREIGN KEY ("clientId", "bookLabel", "bookSoftwareLabel", "level_1", "level_2", "level_3") REFERENCES "Software_Chapter"("clientId", "bookLabel", "bookSoftwareLabel", "level_1", "level_2", "level_3") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftwareChapterSoftwareComponent" ADD CONSTRAINT "SoftwareChapterSoftwareComponent_componentLabel_softwareLa_fkey" FOREIGN KEY ("componentLabel", "softwareLabel", "clientId", "componentType") REFERENCES "Software_Component"("label", "softwareLabel", "clientId", "type") ON DELETE CASCADE ON UPDATE CASCADE;
