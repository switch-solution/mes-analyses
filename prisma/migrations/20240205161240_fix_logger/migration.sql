/*
  Warnings:

  - You are about to drop the column `projetId` on the `Logger` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Logger" DROP CONSTRAINT "Logger_projetId_fkey";

-- AlterTable
ALTER TABLE "Logger" DROP COLUMN "projetId",
ADD COLUMN     "projectId" TEXT;

-- AddForeignKey
ALTER TABLE "Logger" ADD CONSTRAINT "Logger_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
