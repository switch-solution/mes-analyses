/*
  Warnings:

  - You are about to drop the column `billId` on the `InvoiceLine` table. All the data in the column will be lost.
  - Added the required column `invoiceId` to the `InvoiceLine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InvoiceLine" DROP CONSTRAINT "InvoiceLine_billId_fkey";

-- AlterTable
ALTER TABLE "InvoiceLine" DROP COLUMN "billId",
ADD COLUMN     "invoiceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "InvoiceLine" ADD CONSTRAINT "InvoiceLine_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
