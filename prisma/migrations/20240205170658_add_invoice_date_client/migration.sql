/*
  Warnings:

  - You are about to drop the column `billingAddress1` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `billingAddress2` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `billingAddress3` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `billingAddress4` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `billingCity` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `billingCodeZip` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `billingCountry` on the `Client` table. All the data in the column will be lost.
  - Added the required column `invoiceAddress1` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceCity` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceCodeZip` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceCountry` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceEnd` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceStart` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "billingAddress1",
DROP COLUMN "billingAddress2",
DROP COLUMN "billingAddress3",
DROP COLUMN "billingAddress4",
DROP COLUMN "billingCity",
DROP COLUMN "billingCodeZip",
DROP COLUMN "billingCountry",
ADD COLUMN     "invoiceAddress1" TEXT NOT NULL,
ADD COLUMN     "invoiceAddress2" TEXT,
ADD COLUMN     "invoiceAddress3" TEXT,
ADD COLUMN     "invoiceAddress4" TEXT,
ADD COLUMN     "invoiceCity" TEXT NOT NULL,
ADD COLUMN     "invoiceCodeZip" TEXT NOT NULL,
ADD COLUMN     "invoiceCountry" TEXT NOT NULL,
ADD COLUMN     "invoiceEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "invoiceStart" TIMESTAMP(3) NOT NULL;
