/*
  Warnings:

  - The `response` column on the `Project_Book_WorkFlow` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Project_Book_WorkFlow" DROP COLUMN "response",
ADD COLUMN     "response" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "deadline" SET DEFAULT '4000-01-01 00:00:00 +00:00',
ALTER COLUMN "createdBy" SET DEFAULT 'system';
