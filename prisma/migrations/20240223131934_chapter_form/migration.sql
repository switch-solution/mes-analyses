-- AlterTable
ALTER TABLE "Chapter" ALTER COLUMN "createdBy" SET DEFAULT 'System';

-- CreateTable
CREATE TABLE "ChapterForm" (
    "level_1" INTEGER NOT NULL,
    "level_2" INTEGER NOT NULL,
    "level_3" INTEGER NOT NULL,
    "bookLabel" TEXT NOT NULL,
    "formTitle" TEXT NOT NULL,
    "formType" TEXT NOT NULL,
    "formVersion" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'System',

    CONSTRAINT "ChapterForm_pkey" PRIMARY KEY ("bookLabel","level_1","level_2","level_3","formTitle","formType","formVersion")
);

-- AddForeignKey
ALTER TABLE "ChapterForm" ADD CONSTRAINT "ChapterForm_bookLabel_level_1_level_2_level_3_fkey" FOREIGN KEY ("bookLabel", "level_1", "level_2", "level_3") REFERENCES "Chapter"("bookLabel", "level_1", "level_2", "level_3") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterForm" ADD CONSTRAINT "ChapterForm_formTitle_formType_formVersion_fkey" FOREIGN KEY ("formTitle", "formType", "formVersion") REFERENCES "Form"("title", "type", "version") ON DELETE RESTRICT ON UPDATE CASCADE;
