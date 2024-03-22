/*
  Warnings:

  - The primary key for the `Constant_Legal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isDuplicate` on the `Constant_Legal` table. All the data in the column will be lost.
  - The primary key for the `Software_Constant_Legal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isDuplicate` on the `Software_Constant_Legal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "level" TEXT NOT NULL DEFAULT 'Standard';

-- AlterTable
ALTER TABLE "Constant_Legal" DROP CONSTRAINT "Constant_Legal_pkey",
DROP COLUMN "isDuplicate",
ALTER COLUMN "level" SET DEFAULT 'Standard',
ADD CONSTRAINT "Constant_Legal_pkey" PRIMARY KEY ("id", "level", "dateStart");

-- AlterTable
ALTER TABLE "Project_Constant" ADD COLUMN     "level" TEXT NOT NULL DEFAULT 'Projet';

-- AlterTable
ALTER TABLE "SoftwareChapterSoftwareComponent" ADD COLUMN     "level" TEXT NOT NULL DEFAULT 'Logiciel';

-- AlterTable
ALTER TABLE "Software_Chapter" ADD COLUMN     "level" TEXT NOT NULL DEFAULT 'Logiciel';

-- AlterTable
ALTER TABLE "Software_Component" ADD COLUMN     "level" TEXT NOT NULL DEFAULT 'Logiciel';

-- AlterTable
ALTER TABLE "Software_Component_Image" ADD COLUMN     "level" TEXT NOT NULL DEFAULT 'Logiciel';

-- AlterTable
ALTER TABLE "Software_Component_Input" ADD COLUMN     "level" TEXT NOT NULL DEFAULT 'Logiciel';

-- AlterTable
ALTER TABLE "Software_Component_Select_Option" ADD COLUMN     "level" TEXT NOT NULL DEFAULT 'Logiciel';

-- AlterTable
ALTER TABLE "Software_Component_TextArea" ADD COLUMN     "level" TEXT NOT NULL DEFAULT 'Logiciel';

-- AlterTable
ALTER TABLE "Software_Constant_Legal" DROP CONSTRAINT "Software_Constant_Legal_pkey",
DROP COLUMN "isDuplicate",
ALTER COLUMN "level" SET DEFAULT 'Logiciel',
ADD CONSTRAINT "Software_Constant_Legal_pkey" PRIMARY KEY ("id", "level", "dateStart", "clientId", "softwareLabel");

-- AlterTable
ALTER TABLE "Table" ADD COLUMN     "level" TEXT NOT NULL DEFAULT 'Standard';

-- AlterTable
ALTER TABLE "Table_Column" ADD COLUMN     "level" TEXT NOT NULL DEFAULT 'Standard';

-- AlterTable
ALTER TABLE "Table_Column_Value" ADD COLUMN     "level" TEXT NOT NULL DEFAULT 'Standard';

-- CreateTable
CREATE TABLE "Client_API" (
    "clientId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "apiSecret" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Client_API_pkey" PRIMARY KEY ("clientId","label")
);

-- CreateTable
CREATE TABLE "Client_Book" (
    "level" TEXT NOT NULL DEFAULT 'Client',
    "clientId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "bookSoftwareLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Client_Book_pkey" PRIMARY KEY ("label","clientId")
);

-- CreateTable
CREATE TABLE "Client_Constant_Legal" (
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'Client',
    "label" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "description" TEXT,
    "idccCode" TEXT NOT NULL DEFAULT '9999',
    "value" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "softwareLabel" TEXT,
    "projectLabel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "sourceId" TEXT,

    CONSTRAINT "Client_Constant_Legal_pkey" PRIMARY KEY ("id","level","dateStart","clientId")
);

-- CreateTable
CREATE TABLE "Client_Task" (
    "label" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "isSwitch" BOOLEAN NOT NULL DEFAULT false,
    "isUpload" BOOLEAN NOT NULL DEFAULT false,
    "accept" TEXT,
    "description" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'actif',
    "bookLabel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "owner" TEXT NOT NULL,
    "message" TEXT,
    "dateStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_Task_pkey" PRIMARY KEY ("label","clientId")
);

-- CreateTable
CREATE TABLE "Client_Table" (
    "level" TEXT NOT NULL DEFAULT 'Client',
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Client_Table_pkey" PRIMARY KEY ("id","clientId")
);

-- CreateTable
CREATE TABLE "Software_Table" (
    "level" TEXT NOT NULL DEFAULT 'Logiciel',
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Software_Table_pkey" PRIMARY KEY ("id","clientId","softwareLabel")
);

-- CreateTable
CREATE TABLE "Client_Table_Column" (
    "level" TEXT NOT NULL DEFAULT 'Client',
    "id" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Client_Table_Column_pkey" PRIMARY KEY ("id","tableId","clientId")
);

-- CreateTable
CREATE TABLE "Client_Table_Column_Value" (
    "level" TEXT NOT NULL DEFAULT 'Client',
    "id" TEXT NOT NULL,
    "columnId" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "row" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Client_Table_Column_Value_pkey" PRIMARY KEY ("id","tableId","columnId","clientId")
);

-- CreateTable
CREATE TABLE "Classification" (
    "level" TEXT NOT NULL DEFAULT 'Standard',
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "idIdcc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Classification_pkey" PRIMARY KEY ("id","idIdcc","type")
);

-- CreateTable
CREATE TABLE "Client_Classification" (
    "level" TEXT NOT NULL DEFAULT 'Client',
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "idIdcc" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Client_Classification_pkey" PRIMARY KEY ("id","idIdcc","type","clientId")
);

-- CreateTable
CREATE TABLE "Software_Classification" (
    "level" TEXT NOT NULL DEFAULT 'Logiciel',
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "idIdcc" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Software_Classification_pkey" PRIMARY KEY ("id","idIdcc","type","clientId","softwareLabel")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_Constant_Legal_slug_key" ON "Client_Constant_Legal"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Client_Task_slug_key" ON "Client_Task"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Client_Table_slug_key" ON "Client_Table"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Table_slug_key" ON "Software_Table"("slug");

-- AddForeignKey
ALTER TABLE "Client_API" ADD CONSTRAINT "Client_API_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Book" ADD CONSTRAINT "Client_Book_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Constant_Legal" ADD CONSTRAINT "Client_Constant_Legal_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Constant_Legal" ADD CONSTRAINT "Client_Constant_Legal_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Task" ADD CONSTRAINT "Client_Task_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Table" ADD CONSTRAINT "Client_Table_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Table" ADD CONSTRAINT "Software_Table_clientId_softwareLabel_fkey" FOREIGN KEY ("clientId", "softwareLabel") REFERENCES "Software"("clientId", "label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Table_Column" ADD CONSTRAINT "Client_Table_Column_tableId_clientId_fkey" FOREIGN KEY ("tableId", "clientId") REFERENCES "Client_Table"("id", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Table_Column_Value" ADD CONSTRAINT "Client_Table_Column_Value_columnId_tableId_clientId_fkey" FOREIGN KEY ("columnId", "tableId", "clientId") REFERENCES "Client_Table_Column"("id", "tableId", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classification" ADD CONSTRAINT "Classification_idIdcc_fkey" FOREIGN KEY ("idIdcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Classification" ADD CONSTRAINT "Client_Classification_idIdcc_fkey" FOREIGN KEY ("idIdcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Classification" ADD CONSTRAINT "Client_Classification_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Classification" ADD CONSTRAINT "Software_Classification_idIdcc_fkey" FOREIGN KEY ("idIdcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Classification" ADD CONSTRAINT "Software_Classification_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;
