/*
  Warnings:

  - The primary key for the `Client_Constant_Legal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Constant_Legal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Project_Constant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Software_Constant_Legal` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Client_Constant_Legal" DROP CONSTRAINT "Client_Constant_Legal_pkey",
ALTER COLUMN "dateStart" DROP DEFAULT,
ALTER COLUMN "dateStart" SET DATA TYPE TEXT,
ADD CONSTRAINT "Client_Constant_Legal_pkey" PRIMARY KEY ("id", "level", "dateStart", "clientId");

-- AlterTable
ALTER TABLE "Constant_Legal" DROP CONSTRAINT "Constant_Legal_pkey",
ALTER COLUMN "dateStart" DROP DEFAULT,
ALTER COLUMN "dateStart" SET DATA TYPE TEXT,
ADD CONSTRAINT "Constant_Legal_pkey" PRIMARY KEY ("id", "level", "dateStart");

-- AlterTable
ALTER TABLE "Project_Constant" DROP CONSTRAINT "Project_Constant_pkey",
ALTER COLUMN "dateStart" SET DATA TYPE TEXT,
ADD CONSTRAINT "Project_Constant_pkey" PRIMARY KEY ("code", "dateStart", "projectLabel", "projectSoftwareLabel", "clientId");

-- AlterTable
ALTER TABLE "Software_Constant_Legal" DROP CONSTRAINT "Software_Constant_Legal_pkey",
ALTER COLUMN "dateStart" DROP DEFAULT,
ALTER COLUMN "dateStart" SET DATA TYPE TEXT,
ADD CONSTRAINT "Software_Constant_Legal_pkey" PRIMARY KEY ("id", "level", "dateStart", "clientId", "softwareLabel");
