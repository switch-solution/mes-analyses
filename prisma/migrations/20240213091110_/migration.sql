/*
  Warnings:

  - The primary key for the `UserOtherData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserOtherData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserOtherData" DROP CONSTRAINT "UserOtherData_pkey",
DROP COLUMN "id",
ALTER COLUMN "password" DROP NOT NULL,
ADD CONSTRAINT "UserOtherData_pkey" PRIMARY KEY ("userId");
