/*
  Warnings:

  - You are about to drop the column `commment` on the `Project_Book_WorkFlow` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project_Book_WorkFlow" DROP COLUMN "commment",
ADD COLUMN     "comment" TEXT;
