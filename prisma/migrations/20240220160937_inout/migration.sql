/*
  Warnings:

  - You are about to drop the column `Standard_ComponentId` on the `Standard_Component_Image` table. All the data in the column will be lost.
  - You are about to drop the column `Standard_ComponentId` on the `Standard_Component_TextArea` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Standard_Component_TextArea_Standard_ComponentId_key";

-- AlterTable
ALTER TABLE "Standard_Component_Image" DROP COLUMN "Standard_ComponentId";

-- AlterTable
ALTER TABLE "Standard_Component_TextArea" DROP COLUMN "Standard_ComponentId";
