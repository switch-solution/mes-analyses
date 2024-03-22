/*
  Warnings:

  - Added the required column `type` to the `Client_Table_Column` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client_Table_Column" ADD COLUMN     "type" TEXT NOT NULL;
