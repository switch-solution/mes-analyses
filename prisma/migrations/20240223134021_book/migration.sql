/*
  Warnings:

  - You are about to drop the column `clientId` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "clientId",
ALTER COLUMN "createdBy" SET DEFAULT 'system';
