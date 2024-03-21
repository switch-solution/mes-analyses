-- AlterTable
ALTER TABLE "Invitation" ADD COLUMN     "isAdministratorProject" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isEditorProject" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isValidatorProject" BOOLEAN NOT NULL DEFAULT false;
