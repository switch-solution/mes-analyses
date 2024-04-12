/*
  Warnings:

  - The primary key for the `Project_Free_Zone` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `type` on the `Project_Free_Zone` table. All the data in the column will be lost.
  - The primary key for the `Project_Society_Free_Zone` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `typeZone` on the `Project_Society_Free_Zone` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project_Free_Zone_Archived" DROP CONSTRAINT "Project_Free_Zone_Archived_id_type_clientId_softwareLabel__fkey";

-- DropForeignKey
ALTER TABLE "Project_Society_Free_Zone" DROP CONSTRAINT "Project_Society_Free_Zone_zoneId_typeZone_clientId_softwar_fkey";

-- AlterTable
ALTER TABLE "Project_Free_Zone" DROP CONSTRAINT "Project_Free_Zone_pkey",
DROP COLUMN "type",
ADD CONSTRAINT "Project_Free_Zone_pkey" PRIMARY KEY ("id", "clientId", "softwareLabel", "projectLabel");

-- AlterTable
ALTER TABLE "Project_Society_Free_Zone" DROP CONSTRAINT "Project_Society_Free_Zone_pkey",
DROP COLUMN "typeZone",
ADD CONSTRAINT "Project_Society_Free_Zone_pkey" PRIMARY KEY ("zoneId", "clientId", "softwareLabel", "projectLabel", "societyId");

-- AddForeignKey
ALTER TABLE "Project_Free_Zone_Archived" ADD CONSTRAINT "Project_Free_Zone_Archived_id_clientId_softwareLabel_proje_fkey" FOREIGN KEY ("id", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Free_Zone"("id", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Society_Free_Zone" ADD CONSTRAINT "Project_Society_Free_Zone_zoneId_clientId_softwareLabel_pr_fkey" FOREIGN KEY ("zoneId", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Free_Zone"("id", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;
