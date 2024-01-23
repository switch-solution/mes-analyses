/*
  Warnings:

  - You are about to drop the column `standard_InputId` on the `Standard_Composant_Input` table. All the data in the column will be lost.
  - The primary key for the `Standard_Input` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Standard_Input` table. All the data in the column will be lost.
  - You are about to drop the column `maxLength` on the `Standard_Input` table. All the data in the column will be lost.
  - You are about to drop the column `maxValue` on the `Standard_Input` table. All the data in the column will be lost.
  - You are about to drop the column `minLength` on the `Standard_Input` table. All the data in the column will be lost.
  - You are about to drop the column `minValue` on the `Standard_Input` table. All the data in the column will be lost.
  - You are about to drop the column `readonly` on the `Standard_Input` table. All the data in the column will be lost.
  - You are about to drop the column `required` on the `Standard_Input` table. All the data in the column will be lost.
  - You are about to drop the `Standard_Select_Option` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `standard_InputName` to the `Standard_Composant_Input` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Standard_Composant_Input" DROP CONSTRAINT "Standard_Composant_Input_standard_InputId_fkey";

-- DropForeignKey
ALTER TABLE "Standard_Select_Option" DROP CONSTRAINT "Standard_Select_Option_standardInputId_fkey";

-- AlterTable
ALTER TABLE "Standard_Composant_Input" DROP COLUMN "standard_InputId",
ADD COLUMN     "standard_InputName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Standard_Input" DROP CONSTRAINT "Standard_Input_pkey",
DROP COLUMN "id",
DROP COLUMN "maxLength",
DROP COLUMN "maxValue",
DROP COLUMN "minLength",
DROP COLUMN "minValue",
DROP COLUMN "readonly",
DROP COLUMN "required",
ADD CONSTRAINT "Standard_Input_pkey" PRIMARY KEY ("name");

-- DropTable
DROP TABLE "Standard_Select_Option";

-- AddForeignKey
ALTER TABLE "Standard_Composant_Input" ADD CONSTRAINT "Standard_Composant_Input_standard_InputName_fkey" FOREIGN KEY ("standard_InputName") REFERENCES "Standard_Input"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
