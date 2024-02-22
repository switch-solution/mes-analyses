/*
  Warnings:

  - You are about to drop the `DsnJob` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DsnJob" DROP CONSTRAINT "DsnJob_dsnSiren_dsnNic_dsnMonth_dsnVersion_dsnFraction_fkey";

-- DropTable
DROP TABLE "DsnJob";

-- CreateTable
CREATE TABLE "Dsn_Job" (
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "dsnSiren" TEXT NOT NULL,
    "dsnNic" TEXT NOT NULL,
    "dsnMonth" TEXT NOT NULL,
    "dsnVersion" TEXT NOT NULL,
    "dsnFraction" TEXT NOT NULL,

    CONSTRAINT "Dsn_Job_pkey" PRIMARY KEY ("label","dsnSiren","dsnNic","dsnMonth","dsnVersion","dsnFraction")
);

-- AddForeignKey
ALTER TABLE "Dsn_Job" ADD CONSTRAINT "Dsn_Job_dsnSiren_dsnNic_dsnMonth_dsnVersion_dsnFraction_fkey" FOREIGN KEY ("dsnSiren", "dsnNic", "dsnMonth", "dsnVersion", "dsnFraction") REFERENCES "Dsn"("siren", "nic", "month", "version", "fraction") ON DELETE RESTRICT ON UPDATE CASCADE;
