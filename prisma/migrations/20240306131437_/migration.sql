/*
  Warnings:

  - The primary key for the `Project_Value` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `recordId` to the `Project_Value` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project_Value" DROP CONSTRAINT "Project_Value_pkey",
ADD COLUMN     "recordId" TEXT NOT NULL,
ADD CONSTRAINT "Project_Value_pkey" PRIMARY KEY ("clientId", "bookLabel", "inputLabel", "projectLabel", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3", "version", "projectSoftwareLabel", "recordId");
