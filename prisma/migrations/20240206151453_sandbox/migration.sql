/*
  Warnings:

  - Added the required column `composantId` to the `SandboxValues` table without a default value. This is not possible if the table is not empty.
  - Added the required column `version` to the `SandboxValues` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SandboxValues" ADD COLUMN     "composantId" TEXT NOT NULL,
ADD COLUMN     "version" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SandboxValues" ADD CONSTRAINT "SandboxValues_composantId_fkey" FOREIGN KEY ("composantId") REFERENCES "Standard_Composant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
