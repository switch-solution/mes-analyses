/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `SoftwareItems` will be added. If there are existing duplicate values, this will fail.
  - The required column `slug` was added to the `SoftwareItems` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "SoftwareItems" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SoftwareItems_slug_key" ON "SoftwareItems"("slug");
