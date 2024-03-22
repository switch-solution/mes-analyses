/*
  Warnings:

  - The primary key for the `Client_Table` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Client_Table_Column` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Client_Table_Column_Value` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Software_Table` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `idcc` to the `Client_Table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idcc` to the `Client_Table_Column` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idcc` to the `Client_Table_Column_Value` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idcc` to the `Software_Table` table without a default value. This is not possible if the table is not empty.
  - Made the column `idcc` on table `Table` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Client_Table_Column" DROP CONSTRAINT "Client_Table_Column_tableId_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Client_Table_Column_Value" DROP CONSTRAINT "Client_Table_Column_Value_columnId_tableId_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Table" DROP CONSTRAINT "Table_idcc_fkey";

-- AlterTable
ALTER TABLE "Client_Table" DROP CONSTRAINT "Client_Table_pkey",
ADD COLUMN     "idcc" TEXT NOT NULL,
ADD CONSTRAINT "Client_Table_pkey" PRIMARY KEY ("id", "idcc", "clientId");

-- AlterTable
ALTER TABLE "Client_Table_Column" DROP CONSTRAINT "Client_Table_Column_pkey",
ADD COLUMN     "idcc" TEXT NOT NULL,
ADD CONSTRAINT "Client_Table_Column_pkey" PRIMARY KEY ("id", "tableId", "clientId", "idcc");

-- AlterTable
ALTER TABLE "Client_Table_Column_Value" DROP CONSTRAINT "Client_Table_Column_Value_pkey",
ADD COLUMN     "idcc" TEXT NOT NULL,
ADD CONSTRAINT "Client_Table_Column_Value_pkey" PRIMARY KEY ("id", "tableId", "columnId", "clientId", "idcc");

-- AlterTable
ALTER TABLE "Software_Table" DROP CONSTRAINT "Software_Table_pkey",
ADD COLUMN     "idcc" TEXT NOT NULL,
ADD CONSTRAINT "Software_Table_pkey" PRIMARY KEY ("id", "idcc", "clientId", "softwareLabel");

-- AlterTable
ALTER TABLE "Table" ALTER COLUMN "idcc" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Table" ADD CONSTRAINT "Client_Table_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Table" ADD CONSTRAINT "Software_Table_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Table_Column" ADD CONSTRAINT "Client_Table_Column_tableId_clientId_idcc_fkey" FOREIGN KEY ("tableId", "clientId", "idcc") REFERENCES "Client_Table"("id", "clientId", "idcc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Table_Column_Value" ADD CONSTRAINT "Client_Table_Column_Value_columnId_tableId_clientId_idcc_fkey" FOREIGN KEY ("columnId", "tableId", "clientId", "idcc") REFERENCES "Client_Table_Column"("id", "tableId", "clientId", "idcc") ON DELETE RESTRICT ON UPDATE CASCADE;
