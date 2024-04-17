/*
  Warnings:

  - The primary key for the `Client_API_Activity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `pathname` on the `Client_API_Activity` table. All the data in the column will be lost.
  - Added the required column `url` to the `Client_API_Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client_API_Activity" DROP CONSTRAINT "Client_API_Activity_pkey",
DROP COLUMN "pathname",
ADD COLUMN     "url" TEXT NOT NULL,
ADD CONSTRAINT "Client_API_Activity_pkey" PRIMARY KEY ("clientId", "uuidApi", "url", "createdAt");
