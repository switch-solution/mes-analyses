/*
  Warnings:

  - You are about to drop the column `typeDsn` on the `Project_Input` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project_Input" DROP COLUMN "typeDsn",
ADD COLUMN     "dsnType" TEXT;
