/*
  Warnings:

  - The primary key for the `SoftwareItems` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `code` on the `SoftwareItems` table. All the data in the column will be lost.
  - Added the required column `id` to the `SoftwareItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SoftwareItems" DROP CONSTRAINT "SoftwareItems_pkey",
DROP COLUMN "code",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "SoftwareItems_pkey" PRIMARY KEY ("id", "type", "softwareId", "version");
