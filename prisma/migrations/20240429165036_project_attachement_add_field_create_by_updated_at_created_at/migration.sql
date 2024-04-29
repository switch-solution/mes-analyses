/*
  Warnings:

  - Added the required column `createdBy` to the `Project_Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Project_Attachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project_Attachment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
