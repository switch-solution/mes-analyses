/*
  Warnings:

  - You are about to drop the `Project_Book_Validation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project_Book_Validation" DROP CONSTRAINT "Project_Book_Validation_bookLabel_clientId_projectLabel_pr_fkey";

-- DropForeignKey
ALTER TABLE "Project_Book_Validation" DROP CONSTRAINT "Project_Book_Validation_userId_fkey";

-- DropTable
DROP TABLE "Project_Book_Validation";
