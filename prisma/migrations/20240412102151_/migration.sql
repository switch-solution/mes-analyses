/*
  Warnings:

  - You are about to drop the column `societyId` on the `Project_Absence` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project_Absence" DROP CONSTRAINT "Project_Absence_projectLabel_softwareLabel_clientId_societ_fkey";

-- AlterTable
ALTER TABLE "Project_Absence" DROP COLUMN "societyId";

-- CreateTable
CREATE TABLE "Project_Society_Absence" (
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "absenceId" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_Society_Absence_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","societyId","absenceId")
);

-- CreateTable
CREATE TABLE "Project_Absence_Archived" (
    "slug" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "dsnId" TEXT,
    "method" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "population" TEXT,
    "description" TEXT,
    "clientId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "isSocialSecurity" BOOLEAN NOT NULL DEFAULT false,
    "softwareLabel" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'analyse',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "version" INTEGER NOT NULL,

    CONSTRAINT "Project_Absence_Archived_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel","version")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_Absence_Archived_slug_key" ON "Project_Absence_Archived"("slug");

-- AddForeignKey
ALTER TABLE "Project_Society_Absence" ADD CONSTRAINT "Society" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Society"("clientId", "softwareLabel", "projectLabel", "siren") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Society_Absence" ADD CONSTRAINT "Absence" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "absenceId") REFERENCES "Project_Absence"("clientId", "softwareLabel", "projectLabel", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Absence_Archived" ADD CONSTRAINT "Project_Absence_Archived_clientId_softwareLabel_projectLab_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "id") REFERENCES "Project_Absence"("clientId", "softwareLabel", "projectLabel", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
