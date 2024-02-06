-- AlterTable
ALTER TABLE "Standard_Composant_Input" ADD COLUMN     "isCode" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDescription" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isLabel" BOOLEAN NOT NULL DEFAULT false;
