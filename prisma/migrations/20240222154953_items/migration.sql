/*
  Warnings:

  - The primary key for the `Software_Items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `version` on the `Software_Items` table. All the data in the column will be lost.
  - Added the required column `dateStart` to the `Software_Items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Software_Items" DROP CONSTRAINT "Software_Items_pkey",
DROP COLUMN "version",
ADD COLUMN     "dateStart" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "base" DROP NOT NULL,
ALTER COLUMN "rate" DROP NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "employeeContribution" DROP NOT NULL,
ALTER COLUMN "employerContribution" DROP NOT NULL,
ADD CONSTRAINT "Software_Items_pkey" PRIMARY KEY ("id", "type", "softwareLabel", "clientId", "dateStart");
