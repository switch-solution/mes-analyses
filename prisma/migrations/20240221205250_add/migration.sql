/*
  Warnings:

  - You are about to drop the `ConstantLegal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DsnContributionFund` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DsnEstablishment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DsnIdcc` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DsnRateAt` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConstantLegal" DROP CONSTRAINT "ConstantLegal_idccCode_fkey";

-- DropForeignKey
ALTER TABLE "ConstantLegal" DROP CONSTRAINT "ConstantLegal_softwareLabel_softwareClientId_fkey";

-- DropForeignKey
ALTER TABLE "DsnContributionFund" DROP CONSTRAINT "DsnContributionFund_dsnEstablishmentNic_dsnEstablishmentDs_fkey";

-- DropForeignKey
ALTER TABLE "DsnEstablishment" DROP CONSTRAINT "DsnEstablishment_dsnSiren_dsnNic_dsnMonth_dsnVersion_dsnFr_fkey";

-- DropForeignKey
ALTER TABLE "DsnIdcc" DROP CONSTRAINT "DsnIdcc_dsnSiren_dsnNic_dsnMonth_dsnVersion_dsnFraction_fkey";

-- DropForeignKey
ALTER TABLE "DsnRateAt" DROP CONSTRAINT "DsnRateAt_dsnEstablishmentNic_dsnEstablishmentDsnSiren_dsn_fkey";

-- DropTable
DROP TABLE "ConstantLegal";

-- DropTable
DROP TABLE "DsnContributionFund";

-- DropTable
DROP TABLE "DsnEstablishment";

-- DropTable
DROP TABLE "DsnIdcc";

-- DropTable
DROP TABLE "DsnRateAt";

-- CreateTable
CREATE TABLE "Dsn_Establishment" (
    "nic" TEXT NOT NULL,
    "apet" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "address3" TEXT,
    "codeZip" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'FR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "dsnSiren" TEXT NOT NULL,
    "dsnNic" TEXT NOT NULL,
    "dsnMonth" TEXT NOT NULL,
    "dsnVersion" TEXT NOT NULL,
    "dsnFraction" TEXT NOT NULL,

    CONSTRAINT "Dsn_Establishment_pkey" PRIMARY KEY ("nic","dsnSiren","dsnNic","dsnMonth","dsnVersion","dsnFraction")
);

-- CreateTable
CREATE TABLE "Dsn_RateAt" (
    "code" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "dsnEstablishmentNic" TEXT NOT NULL,
    "dsnEstablishmentDsnSiren" TEXT NOT NULL,
    "dsnEstablishmentDsnNic" TEXT NOT NULL,
    "dsnEstablishmentDsnMonth" TEXT NOT NULL,
    "dsnEstablishmentDsnVersion" TEXT NOT NULL,
    "dsnEstablishmentDsnFraction" TEXT NOT NULL,

    CONSTRAINT "Dsn_RateAt_pkey" PRIMARY KEY ("code","dsnEstablishmentNic","dsnEstablishmentDsnSiren","dsnEstablishmentDsnNic","dsnEstablishmentDsnMonth","dsnEstablishmentDsnVersion","dsnEstablishmentDsnFraction")
);

-- CreateTable
CREATE TABLE "Dsn_ContributionFund" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "address3" TEXT,
    "city" TEXT NOT NULL,
    "codeZip" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'FR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "dsnEstablishmentNic" TEXT NOT NULL,
    "dsnEstablishmentDsnSiren" TEXT NOT NULL,
    "dsnEstablishmentDsnNic" TEXT NOT NULL,
    "dsnEstablishmentDsnMonth" TEXT NOT NULL,
    "dsnEstablishmentDsnVersion" TEXT NOT NULL,
    "dsnEstablishmentDsnFraction" TEXT NOT NULL,

    CONSTRAINT "Dsn_ContributionFund_pkey" PRIMARY KEY ("code","dsnEstablishmentNic","dsnEstablishmentDsnSiren","dsnEstablishmentDsnNic","dsnEstablishmentDsnMonth","dsnEstablishmentDsnVersion","dsnEstablishmentDsnFraction")
);

-- CreateTable
CREATE TABLE "Dsn_Idcc" (
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "dsnSiren" TEXT NOT NULL,
    "dsnNic" TEXT NOT NULL,
    "dsnMonth" TEXT NOT NULL,
    "dsnVersion" TEXT NOT NULL,
    "dsnFraction" TEXT NOT NULL,

    CONSTRAINT "Dsn_Idcc_pkey" PRIMARY KEY ("code","dsnSiren","dsnNic","dsnMonth","dsnVersion","dsnFraction")
);

-- CreateTable
CREATE TABLE "Constant_Legal" (
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "idccCode" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "softwareId" TEXT,
    "softwareLabel" TEXT NOT NULL,
    "softwareClientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Constant_Legal_pkey" PRIMARY KEY ("code","level","dateStart","dateEnd")
);

-- AddForeignKey
ALTER TABLE "Dsn_Establishment" ADD CONSTRAINT "Dsn_Establishment_dsnSiren_dsnNic_dsnMonth_dsnVersion_dsnF_fkey" FOREIGN KEY ("dsnSiren", "dsnNic", "dsnMonth", "dsnVersion", "dsnFraction") REFERENCES "Dsn"("siren", "nic", "month", "version", "fraction") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dsn_RateAt" ADD CONSTRAINT "Dsn_RateAt_dsnEstablishmentNic_dsnEstablishmentDsnSiren_ds_fkey" FOREIGN KEY ("dsnEstablishmentNic", "dsnEstablishmentDsnSiren", "dsnEstablishmentDsnNic", "dsnEstablishmentDsnMonth", "dsnEstablishmentDsnVersion", "dsnEstablishmentDsnFraction") REFERENCES "Dsn_Establishment"("nic", "dsnSiren", "dsnNic", "dsnMonth", "dsnVersion", "dsnFraction") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dsn_ContributionFund" ADD CONSTRAINT "Dsn_ContributionFund_dsnEstablishmentNic_dsnEstablishmentD_fkey" FOREIGN KEY ("dsnEstablishmentNic", "dsnEstablishmentDsnSiren", "dsnEstablishmentDsnNic", "dsnEstablishmentDsnMonth", "dsnEstablishmentDsnVersion", "dsnEstablishmentDsnFraction") REFERENCES "Dsn_Establishment"("nic", "dsnSiren", "dsnNic", "dsnMonth", "dsnVersion", "dsnFraction") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dsn_Idcc" ADD CONSTRAINT "Dsn_Idcc_dsnSiren_dsnNic_dsnMonth_dsnVersion_dsnFraction_fkey" FOREIGN KEY ("dsnSiren", "dsnNic", "dsnMonth", "dsnVersion", "dsnFraction") REFERENCES "Dsn"("siren", "nic", "month", "version", "fraction") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Constant_Legal" ADD CONSTRAINT "Constant_Legal_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Constant_Legal" ADD CONSTRAINT "Constant_Legal_softwareLabel_softwareClientId_fkey" FOREIGN KEY ("softwareLabel", "softwareClientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;
