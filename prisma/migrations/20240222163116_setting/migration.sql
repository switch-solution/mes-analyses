/*
  Warnings:

  - The primary key for the `Software_Setting` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `code` on the `Software_Setting` table. All the data in the column will be lost.
  - Added the required column `id` to the `Software_Setting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Software_Setting" DROP CONSTRAINT "Software_Setting_pkey",
DROP COLUMN "code",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Software_Setting_pkey" PRIMARY KEY ("id", "label", "value", "dateStart", "clientId", "softwareLabel");
