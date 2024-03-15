/*
  Warnings:

  - You are about to drop the `DSN_Data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DSN_Data" DROP CONSTRAINT "DSN_Data_clientId_projectLabel_projectSoftwareLabel_fkey";

-- DropTable
DROP TABLE "DSN_Data";

-- CreateTable
CREATE TABLE "Project_DSN_Data" (
    "projectLabel" TEXT NOT NULL,
    "projectSoftwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_DSN_Data_pkey" PRIMARY KEY ("projectLabel","projectSoftwareLabel","clientId","id")
);

-- AddForeignKey
ALTER TABLE "Project_DSN_Data" ADD CONSTRAINT "Project_DSN_Data_clientId_projectLabel_projectSoftwareLabe_fkey" FOREIGN KEY ("clientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;
