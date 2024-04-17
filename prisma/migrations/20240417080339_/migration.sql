/*
  Warnings:

  - Added the required column `description` to the `Project_Approve` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theme` to the `Project_Approve` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project_Approve" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "theme" TEXT NOT NULL;
