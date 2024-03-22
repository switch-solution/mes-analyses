/*
  Warnings:

  - You are about to drop the column `software_Table_AgeClientId` on the `Client_Table_Age_Row` table. All the data in the column will be lost.
  - You are about to drop the column `software_Table_AgeId` on the `Client_Table_Age_Row` table. All the data in the column will be lost.
  - You are about to drop the column `software_Table_AgeIdcc` on the `Client_Table_Age_Row` table. All the data in the column will be lost.
  - You are about to drop the column `software_Table_AgeSoftwareLabel` on the `Client_Table_Age_Row` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Client_Table_Age_Row" DROP CONSTRAINT "Client_Table_Age_Row_software_Table_AgeId_software_Table_A_fkey";

-- AlterTable
ALTER TABLE "Client_Table_Age_Row" DROP COLUMN "software_Table_AgeClientId",
DROP COLUMN "software_Table_AgeId",
DROP COLUMN "software_Table_AgeIdcc",
DROP COLUMN "software_Table_AgeSoftwareLabel";
