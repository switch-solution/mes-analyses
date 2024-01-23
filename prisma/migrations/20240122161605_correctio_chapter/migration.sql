/*
  Warnings:

  - You are about to drop the column `chapter` on the `Standard_Book` table. All the data in the column will be lost.
  - Added the required column `chapter` to the `Standard_Book_Composant` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Standard_Book_chapter_key";

-- AlterTable
ALTER TABLE "Standard_Book" DROP COLUMN "chapter";

-- AlterTable
ALTER TABLE "Standard_Book_Composant" ADD COLUMN     "chapter" TEXT NOT NULL;
