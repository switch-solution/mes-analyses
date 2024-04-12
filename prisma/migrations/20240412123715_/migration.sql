/*
  Warnings:

  - You are about to drop the column `method` on the `Project_Salary` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project_Salary" DROP COLUMN "method",
ALTER COLUMN "baseType" DROP NOT NULL,
ALTER COLUMN "base" DROP NOT NULL,
ALTER COLUMN "rateType" DROP NOT NULL,
ALTER COLUMN "rate" DROP NOT NULL,
ALTER COLUMN "amoutType" DROP NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL;
