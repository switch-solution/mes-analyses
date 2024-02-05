/*
  Warnings:

  - You are about to drop the column `metadata` on the `Logger` table. All the data in the column will be lost.
  - Added the required column `scope` to the `Logger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Logger" DROP COLUMN "metadata",
ADD COLUMN     "scope" TEXT NOT NULL;
