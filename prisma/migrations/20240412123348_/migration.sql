/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Project_Salary` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Project_Salary_slug_key" ON "Project_Salary"("slug");
