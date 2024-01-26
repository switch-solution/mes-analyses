/*
  Warnings:

  - Added the required column `order` to the `Standard_Composant_Input` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Standard_Composant_Input" ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "placeholder" TEXT;
