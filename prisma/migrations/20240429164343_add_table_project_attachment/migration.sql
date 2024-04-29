-- CreateTable
CREATE TABLE "Project_Attachment" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "downloadUrl" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "contentDisposition" TEXT NOT NULL,

    CONSTRAINT "Project_Attachment_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","url")
);

-- AddForeignKey
ALTER TABLE "Project_Attachment" ADD CONSTRAINT "Project_Attachment_clientId_projectLabel_softwareLabel_fkey" FOREIGN KEY ("clientId", "projectLabel", "softwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;
