-- DropForeignKey
ALTER TABLE "Logger" DROP CONSTRAINT "Logger_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Logger" DROP CONSTRAINT "Logger_projetId_fkey";

-- AlterTable
ALTER TABLE "Logger" ALTER COLUMN "clientId" DROP NOT NULL,
ALTER COLUMN "projetId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Logger" ADD CONSTRAINT "Logger_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logger" ADD CONSTRAINT "Logger_projetId_fkey" FOREIGN KEY ("projetId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
