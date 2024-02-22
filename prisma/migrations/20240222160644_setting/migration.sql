-- CreateTable
CREATE TABLE "Software_Setting" (
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "value" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "comment" TEXT,

    CONSTRAINT "Software_Setting_pkey" PRIMARY KEY ("code","label","value","dateStart","clientId","softwareLabel")
);

-- CreateIndex
CREATE UNIQUE INDEX "Software_Setting_slug_key" ON "Software_Setting"("slug");

-- AddForeignKey
ALTER TABLE "Software_Setting" ADD CONSTRAINT "Software_Setting_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;
