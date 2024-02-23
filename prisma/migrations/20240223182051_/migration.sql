/*
  Warnings:

  - You are about to drop the column `slug` on the `Project_Value` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Project_Value_slug_key";

-- AlterTable
ALTER TABLE "Project_Value" DROP COLUMN "slug";
