/*
  Warnings:

  - You are about to drop the column `pourentage` on the `Client_Table_Seniority_Row` table. All the data in the column will be lost.
  - You are about to drop the column `pourentage` on the `Software_Table_Seniority_Row` table. All the data in the column will be lost.
  - You are about to drop the column `pourentage` on the `Table_Seniority_Row` table. All the data in the column will be lost.
  - Added the required column `pourcentage` to the `Client_Table_Seniority_Row` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pourcentage` to the `Software_Table_Seniority_Row` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pourcentage` to the `Table_Seniority_Row` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client_Table_Seniority_Row" DROP COLUMN "pourentage",
ADD COLUMN     "pourcentage" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Software_Table_Seniority_Row" DROP COLUMN "pourentage",
ADD COLUMN     "pourcentage" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Table_Seniority_Row" DROP COLUMN "pourentage",
ADD COLUMN     "pourcentage" TEXT NOT NULL;
