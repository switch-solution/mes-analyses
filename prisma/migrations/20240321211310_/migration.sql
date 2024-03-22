/*
  Warnings:

  - You are about to drop the column `bookLabel` on the `Software_Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Software_Task" DROP CONSTRAINT "Software_Task_bookLabel_softwareLabel_clientId_fkey";

-- AlterTable
ALTER TABLE "Software_Task" DROP COLUMN "bookLabel";
