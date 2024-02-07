/*
  Warnings:

  - Added the required column `idccCode` to the `ConstantLegal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `ConstantLegal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `SandboxValues` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idccCode` to the `StandardRubrique` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ConstantLegal" ADD COLUMN     "idccCode" TEXT NOT NULL,
ADD COLUMN     "level" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SandboxValues" ADD COLUMN     "label" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StandardRubrique" ADD COLUMN     "idccCode" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Idcc" (
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Idcc_pkey" PRIMARY KEY ("code")
);

-- AddForeignKey
ALTER TABLE "StandardRubrique" ADD CONSTRAINT "StandardRubrique_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConstantLegal" ADD CONSTRAINT "ConstantLegal_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
