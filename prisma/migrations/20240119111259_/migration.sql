/*
  Warnings:

  - A unique constraint covering the columns `[socialReason]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[siret]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Client_socialReason_key" ON "Client"("socialReason");

-- CreateIndex
CREATE UNIQUE INDEX "Client_siret_key" ON "Client"("siret");
