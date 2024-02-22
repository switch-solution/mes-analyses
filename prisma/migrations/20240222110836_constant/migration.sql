/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Constant_Legal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Constant_Legal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Constant_Legal" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Constant_Legal_slug_key" ON "Constant_Legal"("slug");
