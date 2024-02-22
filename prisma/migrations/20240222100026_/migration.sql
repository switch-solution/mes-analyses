/*
  Warnings:

  - You are about to drop the column `csv` on the `Standard_Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `excel` on the `Standard_Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `Standard_Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `pdf` on the `Standard_Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `txt` on the `Standard_Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `word` on the `Standard_Attachment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Standard_Attachment" DROP COLUMN "csv",
DROP COLUMN "excel",
DROP COLUMN "img",
DROP COLUMN "pdf",
DROP COLUMN "txt",
DROP COLUMN "word",
ADD COLUMN     "format" TEXT NOT NULL DEFAULT 'pdf';
