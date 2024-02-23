/*
  Warnings:

  - You are about to drop the `Standard_Attachment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Standard_Attachment" DROP CONSTRAINT "Standard_Attachment_softwareLabel_clientId_fkey";

-- DropTable
DROP TABLE "Standard_Attachment";

-- CreateTable
CREATE TABLE "Software_Attachment" (
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isObligatory" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "isDsn" BOOLEAN NOT NULL DEFAULT false,
    "multiple" BOOLEAN NOT NULL DEFAULT false,
    "accept" TEXT NOT NULL DEFAULT 'pdf',

    CONSTRAINT "Software_Attachment_pkey" PRIMARY KEY ("label","softwareLabel","clientId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Software_Attachment_slug_key" ON "Software_Attachment"("slug");

-- AddForeignKey
ALTER TABLE "Software_Attachment" ADD CONSTRAINT "Software_Attachment_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;
