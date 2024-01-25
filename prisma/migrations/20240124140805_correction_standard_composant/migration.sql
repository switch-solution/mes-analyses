/*
  Warnings:

  - You are about to drop the column `name` on the `Standard_Composant` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Standard_Composant` table. All the data in the column will be lost.
  - The primary key for the `Standard_Composant_Input` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Standard_Composant_Input` table. All the data in the column will be lost.
  - Added the required column `description` to the `Standard_Composant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Standard_Composant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Standard_Composant" DROP COLUMN "name",
DROP COLUMN "type",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Standard_Composant_Input" DROP CONSTRAINT "Standard_Composant_Input_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Standard_Composant_Input_pkey" PRIMARY KEY ("standard_ComposantId", "standard_InputName");
