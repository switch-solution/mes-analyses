/*
  Warnings:

  - The primary key for the `Standard_Input` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Standard_Input" DROP CONSTRAINT "Standard_Input_pkey",
ADD CONSTRAINT "Standard_Input_pkey" PRIMARY KEY ("type");
