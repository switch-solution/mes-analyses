/*
  Warnings:

  - The primary key for the `Dsn_OPS` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `codeDsn` on the `Dsn_OPS` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Dsn_OPS` table. All the data in the column will be lost.
  - Added the required column `id` to the `Dsn_OPS` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Dsn_OPS` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dsn_OPS" DROP CONSTRAINT "Dsn_OPS_pkey",
DROP COLUMN "codeDsn",
DROP COLUMN "name",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "label" TEXT NOT NULL,
ADD CONSTRAINT "Dsn_OPS_pkey" PRIMARY KEY ("id");
