/*
  Warnings:

  - Added the required column `softwareId` to the `Standard_Composant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Standard_Composant" ADD COLUMN     "softwareId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Standard_Composant" ADD CONSTRAINT "Standard_Composant_softwareId_fkey" FOREIGN KEY ("softwareId") REFERENCES "Software"("id") ON DELETE CASCADE ON UPDATE CASCADE;
