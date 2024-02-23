/*
  Warnings:

  - You are about to drop the column `status` on the `Project_Attachment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project_Attachment" DROP COLUMN "status",
ADD COLUMN     "isDelivered" BOOLEAN NOT NULL DEFAULT false;
