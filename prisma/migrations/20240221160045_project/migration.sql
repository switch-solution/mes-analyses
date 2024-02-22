/*
  Warnings:

  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `projectName` on the `Project_Attachment` table. All the data in the column will be lost.
  - The primary key for the `Project_Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Project_Chapter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Project_Input` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Project_Option` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Project_Value` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Projet_Component` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserProject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Validation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `projectSoftwareLabel` to the `Dsn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `softwareLabel` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectSoftwareLabel` to the `Project_Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectSoftwareLabel` to the `Project_Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectSoftwareLabel` to the `Project_Input` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectSoftwareLabel` to the `Project_Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectSoftwareLabel` to the `Project_Value` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectSoftwareLabel` to the `Projet_Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectSoftwareLabel` to the `UserProject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectSoftwareLabel` to the `Validation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dsn" DROP CONSTRAINT "Dsn_clientId_projectLabel_fkey";

-- DropForeignKey
ALTER TABLE "Logger" DROP CONSTRAINT "Logger_clientId_projectLabel_fkey";

-- DropForeignKey
ALTER TABLE "Project_Attachment" DROP CONSTRAINT "Project_Attachment_clientId_projectName_fkey";

-- DropForeignKey
ALTER TABLE "Project_Book" DROP CONSTRAINT "Project_Book_clientId_projectLabel_fkey";

-- DropForeignKey
ALTER TABLE "Project_Chapter" DROP CONSTRAINT "Project_Chapter_bookLabel_clientId_projectLabel_level_1_le_fkey";

-- DropForeignKey
ALTER TABLE "Project_Chapter" DROP CONSTRAINT "Project_Chapter_clientId_bookLabel_projectLabel_fkey";

-- DropForeignKey
ALTER TABLE "Project_Input" DROP CONSTRAINT "Project_Input_bookLabel_projectLabel_clientId_chapterLevel_fkey";

-- DropForeignKey
ALTER TABLE "Project_Option" DROP CONSTRAINT "Project_Option_clientId_bookLabel_inputLabel_projectLabel__fkey";

-- DropForeignKey
ALTER TABLE "Project_Value" DROP CONSTRAINT "Project_Value_clientId_bookLabel_projectLabel_chapterLevel_fkey";

-- DropForeignKey
ALTER TABLE "Projet_Component" DROP CONSTRAINT "Projet_Component_bookLabel_projectLabel_clientId_chapterLe_fkey";

-- DropForeignKey
ALTER TABLE "UserProject" DROP CONSTRAINT "UserProject_projectClientId_projectLabel_fkey";

-- DropForeignKey
ALTER TABLE "Validation" DROP CONSTRAINT "Validation_bookLabel_clientId_projectLabel_fkey";

-- AlterTable
ALTER TABLE "Dsn" ADD COLUMN     "projectSoftwareLabel" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Logger" ADD COLUMN     "projectSoftwareLabel" TEXT;

-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
ADD COLUMN     "softwareLabel" TEXT NOT NULL,
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("clientId", "softwareLabel", "label");

-- AlterTable
ALTER TABLE "Project_Attachment" DROP COLUMN "projectName",
ADD COLUMN     "projectLabel" TEXT,
ADD COLUMN     "projectSoftwareLabel" TEXT;

-- AlterTable
ALTER TABLE "Project_Book" DROP CONSTRAINT "Project_Book_pkey",
ADD COLUMN     "projectSoftwareLabel" TEXT NOT NULL,
ADD CONSTRAINT "Project_Book_pkey" PRIMARY KEY ("clientId", "label", "projectLabel", "projectSoftwareLabel");

-- AlterTable
ALTER TABLE "Project_Chapter" DROP CONSTRAINT "Project_Chapter_pkey",
ADD COLUMN     "projectSoftwareLabel" TEXT NOT NULL,
ADD CONSTRAINT "Project_Chapter_pkey" PRIMARY KEY ("bookLabel", "clientId", "projectLabel", "projectSoftwareLabel", "level_1", "level_2", "level_3");

-- AlterTable
ALTER TABLE "Project_Input" DROP CONSTRAINT "Project_Input_pkey",
ADD COLUMN     "projectSoftwareLabel" TEXT NOT NULL,
ADD CONSTRAINT "Project_Input_pkey" PRIMARY KEY ("clientId", "bookLabel", "projectLabel", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3", "label", "projectSoftwareLabel");

-- AlterTable
ALTER TABLE "Project_Option" DROP CONSTRAINT "Project_Option_pkey",
ADD COLUMN     "projectSoftwareLabel" TEXT NOT NULL,
ADD CONSTRAINT "Project_Option_pkey" PRIMARY KEY ("clientId", "bookLabel", "inputLabel", "projectLabel", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3", "label", "version", "projectSoftwareLabel");

-- AlterTable
ALTER TABLE "Project_Value" DROP CONSTRAINT "Project_Value_pkey",
ADD COLUMN     "projectSoftwareLabel" TEXT NOT NULL,
ADD CONSTRAINT "Project_Value_pkey" PRIMARY KEY ("clientId", "bookLabel", "inputLabel", "projectLabel", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3", "version", "projectSoftwareLabel");

-- AlterTable
ALTER TABLE "Projet_Component" DROP CONSTRAINT "Projet_Component_pkey",
ADD COLUMN     "projectSoftwareLabel" TEXT NOT NULL,
ADD CONSTRAINT "Projet_Component_pkey" PRIMARY KEY ("bookLabel", "projectLabel", "clientId", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3", "projectSoftwareLabel");

-- AlterTable
ALTER TABLE "UserProject" DROP CONSTRAINT "UserProject_pkey",
ADD COLUMN     "projectSoftwareLabel" TEXT NOT NULL,
ADD CONSTRAINT "UserProject_pkey" PRIMARY KEY ("userId", "projectClientId", "projectLabel", "projectSoftwareLabel");

-- AlterTable
ALTER TABLE "Validation" DROP CONSTRAINT "Validation_pkey",
ADD COLUMN     "projectSoftwareLabel" TEXT NOT NULL,
ADD CONSTRAINT "Validation_pkey" PRIMARY KEY ("bookLabel", "userId", "clientId", "projectLabel", "projectSoftwareLabel");

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_projectClientId_projectLabel_projectSoftwareLa_fkey" FOREIGN KEY ("projectClientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Book" ADD CONSTRAINT "Project_Book_clientId_projectLabel_projectSoftwareLabel_fkey" FOREIGN KEY ("clientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Chapter" ADD CONSTRAINT "Project_Chapter_bookLabel_clientId_projectLabel_level_1_le_fkey" FOREIGN KEY ("bookLabel", "clientId", "projectLabel", "level_1", "level_2", "level_3", "projectSoftwareLabel") REFERENCES "Project_Chapter"("bookLabel", "clientId", "projectLabel", "level_1", "level_2", "level_3", "projectSoftwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Chapter" ADD CONSTRAINT "Project_Chapter_clientId_bookLabel_projectLabel_projectSof_fkey" FOREIGN KEY ("clientId", "bookLabel", "projectLabel", "projectSoftwareLabel") REFERENCES "Project_Book"("clientId", "label", "projectLabel", "projectSoftwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projet_Component" ADD CONSTRAINT "Projet_Component_bookLabel_projectLabel_clientId_chapterLe_fkey" FOREIGN KEY ("bookLabel", "projectLabel", "clientId", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3", "projectSoftwareLabel") REFERENCES "Project_Chapter"("bookLabel", "projectLabel", "clientId", "level_1", "level_2", "level_3", "projectSoftwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Input" ADD CONSTRAINT "Project_Input_bookLabel_projectLabel_clientId_chapterLevel_fkey" FOREIGN KEY ("bookLabel", "projectLabel", "clientId", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3", "projectSoftwareLabel") REFERENCES "Projet_Component"("bookLabel", "projectLabel", "clientId", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3", "projectSoftwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Value" ADD CONSTRAINT "Project_Value_clientId_bookLabel_projectLabel_chapterLevel_fkey" FOREIGN KEY ("clientId", "bookLabel", "projectLabel", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3", "inputLabel", "projectSoftwareLabel") REFERENCES "Project_Input"("clientId", "bookLabel", "projectLabel", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3", "label", "projectSoftwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Option" ADD CONSTRAINT "Project_Option_clientId_bookLabel_inputLabel_projectLabel__fkey" FOREIGN KEY ("clientId", "bookLabel", "inputLabel", "projectLabel", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3", "projectSoftwareLabel") REFERENCES "Project_Input"("clientId", "bookLabel", "label", "projectLabel", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3", "projectSoftwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dsn" ADD CONSTRAINT "Dsn_clientId_projectLabel_projectSoftwareLabel_fkey" FOREIGN KEY ("clientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logger" ADD CONSTRAINT "Logger_clientId_projectLabel_projectSoftwareLabel_fkey" FOREIGN KEY ("clientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Validation" ADD CONSTRAINT "Validation_bookLabel_clientId_projectLabel_projectSoftware_fkey" FOREIGN KEY ("bookLabel", "clientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project_Book"("label", "clientId", "projectLabel", "projectSoftwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Attachment" ADD CONSTRAINT "Project_Attachment_clientId_projectLabel_projectSoftwareLa_fkey" FOREIGN KEY ("clientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE SET NULL ON UPDATE CASCADE;
