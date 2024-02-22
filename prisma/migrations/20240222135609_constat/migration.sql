/*
  Warnings:

  - The primary key for the `Constant_Legal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dateEnd` on the `Constant_Legal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Constant_Legal" DROP CONSTRAINT "Constant_Legal_pkey",
DROP COLUMN "dateEnd",
ALTER COLUMN "dateStart" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Constant_Legal_pkey" PRIMARY KEY ("code", "level", "dateStart", "softwareLabel", "clientId");
