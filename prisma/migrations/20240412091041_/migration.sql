/*
  Warnings:

  - The primary key for the `Project_Society_Free_Zone` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idZone` on the `Project_Society_Free_Zone` table. All the data in the column will be lost.
  - Added the required column `zoneId` to the `Project_Society_Free_Zone` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project_Society_Free_Zone" DROP CONSTRAINT "Project_Society_Free_Zone_idZone_typeZone_clientId_softwar_fkey";

-- AlterTable
ALTER TABLE "Project_Society_Free_Zone" DROP CONSTRAINT "Project_Society_Free_Zone_pkey",
DROP COLUMN "idZone",
ADD COLUMN     "zoneId" TEXT NOT NULL,
ADD CONSTRAINT "Project_Society_Free_Zone_pkey" PRIMARY KEY ("zoneId", "typeZone", "clientId", "softwareLabel", "projectLabel", "societyId");

-- AddForeignKey
ALTER TABLE "Project_Society_Free_Zone" ADD CONSTRAINT "Project_Society_Free_Zone_zoneId_typeZone_clientId_softwar_fkey" FOREIGN KEY ("zoneId", "typeZone", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Free_Zone"("id", "type", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;
