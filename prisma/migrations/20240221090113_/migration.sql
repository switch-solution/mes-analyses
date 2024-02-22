/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Standard_Component_Input` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Standard_Component_Input` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Standard_Component_Input" ADD COLUMN     "id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Standard_Component_Input_id_key" ON "Standard_Component_Input"("id");
