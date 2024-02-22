/*
  Warnings:

  - You are about to drop the column `isObligatory` on the `Standard_Component_Input` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Standard_Component_Input" DROP COLUMN "isObligatory",
ALTER COLUMN "required" DROP NOT NULL,
ALTER COLUMN "required" SET DEFAULT false,
ALTER COLUMN "readonly" DROP NOT NULL,
ALTER COLUMN "readonly" SET DEFAULT false,
ALTER COLUMN "multiple" SET DEFAULT false;
