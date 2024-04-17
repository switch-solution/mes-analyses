/*
  Warnings:

  - Added the required column `subject` to the `Project_Forum` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project_Forum" ADD COLUMN     "subject" TEXT NOT NULL;
