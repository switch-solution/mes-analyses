/*
  Warnings:

  - You are about to drop the `Project_Chat_Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project_Forum` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project_Chat_Message" DROP CONSTRAINT "Project_Chat_Message_clientId_softwareLabel_projectLabel_f_fkey";

-- DropForeignKey
ALTER TABLE "Project_Forum" DROP CONSTRAINT "Project_Forum_clientId_softwareLabel_projectLabel_fkey";

-- DropTable
DROP TABLE "Project_Chat_Message";

-- DropTable
DROP TABLE "Project_Forum";
