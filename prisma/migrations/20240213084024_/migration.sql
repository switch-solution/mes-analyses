/*
  Warnings:

  - The primary key for the `UserClient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserClient` table. All the data in the column will be lost.
  - You are about to drop the column `isFirstConnection` on the `UserOtherData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "isActivated" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UserClient" DROP CONSTRAINT "UserClient_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserClient_pkey" PRIMARY KEY ("userId", "clientId");

-- AlterTable
ALTER TABLE "UserOtherData" DROP COLUMN "isFirstConnection";
