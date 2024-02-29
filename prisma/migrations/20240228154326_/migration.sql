/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Project_Task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Project_Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project_Task" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_Task_slug_key" ON "Project_Task"("slug");
