/*
  Warnings:

  - Added the required column `type` to the `Project_Free_Zone` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project_Free_Zone" ADD COLUMN     "type" TEXT NOT NULL;
