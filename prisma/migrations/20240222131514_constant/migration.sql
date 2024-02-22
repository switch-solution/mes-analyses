/*
  Warnings:

  - The primary key for the `Constant_Legal` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Constant_Legal" DROP CONSTRAINT "Constant_Legal_pkey",
ADD CONSTRAINT "Constant_Legal_pkey" PRIMARY KEY ("code", "level", "dateStart", "dateEnd", "softwareLabel", "clientId");
