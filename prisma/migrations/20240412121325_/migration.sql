/*
  Warnings:

  - You are about to drop the `Project_Items` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project_Items" DROP CONSTRAINT "Project_Items_idccCode_fkey";

-- DropForeignKey
ALTER TABLE "Project_Items" DROP CONSTRAINT "Project_Items_projectLabel_projectSoftwareLabel_clientId_fkey";

-- DropTable
DROP TABLE "Project_Items";

-- CreateTable
CREATE TABLE "Project_Salary" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "method" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "baseType" TEXT NOT NULL,
    "base" TEXT NOT NULL,
    "rateType" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'analyse',
    "amoutType" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Project_Salary_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel")
);

-- CreateTable
CREATE TABLE "Project_Salary_Archived" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "method" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "baseType" TEXT NOT NULL,
    "base" TEXT NOT NULL,
    "rateType" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "rate" TEXT NOT NULL,
    "amoutType" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL,
    "isPending" BOOLEAN NOT NULL,
    "isOpen" BOOLEAN NOT NULL,

    CONSTRAINT "Project_Salary_Archived_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel","version")
);

-- CreateTable
CREATE TABLE "Project_Contribution" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "baseType" TEXT NOT NULL,
    "base" TEXT NOT NULL,
    "employeeType" TEXT NOT NULL,
    "employee" TEXT NOT NULL,
    "employType" TEXT NOT NULL,
    "employ" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "amoutType" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Contribution_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel")
);

-- CreateTable
CREATE TABLE "Project_Contribution_Archived" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL,
    "baseType" TEXT NOT NULL,
    "base" TEXT NOT NULL,
    "employeeType" TEXT NOT NULL,
    "employee" TEXT NOT NULL,
    "employType" TEXT NOT NULL,
    "employ" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "amoutType" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL,
    "isPending" BOOLEAN NOT NULL,
    "isOpen" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_Contribution_Archived_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel")
);

-- CreateTable
CREATE TABLE "Project_Society_Contribution" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "contributionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Society_Contribution_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","societyId","contributionId")
);

-- CreateTable
CREATE TABLE "Project_Society_Salary" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "salaryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Society_Salary_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","societyId","salaryId")
);

-- AddForeignKey
ALTER TABLE "Project_Salary" ADD CONSTRAINT "Project_Salary_clientId_softwareLabel_projectLabel_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel") REFERENCES "Project"("clientId", "softwareLabel", "label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Salary_Archived" ADD CONSTRAINT "Project_Salary_Archived_id_clientId_softwareLabel_projectL_fkey" FOREIGN KEY ("id", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Salary"("id", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Contribution" ADD CONSTRAINT "Project_Contribution_clientId_softwareLabel_projectLabel_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel") REFERENCES "Project"("clientId", "softwareLabel", "label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Contribution_Archived" ADD CONSTRAINT "Project_Contribution_Archived_id_clientId_softwareLabel_pr_fkey" FOREIGN KEY ("id", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Contribution"("id", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Society_Contribution" ADD CONSTRAINT "Society" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Society"("clientId", "softwareLabel", "projectLabel", "siren") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Society_Contribution" ADD CONSTRAINT "Contribution" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "contributionId") REFERENCES "Project_Contribution"("clientId", "softwareLabel", "projectLabel", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Society_Salary" ADD CONSTRAINT "Society" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Society"("clientId", "softwareLabel", "projectLabel", "siren") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Society_Salary" ADD CONSTRAINT "Salary" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "salaryId") REFERENCES "Project_Salary"("clientId", "softwareLabel", "projectLabel", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
