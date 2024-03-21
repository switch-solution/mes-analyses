/*
  Warnings:

  - You are about to drop the column `response` on the `Project_Book_WorkFlow` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project_Book_WorkFlow" DROP COLUMN "response",
ADD COLUMN     "isValid" BOOLEAN NOT NULL DEFAULT false;
