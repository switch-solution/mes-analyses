-- CreateTable
CREATE TABLE "Project_Free_Zone" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Free_Zone_pkey" PRIMARY KEY ("id","type","clientId","softwareLabel","projectLabel")
);

-- CreateTable
CREATE TABLE "Project_Free_Zone_Archived" (
    "slug" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "version" INTEGER NOT NULL,

    CONSTRAINT "Project_Free_Zone_Archived_pkey" PRIMARY KEY ("id","type","clientId","softwareLabel","projectLabel","version")
);

-- CreateTable
CREATE TABLE "Project_Society_Free_Zone" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "typeZone" TEXT NOT NULL,
    "idZone" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Society_Free_Zone_pkey" PRIMARY KEY ("idZone","typeZone","clientId","softwareLabel","projectLabel","societyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_Free_Zone_slug_key" ON "Project_Free_Zone"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Free_Zone_Archived_slug_key" ON "Project_Free_Zone_Archived"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Society_Free_Zone_slug_key" ON "Project_Society_Free_Zone"("slug");

-- AddForeignKey
ALTER TABLE "Project_Free_Zone_Archived" ADD CONSTRAINT "Project_Free_Zone_Archived_id_type_clientId_softwareLabel__fkey" FOREIGN KEY ("id", "type", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Free_Zone"("id", "type", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Society_Free_Zone" ADD CONSTRAINT "Project_Society_Free_Zone_clientId_softwareLabel_projectLa_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Society"("clientId", "softwareLabel", "projectLabel", "siren") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Society_Free_Zone" ADD CONSTRAINT "Project_Society_Free_Zone_idZone_typeZone_clientId_softwar_fkey" FOREIGN KEY ("idZone", "typeZone", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Free_Zone"("id", "type", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;
