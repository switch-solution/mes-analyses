/*
  Warnings:

  - The primary key for the `Standard_Attachment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Standard_Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `softwareClientId` on the `Standard_Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `softwareId` on the `Standard_Attachment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Standard_Attachment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientId` to the `Standard_Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Standard_Attachment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Standard_Attachment" DROP CONSTRAINT "Standard_Attachment_softwareLabel_softwareClientId_fkey";

-- AlterTable
ALTER TABLE "Standard_Attachment" DROP CONSTRAINT "Standard_Attachment_pkey",
DROP COLUMN "id",
DROP COLUMN "softwareClientId",
DROP COLUMN "softwareId",
ADD COLUMN     "clientId" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD CONSTRAINT "Standard_Attachment_pkey" PRIMARY KEY ("label", "softwareLabel", "clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Standard_Attachment_slug_key" ON "Standard_Attachment"("slug");

-- AddForeignKey
ALTER TABLE "Standard_Attachment" ADD CONSTRAINT "Standard_Attachment_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;
