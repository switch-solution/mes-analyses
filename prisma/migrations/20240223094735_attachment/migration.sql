-- AlterTable
ALTER TABLE "Project_Attachment" ADD COLUMN     "accept" TEXT NOT NULL DEFAULT 'pdf',
ADD COLUMN     "multiple" BOOLEAN NOT NULL DEFAULT false;
