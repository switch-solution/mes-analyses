/*
  Warnings:

  - The primary key for the `SandboxValues` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `inputVersion` on the `SandboxValues` table. All the data in the column will be lost.
  - The primary key for the `Standard_Component_Input` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `version` on the `Standard_Component_Input` table. All the data in the column will be lost.
  - The primary key for the `Standard_Component_Select_Option` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `inputVersion` on the `Standard_Component_Select_Option` table. All the data in the column will be lost.
  - The primary key for the `Standard_Component_TextArea` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `version` on the `Standard_Component_TextArea` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SandboxValues" DROP CONSTRAINT "SandboxValues_componentLabel_softwareLabel_clientId_inputV_fkey";

-- DropForeignKey
ALTER TABLE "Standard_Component_Select_Option" DROP CONSTRAINT "Standard_Component_Select_Option_inputLabel_clientId_softw_fkey";

-- AlterTable
ALTER TABLE "SandboxValues" DROP CONSTRAINT "SandboxValues_pkey",
DROP COLUMN "inputVersion",
ADD CONSTRAINT "SandboxValues_pkey" PRIMARY KEY ("clientId", "componentLabel", "softwareLabel", "componentType", "inputLabel", "version");

-- AlterTable
ALTER TABLE "Standard_Component_Input" DROP CONSTRAINT "Standard_Component_Input_pkey",
DROP COLUMN "version",
ALTER COLUMN "maxLength" SET DEFAULT 255,
ALTER COLUMN "minLength" SET DEFAULT 0,
ALTER COLUMN "minValue" SET DEFAULT 0,
ALTER COLUMN "maxValue" SET DEFAULT 9999,
ALTER COLUMN "placeholder" SET DEFAULT 'Saisir une valeur',
ALTER COLUMN "defaultValue" SET DEFAULT '',
ADD CONSTRAINT "Standard_Component_Input_pkey" PRIMARY KEY ("componentLabel", "softwareLabel", "clientId", "label");

-- AlterTable
ALTER TABLE "Standard_Component_Select_Option" DROP CONSTRAINT "Standard_Component_Select_Option_pkey",
DROP COLUMN "inputVersion",
ADD CONSTRAINT "Standard_Component_Select_Option_pkey" PRIMARY KEY ("inputLabel", "clientId", "softwareLabel", "componentLabel", "label");

-- AlterTable
ALTER TABLE "Standard_Component_TextArea" DROP CONSTRAINT "Standard_Component_TextArea_pkey",
DROP COLUMN "version",
ADD CONSTRAINT "Standard_Component_TextArea_pkey" PRIMARY KEY ("componentLabel", "softwareLabel", "clientId", "componentType");

-- AddForeignKey
ALTER TABLE "Standard_Component_Select_Option" ADD CONSTRAINT "Standard_Component_Select_Option_inputLabel_clientId_softw_fkey" FOREIGN KEY ("inputLabel", "clientId", "softwareLabel", "componentLabel") REFERENCES "Standard_Component_Input"("label", "clientId", "softwareLabel", "componentLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SandboxValues" ADD CONSTRAINT "SandboxValues_componentLabel_softwareLabel_clientId_inputL_fkey" FOREIGN KEY ("componentLabel", "softwareLabel", "clientId", "inputLabel") REFERENCES "Standard_Component_Input"("componentLabel", "softwareLabel", "clientId", "label") ON DELETE CASCADE ON UPDATE CASCADE;
