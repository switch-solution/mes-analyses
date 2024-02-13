/*
  Warnings:

  - You are about to drop the column `siret` on the `Client` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[siren]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Client_siret_key";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "siret",
ADD COLUMN     "siren" TEXT NOT NULL DEFAULT '999999999',
ALTER COLUMN "ape" DROP NOT NULL,
ALTER COLUMN "address1" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "codeZip" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "invoiceAddress1" DROP NOT NULL,
ALTER COLUMN "invoiceCity" DROP NOT NULL,
ALTER COLUMN "invoiceCodeZip" DROP NOT NULL,
ALTER COLUMN "invoiceCountry" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Client_siren_key" ON "Client"("siren");
