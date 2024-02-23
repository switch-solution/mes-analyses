/*
  Warnings:

  - You are about to drop the `Standard_Book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Standard_Chapter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChapterStdComponent" DROP CONSTRAINT "ChapterStdComponent_clientId_bookLabel_bookSoftwareLabel_l_fkey";

-- DropForeignKey
ALTER TABLE "Standard_Book" DROP CONSTRAINT "Standard_Book_softwareLabel_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Standard_Chapter" DROP CONSTRAINT "Standard_Chapter_clientId_bookLabel_bookSoftwareLabel_fkey";

-- DropForeignKey
ALTER TABLE "Standard_Chapter" DROP CONSTRAINT "Standard_Chapter_parentId_fkey";

-- DropTable
DROP TABLE "Standard_Book";

-- DropTable
DROP TABLE "Standard_Chapter";

-- CreateTable
CREATE TABLE "Software_Book" (
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Software_Book_pkey" PRIMARY KEY ("label","softwareLabel","clientId")
);

-- CreateTable
CREATE TABLE "Software_Chapter" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "level_1" INTEGER NOT NULL,
    "level_2" INTEGER NOT NULL,
    "level_3" INTEGER NOT NULL,
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "bookLabel" TEXT NOT NULL,
    "bookSoftwareLabel" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "Software_Chapter_pkey" PRIMARY KEY ("clientId","bookLabel","bookSoftwareLabel","level_1","level_2","level_3")
);

-- CreateIndex
CREATE UNIQUE INDEX "Software_Book_slug_key" ON "Software_Book"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Chapter_id_key" ON "Software_Chapter"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Chapter_slug_key" ON "Software_Chapter"("slug");

-- AddForeignKey
ALTER TABLE "Software_Book" ADD CONSTRAINT "Software_Book_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Chapter" ADD CONSTRAINT "Software_Chapter_clientId_bookLabel_bookSoftwareLabel_fkey" FOREIGN KEY ("clientId", "bookLabel", "bookSoftwareLabel") REFERENCES "Software_Book"("clientId", "label", "softwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Chapter" ADD CONSTRAINT "Software_Chapter_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Software_Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterStdComponent" ADD CONSTRAINT "ChapterStdComponent_clientId_bookLabel_bookSoftwareLabel_l_fkey" FOREIGN KEY ("clientId", "bookLabel", "bookSoftwareLabel", "level_1", "level_2", "level_3") REFERENCES "Software_Chapter"("clientId", "bookLabel", "bookSoftwareLabel", "level_1", "level_2", "level_3") ON DELETE CASCADE ON UPDATE CASCADE;
