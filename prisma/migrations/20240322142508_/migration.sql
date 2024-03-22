/*
  Warnings:

  - Changed the type of `schoolYear` on the `Client_Table_Age_Row` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `schoolYear` on the `Software_Table_Age_Row` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `schoolYear` on the `Table_Age_Row` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Client_Table_Age_Row" DROP COLUMN "schoolYear",
ADD COLUMN     "schoolYear" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Software_Table_Age_Row" DROP COLUMN "schoolYear",
ADD COLUMN     "schoolYear" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Table_Age_Row" DROP COLUMN "schoolYear",
ADD COLUMN     "schoolYear" INTEGER NOT NULL;
