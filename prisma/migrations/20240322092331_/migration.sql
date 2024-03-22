/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Client_Classification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Software_Classification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Client_Classification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Software_Classification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client_Classification" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Software_Classification" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Client_Classification_slug_key" ON "Client_Classification"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Classification_slug_key" ON "Software_Classification"("slug");
