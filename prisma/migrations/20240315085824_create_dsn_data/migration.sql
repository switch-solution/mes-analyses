-- CreateTable
CREATE TABLE "DSN_Data" (
    "projectLabel" TEXT NOT NULL,
    "projectSoftwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "DSN_Data_pkey" PRIMARY KEY ("projectLabel","projectSoftwareLabel","clientId","id")
);

-- AddForeignKey
ALTER TABLE "DSN_Data" ADD CONSTRAINT "DSN_Data_clientId_projectLabel_projectSoftwareLabel_fkey" FOREIGN KEY ("clientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;
