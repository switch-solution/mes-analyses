/*
  Warnings:

  - You are about to drop the column `isActivated` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "isActivated";

-- AlterTable
ALTER TABLE "UserClient" ADD COLUMN     "isActivated" BOOLEAN NOT NULL DEFAULT false;
