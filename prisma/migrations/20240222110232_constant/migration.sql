/*
  Warnings:

  - You are about to drop the column `softwareClientId` on the `Constant_Legal` table. All the data in the column will be lost.
  - You are about to drop the column `softwareId` on the `Constant_Legal` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Constant_Legal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Constant_Legal" DROP CONSTRAINT "Constant_Legal_softwareLabel_softwareClientId_fkey";

-- AlterTable
ALTER TABLE "Constant_Legal" DROP COLUMN "softwareClientId",
DROP COLUMN "softwareId",
ADD COLUMN     "clientId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Constant_Legal" ADD CONSTRAINT "Constant_Legal_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;
