/*
  Warnings:

  - You are about to drop the column `response` on the `Validation` table. All the data in the column will be lost.
  - Added the required column `validation` to the `Validation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Validation" DROP COLUMN "response",
ADD COLUMN     "comment" TEXT,
ADD COLUMN     "validation" BOOLEAN NOT NULL;
