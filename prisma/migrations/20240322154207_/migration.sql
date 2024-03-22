/*
  Warnings:

  - You are about to drop the column `coeffcient` on the `Client_Table_Seniority_Row` table. All the data in the column will be lost.
  - You are about to drop the column `coeffcient` on the `Software_Table_Seniority_Row` table. All the data in the column will be lost.
  - You are about to drop the column `coeffcient` on the `Table_Seniority_Row` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client_Table_Seniority_Row" DROP COLUMN "coeffcient",
ADD COLUMN     "coefficient" TEXT;

-- AlterTable
ALTER TABLE "Software_Table_Seniority_Row" DROP COLUMN "coeffcient",
ADD COLUMN     "coefficient" TEXT;

-- AlterTable
ALTER TABLE "Table_Seniority_Row" DROP COLUMN "coeffcient",
ADD COLUMN     "coefficient" TEXT;
