/*
  Warnings:

  - The primary key for the `Project_Attachment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Project_Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Project_Attachment` table. All the data in the column will be lost.
  - Made the column `clientId` on table `Project_Attachment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectLabel` on table `Project_Attachment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectSoftwareLabel` on table `Project_Attachment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Project_Attachment" DROP CONSTRAINT "Project_Attachment_clientId_projectLabel_projectSoftwareLa_fkey";

-- AlterTable
ALTER TABLE "Project_Attachment" DROP CONSTRAINT "Project_Attachment_pkey",
DROP COLUMN "id",
DROP COLUMN "projectId",
ALTER COLUMN "clientId" SET NOT NULL,
ALTER COLUMN "projectLabel" SET NOT NULL,
ALTER COLUMN "projectSoftwareLabel" SET NOT NULL,
ADD CONSTRAINT "Project_Attachment_pkey" PRIMARY KEY ("label", "projectLabel", "clientId");

-- AddForeignKey
ALTER TABLE "Project_Attachment" ADD CONSTRAINT "Project_Attachment_clientId_projectLabel_projectSoftwareLa_fkey" FOREIGN KEY ("clientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;
