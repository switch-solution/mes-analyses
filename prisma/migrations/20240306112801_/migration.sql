/*
  Warnings:

  - A unique constraint covering the columns `[recordId]` on the table `Project_Value` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Project_Value_recordId_key" ON "Project_Value"("recordId");
