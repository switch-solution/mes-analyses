/*
  Warnings:

  - You are about to drop the `Standard_Component` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Standard_Component_Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Standard_Component_Input` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Standard_Component_Select_Option` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Standard_Component_TextArea` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChapterStdComponent" DROP CONSTRAINT "ChapterStdComponent_componentLabel_softwareLabel_clientId__fkey";

-- DropForeignKey
ALTER TABLE "SandboxValues" DROP CONSTRAINT "SandboxValues_componentLabel_softwareLabel_clientId_compon_fkey";

-- DropForeignKey
ALTER TABLE "SandboxValues" DROP CONSTRAINT "SandboxValues_componentLabel_softwareLabel_clientId_inputL_fkey";

-- DropForeignKey
ALTER TABLE "Standard_Component" DROP CONSTRAINT "Standard_Component_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Standard_Component" DROP CONSTRAINT "Standard_Component_softwareLabel_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Standard_Component_Image" DROP CONSTRAINT "Standard_Component_Image_componentLabel_softwareLabel_comp_fkey";

-- DropForeignKey
ALTER TABLE "Standard_Component_Input" DROP CONSTRAINT "Standard_Component_Input_componentLabel_softwareLabel_clie_fkey";

-- DropForeignKey
ALTER TABLE "Standard_Component_Select_Option" DROP CONSTRAINT "Standard_Component_Select_Option_inputLabel_clientId_softw_fkey";

-- DropForeignKey
ALTER TABLE "Standard_Component_TextArea" DROP CONSTRAINT "Standard_Component_TextArea_componentLabel_softwareLabel_c_fkey";

-- DropTable
DROP TABLE "Standard_Component";

-- DropTable
DROP TABLE "Standard_Component_Image";

-- DropTable
DROP TABLE "Standard_Component_Input";

-- DropTable
DROP TABLE "Standard_Component_Select_Option";

-- DropTable
DROP TABLE "Standard_Component_TextArea";

-- CreateTable
CREATE TABLE "Software_Component" (
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,

    CONSTRAINT "Software_Component_pkey" PRIMARY KEY ("label","softwareLabel","clientId","type")
);

-- CreateTable
CREATE TABLE "Software_Component_Input" (
    "type" TEXT NOT NULL,
    "dsnType" TEXT,
    "label" TEXT NOT NULL,
    "maxLength" INTEGER DEFAULT 255,
    "minLength" INTEGER DEFAULT 0,
    "minValue" INTEGER DEFAULT 0,
    "maxValue" INTEGER DEFAULT 9999,
    "placeholder" TEXT DEFAULT 'Saisir une valeur',
    "order" INTEGER NOT NULL,
    "inputSource" TEXT,
    "defaultValue" TEXT DEFAULT '',
    "required" BOOLEAN DEFAULT false,
    "readonly" BOOLEAN DEFAULT false,
    "multiple" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "componentLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "componentType" TEXT NOT NULL,
    "id" TEXT NOT NULL,

    CONSTRAINT "Software_Component_Input_pkey" PRIMARY KEY ("componentLabel","softwareLabel","clientId","label")
);

-- CreateTable
CREATE TABLE "Software_Component_TextArea" (
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "componentLabel" TEXT NOT NULL,
    "componentType" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,

    CONSTRAINT "Software_Component_TextArea_pkey" PRIMARY KEY ("componentLabel","softwareLabel","clientId","componentType")
);

-- CreateTable
CREATE TABLE "Software_Component_Image" (
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "componentLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "componentType" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "device" TEXT NOT NULL,

    CONSTRAINT "Software_Component_Image_pkey" PRIMARY KEY ("componentLabel","softwareLabel","clientId","version","componentType")
);

-- CreateTable
CREATE TABLE "Software_Component_Select_Option" (
    "label" TEXT NOT NULL,
    "selected" BOOLEAN,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "componentLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "inputLabel" TEXT NOT NULL,

    CONSTRAINT "Software_Component_Select_Option_pkey" PRIMARY KEY ("inputLabel","clientId","softwareLabel","componentLabel","label")
);

-- CreateIndex
CREATE UNIQUE INDEX "Software_Component_slug_key" ON "Software_Component"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Component_Input_id_key" ON "Software_Component_Input"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Component_Image_slug_key" ON "Software_Component_Image"("slug");

-- AddForeignKey
ALTER TABLE "Software_Component" ADD CONSTRAINT "Software_Component_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Component" ADD CONSTRAINT "Software_Component_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Component_Input" ADD CONSTRAINT "Software_Component_Input_componentLabel_softwareLabel_clie_fkey" FOREIGN KEY ("componentLabel", "softwareLabel", "clientId", "componentType") REFERENCES "Software_Component"("label", "softwareLabel", "clientId", "type") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Component_TextArea" ADD CONSTRAINT "Software_Component_TextArea_componentLabel_softwareLabel_c_fkey" FOREIGN KEY ("componentLabel", "softwareLabel", "componentType", "clientId") REFERENCES "Software_Component"("label", "softwareLabel", "type", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Component_Image" ADD CONSTRAINT "Software_Component_Image_componentLabel_softwareLabel_comp_fkey" FOREIGN KEY ("componentLabel", "softwareLabel", "componentType", "clientId") REFERENCES "Software_Component"("label", "softwareLabel", "type", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Component_Select_Option" ADD CONSTRAINT "Software_Component_Select_Option_inputLabel_clientId_softw_fkey" FOREIGN KEY ("inputLabel", "clientId", "softwareLabel", "componentLabel") REFERENCES "Software_Component_Input"("label", "clientId", "softwareLabel", "componentLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterStdComponent" ADD CONSTRAINT "ChapterStdComponent_componentLabel_softwareLabel_clientId__fkey" FOREIGN KEY ("componentLabel", "softwareLabel", "clientId", "componentType") REFERENCES "Software_Component"("label", "softwareLabel", "clientId", "type") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SandboxValues" ADD CONSTRAINT "SandboxValues_componentLabel_softwareLabel_clientId_inputL_fkey" FOREIGN KEY ("componentLabel", "softwareLabel", "clientId", "inputLabel") REFERENCES "Software_Component_Input"("componentLabel", "softwareLabel", "clientId", "label") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SandboxValues" ADD CONSTRAINT "SandboxValues_componentLabel_softwareLabel_clientId_compon_fkey" FOREIGN KEY ("componentLabel", "softwareLabel", "clientId", "componentType") REFERENCES "Software_Component"("label", "softwareLabel", "clientId", "type") ON DELETE RESTRICT ON UPDATE CASCADE;
