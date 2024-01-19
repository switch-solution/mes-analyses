/*
  Warnings:

  - You are about to drop the column `username` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "username";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT;
