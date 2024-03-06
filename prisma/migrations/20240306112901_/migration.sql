/*
  Warnings:

  - The primary key for the `Project_Value` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `recordId` on the `Project_Value` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[recordSlug]` on the table `Project_Value` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recordSlug` to the `Project_Value` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Project_Value_recordId_key";

-- AlterTable
ALTER TABLE "Project_Value" DROP CONSTRAINT "Project_Value_pkey",
DROP COLUMN "recordId",
ADD COLUMN     "recordSlug" TEXT NOT NULL,
ADD CONSTRAINT "Project_Value_pkey" PRIMARY KEY ("clientId", "bookLabel", "inputLabel", "projectLabel", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3", "version", "projectSoftwareLabel");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Value_recordSlug_key" ON "Project_Value"("recordSlug");
