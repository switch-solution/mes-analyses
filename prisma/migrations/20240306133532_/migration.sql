/*
  Warnings:

  - Added the required column `componentLabel` to the `Project_Value` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project_Value" ADD COLUMN     "componentLabel" TEXT NOT NULL;
