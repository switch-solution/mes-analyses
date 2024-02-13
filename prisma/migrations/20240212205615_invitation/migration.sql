-- AlterTable
ALTER TABLE "Invitation" ADD COLUMN     "isBillable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isBlocked" BOOLEAN NOT NULL DEFAULT false;
