/*
  Warnings:

  - You are about to drop the column `isFinished` on the `Project_Establishment_Idcc` table. All the data in the column will be lost.
  - Added the required column `status` to the `Project_Free_Zone_Archived` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project_Establishment_Idcc" DROP COLUMN "isFinished",
ADD COLUMN     "isOpen" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isPending" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Project_Free_Zone" ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isOpen" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isPending" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'En cours';

-- AlterTable
ALTER TABLE "Project_Free_Zone_Archived" ADD COLUMN     "status" TEXT NOT NULL;
