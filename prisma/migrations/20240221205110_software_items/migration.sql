/*
  Warnings:

  - You are about to drop the `SoftwareItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SoftwareItems" DROP CONSTRAINT "SoftwareItems_idccCode_fkey";

-- DropForeignKey
ALTER TABLE "SoftwareItems" DROP CONSTRAINT "SoftwareItems_softwareLabel_softwareClientId_fkey";

-- DropTable
DROP TABLE "SoftwareItems";

-- CreateTable
CREATE TABLE "Software_Items" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "softwareClientId" TEXT NOT NULL,
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
    "employeeContribution" TEXT NOT NULL,
    "employerContribution" TEXT NOT NULL,

    CONSTRAINT "Software_Items_pkey" PRIMARY KEY ("id","type","softwareLabel","softwareClientId","version")
);

-- CreateIndex
CREATE UNIQUE INDEX "Software_Items_slug_key" ON "Software_Items"("slug");

-- AddForeignKey
ALTER TABLE "Software_Items" ADD CONSTRAINT "Software_Items_softwareLabel_softwareClientId_fkey" FOREIGN KEY ("softwareLabel", "softwareClientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Items" ADD CONSTRAINT "Software_Items_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
