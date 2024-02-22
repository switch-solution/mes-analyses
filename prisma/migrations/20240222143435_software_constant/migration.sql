/*
  Warnings:

  - The primary key for the `Constant_Legal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clientId` on the `Constant_Legal` table. All the data in the column will be lost.
  - You are about to drop the column `isEditable` on the `Constant_Legal` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `Constant_Legal` table. All the data in the column will be lost.
  - You are about to drop the column `softwareLabel` on the `Constant_Legal` table. All the data in the column will be lost.
  - The primary key for the `Project_Constant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `level` on the `Project_Constant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Constant_Legal" DROP CONSTRAINT "Constant_Legal_softwareLabel_clientId_fkey";

-- AlterTable
ALTER TABLE "Constant_Legal" DROP CONSTRAINT "Constant_Legal_pkey",
DROP COLUMN "clientId",
DROP COLUMN "isEditable",
DROP COLUMN "level",
DROP COLUMN "softwareLabel",
ADD CONSTRAINT "Constant_Legal_pkey" PRIMARY KEY ("code", "dateStart");

-- AlterTable
ALTER TABLE "Project_Constant" DROP CONSTRAINT "Project_Constant_pkey",
DROP COLUMN "level",
ADD CONSTRAINT "Project_Constant_pkey" PRIMARY KEY ("code", "dateStart", "dateEnd", "projectLabel", "projectSoftwareLabel", "clientId");

-- CreateTable
CREATE TABLE "Software_Constant" (
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "idccCode" TEXT NOT NULL DEFAULT '9999',
    "value" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Software_Constant_pkey" PRIMARY KEY ("code","dateStart","softwareLabel","clientId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Software_Constant_slug_key" ON "Software_Constant"("slug");

-- AddForeignKey
ALTER TABLE "Software_Constant" ADD CONSTRAINT "Software_Constant_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Constant" ADD CONSTRAINT "Software_Constant_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;
