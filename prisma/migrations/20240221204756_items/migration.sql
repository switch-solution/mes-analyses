/*
  Warnings:

  - Added the required column `employeeContribution` to the `SoftwareItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employerContribution` to the `SoftwareItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SoftwareItems" ADD COLUMN     "employeeContribution" TEXT NOT NULL,
ADD COLUMN     "employerContribution" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Project_Items" (
    "id" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "projectSoftwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "idccCode" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "base" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "employeeContribution" TEXT NOT NULL,
    "employerContribution" TEXT NOT NULL,

    CONSTRAINT "Project_Items_pkey" PRIMARY KEY ("id","type","projectLabel","projectSoftwareLabel","clientId","version")
);

-- AddForeignKey
ALTER TABLE "Project_Items" ADD CONSTRAINT "Project_Items_projectLabel_projectSoftwareLabel_clientId_fkey" FOREIGN KEY ("projectLabel", "projectSoftwareLabel", "clientId") REFERENCES "Project"("label", "softwareLabel", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Items" ADD CONSTRAINT "Project_Items_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Constant" ADD CONSTRAINT "Project_Constant_clientId_projectLabel_projectSoftwareLabe_fkey" FOREIGN KEY ("clientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;
