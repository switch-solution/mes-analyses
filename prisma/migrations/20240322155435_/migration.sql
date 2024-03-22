/*
  Warnings:

  - Changed the type of `pourcentage` on the `Client_Table_Keeping_Wage_Row` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `pourcentage` on the `Client_Table_Seniority_Row` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `pourcentage` on the `Software_Table_Keeping_Wage_Row` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `pourcentage` on the `Software_Table_Seniority_Row` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `pourcentage` on the `Table_Keeping_Wage_Row` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `pourcentage` on the `Table_Seniority_Row` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Client_Table_Age_Row" ALTER COLUMN "pourcentage" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Client_Table_Keeping_Wage_Row" DROP COLUMN "pourcentage",
ADD COLUMN     "pourcentage" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Client_Table_Seniority_Row" DROP COLUMN "pourcentage",
ADD COLUMN     "pourcentage" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Software_Table_Age_Row" ALTER COLUMN "pourcentage" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Software_Table_Keeping_Wage_Row" DROP COLUMN "pourcentage",
ADD COLUMN     "pourcentage" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Software_Table_Seniority_Row" DROP COLUMN "pourcentage",
ADD COLUMN     "pourcentage" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Table_Age_Row" ALTER COLUMN "pourcentage" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Table_Keeping_Wage_Row" DROP COLUMN "pourcentage",
ADD COLUMN     "pourcentage" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Table_Seniority_Row" DROP COLUMN "pourcentage",
ADD COLUMN     "pourcentage" DOUBLE PRECISION NOT NULL;
