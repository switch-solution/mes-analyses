/*
  Warnings:

  - You are about to drop the `Software_Attachment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Software_Attachment" DROP CONSTRAINT "Software_Attachment_softwareLabel_clientId_fkey";

-- DropTable
DROP TABLE "Software_Attachment";
