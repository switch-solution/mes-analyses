-- AlterTable
ALTER TABLE "Standard_Chapter" ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "Standard_Chapter" ADD CONSTRAINT "Standard_Chapter_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Standard_Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
