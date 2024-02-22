/*
  Warnings:

  - The primary key for the `Software_Items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `softwareClientId` on the `Software_Items` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Software_Items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Software_Items" DROP CONSTRAINT "Software_Items_softwareLabel_softwareClientId_fkey";

-- AlterTable
ALTER TABLE "Software_Items" DROP CONSTRAINT "Software_Items_pkey",
DROP COLUMN "softwareClientId",
ADD COLUMN     "clientId" TEXT NOT NULL,
ADD CONSTRAINT "Software_Items_pkey" PRIMARY KEY ("id", "type", "softwareLabel", "clientId", "version");

-- AddForeignKey
ALTER TABLE "Software_Items" ADD CONSTRAINT "Software_Items_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;
