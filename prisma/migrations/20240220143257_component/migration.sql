/*
  Warnings:

  - The primary key for the `ChapterStdComponent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `componentTitle` on the `ChapterStdComponent` table. All the data in the column will be lost.
  - The primary key for the `SandboxValues` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `componentTitle` on the `SandboxValues` table. All the data in the column will be lost.
  - The primary key for the `Standard_Component` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `title` on the `Standard_Component` table. All the data in the column will be lost.
  - The primary key for the `Standard_Component_Image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `componentTitle` on the `Standard_Component_Image` table. All the data in the column will be lost.
  - The primary key for the `Standard_Component_Input` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `componentTitle` on the `Standard_Component_Input` table. All the data in the column will be lost.
  - The primary key for the `Standard_Component_Select_Option` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `componentTitle` on the `Standard_Component_Select_Option` table. All the data in the column will be lost.
  - The primary key for the `Standard_Component_TextArea` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `componentTitle` on the `Standard_Component_TextArea` table. All the data in the column will be lost.
  - Added the required column `componentLabel` to the `ChapterStdComponent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `componentLabel` to the `SandboxValues` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Standard_Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `componentLabel` to the `Standard_Component_Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `componentLabel` to the `Standard_Component_Input` table without a default value. This is not possible if the table is not empty.
  - Added the required column `componentLabel` to the `Standard_Component_Select_Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `componentLabel` to the `Standard_Component_TextArea` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChapterStdComponent" DROP CONSTRAINT "ChapterStdComponent_componentTitle_softwareLabel_clientId__fkey";

-- DropForeignKey
ALTER TABLE "SandboxValues" DROP CONSTRAINT "SandboxValues_componentTitle_softwareLabel_clientId_compon_fkey";

-- DropForeignKey
ALTER TABLE "SandboxValues" DROP CONSTRAINT "SandboxValues_componentTitle_softwareLabel_clientId_inputV_fkey";

-- DropForeignKey
ALTER TABLE "Standard_Component_Image" DROP CONSTRAINT "Standard_Component_Image_componentTitle_softwareLabel_comp_fkey";

-- DropForeignKey
ALTER TABLE "Standard_Component_Input" DROP CONSTRAINT "Standard_Component_Input_componentTitle_softwareLabel_clie_fkey";

-- DropForeignKey
ALTER TABLE "Standard_Component_Select_Option" DROP CONSTRAINT "Standard_Component_Select_Option_inputLabel_clientId_softw_fkey";

-- DropForeignKey
ALTER TABLE "Standard_Component_TextArea" DROP CONSTRAINT "Standard_Component_TextArea_componentTitle_softwareLabel_c_fkey";

-- AlterTable
ALTER TABLE "ChapterStdComponent" DROP CONSTRAINT "ChapterStdComponent_pkey",
DROP COLUMN "componentTitle",
ADD COLUMN     "componentLabel" TEXT NOT NULL,
ADD CONSTRAINT "ChapterStdComponent_pkey" PRIMARY KEY ("clientId", "bookLabel", "bookSoftwareLabel", "level_1", "level_2", "level_3", "componentLabel", "softwareLabel", "componentType");

-- AlterTable
ALTER TABLE "SandboxValues" DROP CONSTRAINT "SandboxValues_pkey",
DROP COLUMN "componentTitle",
ADD COLUMN     "componentLabel" TEXT NOT NULL,
ADD CONSTRAINT "SandboxValues_pkey" PRIMARY KEY ("clientId", "componentLabel", "softwareLabel", "componentType", "inputLabel", "inputVersion", "version");

-- AlterTable
ALTER TABLE "Standard_Component" DROP CONSTRAINT "Standard_Component_pkey",
DROP COLUMN "title",
ADD COLUMN     "label" TEXT NOT NULL,
ADD CONSTRAINT "Standard_Component_pkey" PRIMARY KEY ("label", "softwareLabel", "clientId", "type");

-- AlterTable
ALTER TABLE "Standard_Component_Image" DROP CONSTRAINT "Standard_Component_Image_pkey",
DROP COLUMN "componentTitle",
ADD COLUMN     "componentLabel" TEXT NOT NULL,
ADD CONSTRAINT "Standard_Component_Image_pkey" PRIMARY KEY ("componentLabel", "softwareLabel", "clientId", "version", "componentType");

-- AlterTable
ALTER TABLE "Standard_Component_Input" DROP CONSTRAINT "Standard_Component_Input_pkey",
DROP COLUMN "componentTitle",
ADD COLUMN     "componentLabel" TEXT NOT NULL,
ADD CONSTRAINT "Standard_Component_Input_pkey" PRIMARY KEY ("componentLabel", "softwareLabel", "clientId", "version", "label");

-- AlterTable
ALTER TABLE "Standard_Component_Select_Option" DROP CONSTRAINT "Standard_Component_Select_Option_pkey",
DROP COLUMN "componentTitle",
ADD COLUMN     "componentLabel" TEXT NOT NULL,
ADD CONSTRAINT "Standard_Component_Select_Option_pkey" PRIMARY KEY ("inputLabel", "clientId", "softwareLabel", "inputVersion", "componentLabel", "label");

-- AlterTable
ALTER TABLE "Standard_Component_TextArea" DROP CONSTRAINT "Standard_Component_TextArea_pkey",
DROP COLUMN "componentTitle",
ADD COLUMN     "componentLabel" TEXT NOT NULL,
ADD CONSTRAINT "Standard_Component_TextArea_pkey" PRIMARY KEY ("componentLabel", "softwareLabel", "clientId", "version", "componentType");

-- AddForeignKey
ALTER TABLE "Standard_Component_Input" ADD CONSTRAINT "Standard_Component_Input_componentLabel_softwareLabel_clie_fkey" FOREIGN KEY ("componentLabel", "softwareLabel", "clientId", "componentType") REFERENCES "Standard_Component"("label", "softwareLabel", "clientId", "type") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Component_TextArea" ADD CONSTRAINT "Standard_Component_TextArea_componentLabel_softwareLabel_c_fkey" FOREIGN KEY ("componentLabel", "softwareLabel", "componentType", "clientId") REFERENCES "Standard_Component"("label", "softwareLabel", "type", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Component_Image" ADD CONSTRAINT "Standard_Component_Image_componentLabel_softwareLabel_comp_fkey" FOREIGN KEY ("componentLabel", "softwareLabel", "componentType", "clientId") REFERENCES "Standard_Component"("label", "softwareLabel", "type", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Component_Select_Option" ADD CONSTRAINT "Standard_Component_Select_Option_inputLabel_clientId_softw_fkey" FOREIGN KEY ("inputLabel", "clientId", "softwareLabel", "inputVersion", "componentLabel") REFERENCES "Standard_Component_Input"("label", "clientId", "softwareLabel", "version", "componentLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterStdComponent" ADD CONSTRAINT "ChapterStdComponent_componentLabel_softwareLabel_clientId__fkey" FOREIGN KEY ("componentLabel", "softwareLabel", "clientId", "componentType") REFERENCES "Standard_Component"("label", "softwareLabel", "clientId", "type") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SandboxValues" ADD CONSTRAINT "SandboxValues_componentLabel_softwareLabel_clientId_inputV_fkey" FOREIGN KEY ("componentLabel", "softwareLabel", "clientId", "inputVersion", "inputLabel") REFERENCES "Standard_Component_Input"("componentLabel", "softwareLabel", "clientId", "version", "label") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SandboxValues" ADD CONSTRAINT "SandboxValues_componentLabel_softwareLabel_clientId_compon_fkey" FOREIGN KEY ("componentLabel", "softwareLabel", "clientId", "componentType") REFERENCES "Standard_Component"("label", "softwareLabel", "clientId", "type") ON DELETE RESTRICT ON UPDATE CASCADE;
