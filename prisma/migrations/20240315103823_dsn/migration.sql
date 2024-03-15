/*
  Warnings:

  - The primary key for the `Project_DSN_Data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `date` to the `Project_DSN_Data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siren` to the `Project_DSN_Data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project_DSN_Data" DROP CONSTRAINT "Project_DSN_Data_pkey",
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "siren" TEXT NOT NULL,
ADD CONSTRAINT "Project_DSN_Data_pkey" PRIMARY KEY ("projectLabel", "projectSoftwareLabel", "clientId", "date", "siren");
