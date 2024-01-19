-- CreateTable
CREATE TABLE "Software" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Software_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Standard_Book" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "chapter" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "softwareId" TEXT NOT NULL,

    CONSTRAINT "Standard_Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Standard_Composant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Standard_Composant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Standard_Composant_Input" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "standard_ComposantId" TEXT NOT NULL,
    "standard_InputId" TEXT NOT NULL,

    CONSTRAINT "Standard_Composant_Input_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Standard_Input" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "maxLength" INTEGER,
    "minLength" INTEGER,
    "minValue" INTEGER,
    "maxValue" INTEGER,
    "required" BOOLEAN NOT NULL,
    "readonly" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Standard_Input_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Standard_Select_Option" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "standardInputId" TEXT NOT NULL,

    CONSTRAINT "Standard_Select_Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Standard_Book_Composant" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "standardBookId" TEXT NOT NULL,
    "standardComposantId" TEXT NOT NULL,

    CONSTRAINT "Standard_Book_Composant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Software_name_key" ON "Software"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Standard_Book_chapter_key" ON "Standard_Book"("chapter");

-- AddForeignKey
ALTER TABLE "Software" ADD CONSTRAINT "Software_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Book" ADD CONSTRAINT "Standard_Book_softwareId_fkey" FOREIGN KEY ("softwareId") REFERENCES "Software"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Composant_Input" ADD CONSTRAINT "Standard_Composant_Input_standard_ComposantId_fkey" FOREIGN KEY ("standard_ComposantId") REFERENCES "Standard_Composant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Composant_Input" ADD CONSTRAINT "Standard_Composant_Input_standard_InputId_fkey" FOREIGN KEY ("standard_InputId") REFERENCES "Standard_Input"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Select_Option" ADD CONSTRAINT "Standard_Select_Option_standardInputId_fkey" FOREIGN KEY ("standardInputId") REFERENCES "Standard_Input"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Book_Composant" ADD CONSTRAINT "Standard_Book_Composant_standardBookId_fkey" FOREIGN KEY ("standardBookId") REFERENCES "Standard_Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Book_Composant" ADD CONSTRAINT "Standard_Book_Composant_standardComposantId_fkey" FOREIGN KEY ("standardComposantId") REFERENCES "Standard_Composant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
