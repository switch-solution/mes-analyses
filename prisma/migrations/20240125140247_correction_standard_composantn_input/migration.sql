/*
  Warnings:

  - The primary key for the `Standard_Composant_Input` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `Standard_Composant_Input` table. All the data in the column will be lost.
  - You are about to drop the column `standard_InputName` on the `Standard_Composant_Input` table. All the data in the column will be lost.
  - The required column `id` was added to the `Standard_Composant_Input` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Standard_Composant_Input" DROP CONSTRAINT "Standard_Composant_Input_standard_InputName_fkey";

-- AlterTable
ALTER TABLE "Standard_Composant_Input" DROP CONSTRAINT "Standard_Composant_Input_pkey",
DROP COLUMN "name",
DROP COLUMN "standard_InputName",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Standard_Composant_Input_pkey" PRIMARY KEY ("id");
