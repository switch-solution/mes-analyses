/*
  Warnings:

  - The primary key for the `Project_Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `projectSoftwareLabel` on the `Project_Task` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Project_Task` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Project_Task` table. All the data in the column will be lost.
  - Added the required column `description` to the `Project_Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `Project_Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `Project_Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `softwareLabel` to the `Project_Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project_Task" DROP CONSTRAINT "Project_Task_clientId_projectLabel_projectSoftwareLabel_fkey";

-- DropForeignKey
ALTER TABLE "Project_Task" DROP CONSTRAINT "Project_Task_userId_fkey";

-- AlterTable
ALTER TABLE "Project_Task" DROP CONSTRAINT "Project_Task_pkey",
DROP COLUMN "projectSoftwareLabel",
DROP COLUMN "status",
DROP COLUMN "userId",
ADD COLUMN     "accept" TEXT,
ADD COLUMN     "bookLabel" TEXT,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "isSwitch" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isUpload" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "level" TEXT NOT NULL,
ADD COLUMN     "owner" TEXT NOT NULL,
ADD COLUMN     "softwareLabel" TEXT NOT NULL,
ALTER COLUMN "message" DROP NOT NULL,
ALTER COLUMN "createdBy" SET DEFAULT 'System',
ALTER COLUMN "dateStart" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Project_Task_pkey" PRIMARY KEY ("label", "clientId", "projectLabel", "softwareLabel", "owner");

-- AddForeignKey
ALTER TABLE "Project_Task" ADD CONSTRAINT "Project_Task_clientId_projectLabel_softwareLabel_fkey" FOREIGN KEY ("clientId", "projectLabel", "softwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Task" ADD CONSTRAINT "Project_Task_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
