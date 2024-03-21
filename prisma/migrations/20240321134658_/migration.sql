/*
  Warnings:

  - You are about to drop the `Validation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Validation" DROP CONSTRAINT "Validation_bookLabel_clientId_projectLabel_projectSoftware_fkey";

-- DropForeignKey
ALTER TABLE "Validation" DROP CONSTRAINT "Validation_userId_fkey";

-- DropTable
DROP TABLE "Validation";

-- CreateTable
CREATE TABLE "Project_Book_Validation" (
    "bookLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "projectSoftwareLabel" TEXT NOT NULL,
    "validation" BOOLEAN NOT NULL,
    "comment" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_Book_Validation_pkey" PRIMARY KEY ("bookLabel","userId","clientId","projectLabel","projectSoftwareLabel")
);

-- AddForeignKey
ALTER TABLE "Project_Book_Validation" ADD CONSTRAINT "Project_Book_Validation_bookLabel_clientId_projectLabel_pr_fkey" FOREIGN KEY ("bookLabel", "clientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project_Book"("label", "clientId", "projectLabel", "projectSoftwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Book_Validation" ADD CONSTRAINT "Project_Book_Validation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
