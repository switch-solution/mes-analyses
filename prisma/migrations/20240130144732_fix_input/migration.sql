/*
  Warnings:

  - You are about to drop the column `standard_Composant_InputId` on the `Composant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Composant" DROP CONSTRAINT "Composant_standard_Composant_InputId_fkey";

-- AlterTable
ALTER TABLE "Composant" DROP COLUMN "standard_Composant_InputId";

-- AlterTable
ALTER TABLE "Input" ADD COLUMN     "standard_Composant_InputId" TEXT;

-- AddForeignKey
ALTER TABLE "Input" ADD CONSTRAINT "Input_standard_Composant_InputId_fkey" FOREIGN KEY ("standard_Composant_InputId") REFERENCES "Standard_Composant_Input"("id") ON DELETE SET NULL ON UPDATE CASCADE;
