/*
  Warnings:

  - You are about to drop the column `lastName` on the `Invitation` table. All the data in the column will be lost.
  - Added the required column `lastname` to the `Invitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Standard_Composant_Input` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Standard_Composant_Input` table without a default value. This is not possible if the table is not empty.
  - Added the required column `readonly` to the `Standard_Composant_Input` table without a default value. This is not possible if the table is not empty.
  - Added the required column `required` to the `Standard_Composant_Input` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Standard_Composant_Input` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invitation" DROP COLUMN "lastName",
ADD COLUMN     "lastname" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Standard_Composant_Input" ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "maxLength" INTEGER,
ADD COLUMN     "maxValue" INTEGER,
ADD COLUMN     "minLength" INTEGER,
ADD COLUMN     "minValue" INTEGER,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "readonly" BOOLEAN NOT NULL,
ADD COLUMN     "required" BOOLEAN NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
