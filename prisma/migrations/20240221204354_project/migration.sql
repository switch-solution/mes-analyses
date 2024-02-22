/*
  Warnings:

  - You are about to drop the `ProjectConstant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectConstant" DROP CONSTRAINT "ProjectConstant_idccCode_fkey";

-- DropTable
DROP TABLE "ProjectConstant";

-- CreateTable
CREATE TABLE "Project_Constant" (
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

    CONSTRAINT "Project_Constant_pkey" PRIMARY KEY ("code","level","dateStart","dateEnd","projectLabel","projectSoftwareLabel","clientId")
);

-- AddForeignKey
ALTER TABLE "Project_Constant" ADD CONSTRAINT "Project_Constant_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
