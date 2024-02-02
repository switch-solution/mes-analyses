-- AlterTable
ALTER TABLE "Standard_Composant_Input" ALTER COLUMN "textArea" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Standard_Composant_TextArea" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "placeholder" TEXT,
    "defaultValue" TEXT,
    "readonly" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "standard_ComposantId" TEXT NOT NULL,

    CONSTRAINT "Standard_Composant_TextArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Standard_Composant_Image" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "standard_ComposantId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "device" TEXT NOT NULL,

    CONSTRAINT "Standard_Composant_Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Standard_Composant_TextArea" ADD CONSTRAINT "Standard_Composant_TextArea_standard_ComposantId_fkey" FOREIGN KEY ("standard_ComposantId") REFERENCES "Standard_Composant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Composant_Image" ADD CONSTRAINT "Standard_Composant_Image_standard_ComposantId_fkey" FOREIGN KEY ("standard_ComposantId") REFERENCES "Standard_Composant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
