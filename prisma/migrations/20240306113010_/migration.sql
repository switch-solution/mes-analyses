/*
  Warnings:

  - You are about to drop the column `recordSlug` on the `Project_Value` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Project_Value` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Project_Value` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Project_Value_recordSlug_key";

-- AlterTable
ALTER TABLE "Project_Value" DROP COLUMN "recordSlug",
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_Value_slug_key" ON "Project_Value"("slug");
