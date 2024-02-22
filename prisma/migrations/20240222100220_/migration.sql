/*
  Warnings:

  - You are about to drop the column `format` on the `Standard_Attachment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Standard_Attachment" DROP COLUMN "format",
ADD COLUMN     "accept" TEXT NOT NULL DEFAULT 'pdf';
