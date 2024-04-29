/*
  Warnings:

  - You are about to drop the column `label` on the `Project_Attachment` table. All the data in the column will be lost.
  - Added the required column `pathname` to the `Project_Attachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project_Attachment" DROP COLUMN "label",
ADD COLUMN     "pathname" TEXT NOT NULL,
ALTER COLUMN "contentType" DROP NOT NULL;
