-- AlterTable
ALTER TABLE "Software_Task" ADD COLUMN     "bookLabel" TEXT;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "bookLabel" TEXT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_bookLabel_fkey" FOREIGN KEY ("bookLabel") REFERENCES "Book"("label") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Task" ADD CONSTRAINT "Software_Task_bookLabel_softwareLabel_clientId_fkey" FOREIGN KEY ("bookLabel", "softwareLabel", "clientId") REFERENCES "Software_Book"("label", "softwareLabel", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;
