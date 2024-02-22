/*
  Warnings:

  - You are about to drop the column `slug` on the `Standard_Component_Input` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Standard_Component_Input_slug_key";

-- AlterTable
ALTER TABLE "Standard_Component_Input" DROP COLUMN "slug";
