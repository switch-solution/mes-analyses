-- CreateTable
CREATE TABLE "ProjectConstant" (
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "idccCode" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "projectSoftwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "ProjectConstant_pkey" PRIMARY KEY ("code","level","dateStart","dateEnd","projectLabel","projectSoftwareLabel","clientId")
);

-- AddForeignKey
ALTER TABLE "ProjectConstant" ADD CONSTRAINT "ProjectConstant_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
