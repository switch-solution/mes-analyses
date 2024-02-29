/*
  Warnings:

  - The primary key for the `Software_Task` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Software_Task" DROP CONSTRAINT "Software_Task_pkey",
ADD CONSTRAINT "Software_Task_pkey" PRIMARY KEY ("label", "clientId", "softwareLabel");
