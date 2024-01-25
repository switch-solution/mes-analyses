/*
  Warnings:

  - Added the required column `status` to the `Standard_Composant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Standard_Composant" ADD COLUMN     "status" TEXT NOT NULL;
