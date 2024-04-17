-- DropForeignKey
ALTER TABLE "Project_Forum" DROP CONSTRAINT "Project_Forum_clientId_softwareLabel_projectLabel_fkey";

-- AddForeignKey
ALTER TABLE "Project_Forum" ADD CONSTRAINT "Project_Forum_clientId_softwareLabel_projectLabel_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel") REFERENCES "Project"("clientId", "softwareLabel", "label") ON DELETE CASCADE ON UPDATE CASCADE;
