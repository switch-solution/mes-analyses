/*
  Warnings:

  - You are about to drop the column `status` on the `Project_Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project_Book" DROP COLUMN "status",
ADD COLUMN     "isHold" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isModifiedAfertValidation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isStarted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isValidate" BOOLEAN NOT NULL DEFAULT false;
