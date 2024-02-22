/*
  Warnings:

  - The primary key for the `Constant_Legal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `code` on the `Constant_Legal` table. All the data in the column will be lost.
  - The primary key for the `Software_Constant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `code` on the `Software_Constant` table. All the data in the column will be lost.
  - Added the required column `id` to the `Constant_Legal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Software_Constant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Constant_Legal" DROP CONSTRAINT "Constant_Legal_pkey",
DROP COLUMN "code",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Constant_Legal_pkey" PRIMARY KEY ("id", "dateStart");

-- AlterTable
ALTER TABLE "Software_Constant" DROP CONSTRAINT "Software_Constant_pkey",
DROP COLUMN "code",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Software_Constant_pkey" PRIMARY KEY ("id", "dateStart", "softwareLabel", "clientId");
