/*
  Warnings:

  - The primary key for the `Client_Table_Seniority_Row` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `order` on the `Client_Table_Seniority_Row` table. All the data in the column will be lost.
  - The primary key for the `Software_Table_Seniority_Row` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `order` on the `Software_Table_Seniority_Row` table. All the data in the column will be lost.
  - Added the required column `id` to the `Client_Table_Seniority_Row` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Software_Table_Seniority_Row` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client_Table_Seniority_Row" DROP CONSTRAINT "Client_Table_Seniority_Row_pkey",
DROP COLUMN "order",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Client_Table_Seniority_Row_pkey" PRIMARY KEY ("id", "tableId", "idcc");

-- AlterTable
ALTER TABLE "Software_Table_Seniority_Row" DROP CONSTRAINT "Software_Table_Seniority_Row_pkey",
DROP COLUMN "order",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Software_Table_Seniority_Row_pkey" PRIMARY KEY ("id", "tableId", "idcc", "softwareLabel");
