/*
  Warnings:

  - Added the required column `clientId` to the `Standard_Composant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Standard_Composant" ADD COLUMN     "clientId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Standard_Composant" ADD CONSTRAINT "Standard_Composant_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
