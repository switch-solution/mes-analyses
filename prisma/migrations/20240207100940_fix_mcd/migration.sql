/*
  Warnings:

  - The primary key for the `ConstantLegal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `StandardRubrique` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StandardRubrique" DROP CONSTRAINT "StandardRubrique_idccCode_fkey";

-- DropForeignKey
ALTER TABLE "StandardRubrique" DROP CONSTRAINT "StandardRubrique_softwareId_fkey";

-- AlterTable
ALTER TABLE "ConstantLegal" DROP CONSTRAINT "ConstantLegal_pkey",
ADD CONSTRAINT "ConstantLegal_pkey" PRIMARY KEY ("code", "level", "dateStart", "dateEnd");

-- DropTable
DROP TABLE "StandardRubrique";

-- CreateTable
CREATE TABLE "SoftwareItems" (
    "id" TEXT NOT NULL,
    "softwareId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "idccCode" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "base" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "SoftwareItems_pkey" PRIMARY KEY ("id","softwareId","version")
);

-- AddForeignKey
ALTER TABLE "SoftwareItems" ADD CONSTRAINT "SoftwareItems_softwareId_fkey" FOREIGN KEY ("softwareId") REFERENCES "Software"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftwareItems" ADD CONSTRAINT "SoftwareItems_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
