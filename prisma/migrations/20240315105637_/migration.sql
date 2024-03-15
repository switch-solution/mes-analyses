/*
  Warnings:

  - The primary key for the `Project_DSN_Data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `siren` on the `Project_DSN_Data` table. All the data in the column will be lost.
  - Added the required column `siret` to the `Project_DSN_Data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project_DSN_Data" DROP CONSTRAINT "Project_DSN_Data_pkey",
DROP COLUMN "siren",
ADD COLUMN     "siret" TEXT NOT NULL,
ADD CONSTRAINT "Project_DSN_Data_pkey" PRIMARY KEY ("projectLabel", "projectSoftwareLabel", "clientId", "date", "order", "id", "siret");
