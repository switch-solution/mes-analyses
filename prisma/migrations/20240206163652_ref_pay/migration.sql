-- CreateTable
CREATE TABLE "StandardRubrique" (
    "rubriqueId" TEXT NOT NULL,
    "softwareId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "base" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "StandardRubrique_pkey" PRIMARY KEY ("rubriqueId","softwareId","version")
);

-- CreateTable
CREATE TABLE "ConstantLegal" (
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "softwareId" TEXT,

    CONSTRAINT "ConstantLegal_pkey" PRIMARY KEY ("code","dateStart","dateEnd")
);

-- AddForeignKey
ALTER TABLE "StandardRubrique" ADD CONSTRAINT "StandardRubrique_softwareId_fkey" FOREIGN KEY ("softwareId") REFERENCES "Software"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConstantLegal" ADD CONSTRAINT "ConstantLegal_softwareId_fkey" FOREIGN KEY ("softwareId") REFERENCES "Software"("id") ON DELETE SET NULL ON UPDATE CASCADE;
