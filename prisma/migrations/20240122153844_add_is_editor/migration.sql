-- AlterTable
ALTER TABLE "UserClient" ADD COLUMN     "isEditor" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "isAdministrator" SET DEFAULT false;
