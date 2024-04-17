-- CreateTable
CREATE TABLE "Project_Forum" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "processusSlug" TEXT NOT NULL,
    "rowSlug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_Forum_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel")
);

-- CreateTable
CREATE TABLE "Project_Chat_Message" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "forumId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_Chat_Message_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel")
);

-- AddForeignKey
ALTER TABLE "Project_Forum" ADD CONSTRAINT "Project_Forum_clientId_softwareLabel_projectLabel_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Chat_Message" ADD CONSTRAINT "Project_Chat_Message_clientId_softwareLabel_projectLabel_f_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "forumId") REFERENCES "Project_Forum"("clientId", "softwareLabel", "projectLabel", "id") ON DELETE CASCADE ON UPDATE CASCADE;
