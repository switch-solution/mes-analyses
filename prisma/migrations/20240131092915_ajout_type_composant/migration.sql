/*
  Warnings:

  - Added the required column `type` to the `Composant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Standard_Composant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Composant" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Standard_Composant" ADD COLUMN     "type" TEXT NOT NULL;
