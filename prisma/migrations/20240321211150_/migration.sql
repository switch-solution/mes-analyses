/*
  Warnings:

  - You are about to drop the column `level` on the `Software_Task` table. All the data in the column will be lost.
  - Made the column `accept` on table `Software_Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bookLabel` on table `Software_Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Software_Task" DROP COLUMN "level",
ADD COLUMN     "multiple" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "accept" SET NOT NULL,
ALTER COLUMN "bookLabel" SET NOT NULL;
