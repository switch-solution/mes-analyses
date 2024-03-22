-- CreateTable
CREATE TABLE "Table_Seniority" (
    "level" TEXT NOT NULL DEFAULT 'Standard',
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,

    CONSTRAINT "Table_Seniority_pkey" PRIMARY KEY ("id","idcc")
);

-- CreateTable
CREATE TABLE "Client_Table_Seniority" (
    "level" TEXT NOT NULL DEFAULT 'client',
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,

    CONSTRAINT "Client_Table_Seniority_pkey" PRIMARY KEY ("id","idcc","clientId")
);

-- CreateTable
CREATE TABLE "Software_Table_Seniority" (
    "level" TEXT NOT NULL DEFAULT 'logiciel',
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,

    CONSTRAINT "Software_Table_Seniority_pkey" PRIMARY KEY ("id","idcc","clientId","softwareLabel")
);

-- CreateTable
CREATE TABLE "Software_Table_Seniority_Row" (
    "level" TEXT NOT NULL DEFAULT 'logiciel',
    "order" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,
    "minMonth" INTEGER NOT NULL,
    "maxMonth" INTEGER NOT NULL,
    "pourentage" TEXT NOT NULL,
    "coeffcient" TEXT,
    "niveau" TEXT,
    "echelon" TEXT,
    "indice" TEXT,

    CONSTRAINT "Software_Table_Seniority_Row_pkey" PRIMARY KEY ("order","tableId","idcc","softwareLabel")
);

-- CreateTable
CREATE TABLE "Client_Table_Seniority_Row" (
    "level" TEXT NOT NULL DEFAULT 'client',
    "order" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,
    "minMonth" INTEGER NOT NULL,
    "maxMonth" INTEGER NOT NULL,
    "pourentage" TEXT NOT NULL,
    "coeffcient" TEXT,
    "niveau" TEXT,
    "echelon" TEXT,
    "indice" TEXT,

    CONSTRAINT "Client_Table_Seniority_Row_pkey" PRIMARY KEY ("order","tableId","idcc")
);

-- CreateTable
CREATE TABLE "Table_Seniority_Row" (
    "level" TEXT NOT NULL DEFAULT 'Standard',
    "order" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,
    "minMonth" INTEGER NOT NULL,
    "maxMonth" INTEGER NOT NULL,
    "pourentage" TEXT NOT NULL,
    "coeffcient" TEXT,
    "niveau" TEXT,
    "echelon" TEXT,
    "indice" TEXT,

    CONSTRAINT "Table_Seniority_Row_pkey" PRIMARY KEY ("order","tableId","idcc")
);

-- CreateTable
CREATE TABLE "Table_Age" (
    "level" TEXT NOT NULL DEFAULT 'Standard',
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,

    CONSTRAINT "Table_Age_pkey" PRIMARY KEY ("id","idcc")
);

-- CreateTable
CREATE TABLE "Table_Age_Row" (
    "level" TEXT NOT NULL DEFAULT 'Standard',
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "schoolYear" TEXT NOT NULL,
    "minMonth" INTEGER NOT NULL,
    "maxMonth" INTEGER NOT NULL,
    "idcc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,

    CONSTRAINT "Table_Age_Row_pkey" PRIMARY KEY ("id","idcc","tableId")
);

-- CreateTable
CREATE TABLE "Client_Table_Age" (
    "level" TEXT NOT NULL DEFAULT 'client',
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,

    CONSTRAINT "Client_Table_Age_pkey" PRIMARY KEY ("id","idcc","clientId")
);

-- CreateTable
CREATE TABLE "Client_Table_Age_Row" (
    "level" TEXT NOT NULL DEFAULT 'client',
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "schoolYear" TEXT NOT NULL,
    "minMonth" INTEGER NOT NULL,
    "maxMonth" INTEGER NOT NULL,
    "idcc" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "software_Table_AgeId" TEXT,
    "software_Table_AgeIdcc" TEXT,
    "software_Table_AgeClientId" TEXT,
    "software_Table_AgeSoftwareLabel" TEXT,

    CONSTRAINT "Client_Table_Age_Row_pkey" PRIMARY KEY ("id","idcc","tableId","clientId")
);

-- CreateTable
CREATE TABLE "Software_Table_Age" (
    "level" TEXT NOT NULL DEFAULT 'logiciel',
    "id" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,

    CONSTRAINT "Software_Table_Age_pkey" PRIMARY KEY ("id","idcc","clientId","softwareLabel")
);

-- CreateTable
CREATE TABLE "Software_Table_Age_Row" (
    "level" TEXT NOT NULL DEFAULT 'logiciel',
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "schoolYear" TEXT NOT NULL,
    "minMonth" INTEGER NOT NULL,
    "maxMonth" INTEGER NOT NULL,
    "idcc" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,

    CONSTRAINT "Software_Table_Age_Row_pkey" PRIMARY KEY ("id","idcc","tableId","clientId","softwareLabel")
);

-- CreateTable
CREATE TABLE "Table_Keeping_Wage" (
    "level" TEXT NOT NULL DEFAULT 'Standard',
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,

    CONSTRAINT "Table_Keeping_Wage_pkey" PRIMARY KEY ("id","idcc")
);

-- CreateTable
CREATE TABLE "Table_Keeping_Wage_Row" (
    "level" TEXT NOT NULL DEFAULT 'Standard',
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "age" INTEGER,
    "population" TEXT,
    "deficiency" INTEGER NOT NULL,
    "minMonth" INTEGER NOT NULL,
    "maxMonth" INTEGER NOT NULL,
    "pourcentage" TEXT NOT NULL,
    "numberOfDay" INTEGER NOT NULL,
    "idcc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,

    CONSTRAINT "Table_Keeping_Wage_Row_pkey" PRIMARY KEY ("id","idcc","tableId")
);

-- CreateTable
CREATE TABLE "Client_Table_Keeping_Wage" (
    "level" TEXT NOT NULL DEFAULT 'client',
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,

    CONSTRAINT "Client_Table_Keeping_Wage_pkey" PRIMARY KEY ("id","idcc","clientId")
);

-- CreateTable
CREATE TABLE "Client_Table_Keeping_Wage_Row" (
    "level" TEXT NOT NULL DEFAULT 'client',
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "age" INTEGER,
    "population" TEXT,
    "deficiency" INTEGER NOT NULL,
    "minMonth" INTEGER NOT NULL,
    "clientId" TEXT NOT NULL,
    "maxMonth" INTEGER NOT NULL,
    "pourcentage" TEXT NOT NULL,
    "numberOfDay" INTEGER NOT NULL,
    "idcc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,

    CONSTRAINT "Client_Table_Keeping_Wage_Row_pkey" PRIMARY KEY ("id","idcc","tableId","clientId")
);

-- CreateTable
CREATE TABLE "Software_Table_Keeping_Wage" (
    "level" TEXT NOT NULL DEFAULT 'client',
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,

    CONSTRAINT "Software_Table_Keeping_Wage_pkey" PRIMARY KEY ("id","idcc","clientId","softwareLabel")
);

-- CreateTable
CREATE TABLE "Software_Table_Keeping_Wage_Row" (
    "level" TEXT NOT NULL DEFAULT 'client',
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "age" INTEGER,
    "population" TEXT,
    "deficiency" INTEGER NOT NULL,
    "minMonth" INTEGER NOT NULL,
    "clientId" TEXT NOT NULL,
    "maxMonth" INTEGER NOT NULL,
    "pourcentage" TEXT NOT NULL,
    "numberOfDay" INTEGER NOT NULL,
    "sofwateLabel" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,

    CONSTRAINT "Software_Table_Keeping_Wage_Row_pkey" PRIMARY KEY ("id","idcc","tableId","clientId","sofwateLabel")
);

-- CreateTable
CREATE TABLE "Table_Wage" (
    "level" TEXT NOT NULL DEFAULT 'Standard',
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,

    CONSTRAINT "Table_Wage_pkey" PRIMARY KEY ("id","idcc")
);

-- CreateTable
CREATE TABLE "Table_Wage_Row" (
    "level" TEXT NOT NULL DEFAULT 'Standard',
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "age" INTEGER,
    "population" TEXT,
    "minMonth" INTEGER NOT NULL,
    "maxMonth" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,

    CONSTRAINT "Table_Wage_Row_pkey" PRIMARY KEY ("id","idcc","tableId")
);

-- CreateTable
CREATE TABLE "Client_Table_Wage" (
    "level" TEXT NOT NULL DEFAULT 'client',
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,

    CONSTRAINT "Client_Table_Wage_pkey" PRIMARY KEY ("id","idcc","clientId")
);

-- CreateTable
CREATE TABLE "Client_Table_Wage_Row" (
    "level" TEXT NOT NULL DEFAULT 'client',
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "age" INTEGER,
    "population" TEXT,
    "minMonth" INTEGER NOT NULL,
    "clientId" TEXT NOT NULL,
    "maxMonth" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,

    CONSTRAINT "Client_Table_Wage_Row_pkey" PRIMARY KEY ("id","idcc","tableId","clientId")
);

-- CreateTable
CREATE TABLE "Software_Table_Wage" (
    "level" TEXT NOT NULL DEFAULT 'logiciel',
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,

    CONSTRAINT "Software_Table_Wage_pkey" PRIMARY KEY ("id","idcc","clientId","softwareLabel")
);

-- CreateTable
CREATE TABLE "Software_Table_Wage_Row" (
    "level" TEXT NOT NULL DEFAULT 'logiciel',
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "age" INTEGER,
    "population" TEXT,
    "minMonth" INTEGER NOT NULL,
    "clientId" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "maxMonth" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,

    CONSTRAINT "Software_Table_Wage_Row_pkey" PRIMARY KEY ("id","idcc","tableId","clientId","softwareLabel")
);

-- CreateIndex
CREATE UNIQUE INDEX "Table_Seniority_slug_key" ON "Table_Seniority"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Client_Table_Seniority_slug_key" ON "Client_Table_Seniority"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Table_Seniority_slug_key" ON "Software_Table_Seniority"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Table_Seniority_Row_slug_key" ON "Software_Table_Seniority_Row"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Client_Table_Seniority_Row_slug_key" ON "Client_Table_Seniority_Row"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Table_Seniority_Row_slug_key" ON "Table_Seniority_Row"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Table_Age_slug_key" ON "Table_Age"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Table_Age_Row_slug_key" ON "Table_Age_Row"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Client_Table_Age_slug_key" ON "Client_Table_Age"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Client_Table_Age_Row_slug_key" ON "Client_Table_Age_Row"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Table_Age_slug_key" ON "Software_Table_Age"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Table_Age_Row_slug_key" ON "Software_Table_Age_Row"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Table_Keeping_Wage_slug_key" ON "Table_Keeping_Wage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Table_Keeping_Wage_Row_slug_key" ON "Table_Keeping_Wage_Row"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Client_Table_Keeping_Wage_slug_key" ON "Client_Table_Keeping_Wage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Client_Table_Keeping_Wage_Row_slug_key" ON "Client_Table_Keeping_Wage_Row"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Table_Keeping_Wage_slug_key" ON "Software_Table_Keeping_Wage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Table_Keeping_Wage_Row_slug_key" ON "Software_Table_Keeping_Wage_Row"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Table_Wage_slug_key" ON "Table_Wage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Table_Wage_Row_slug_key" ON "Table_Wage_Row"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Client_Table_Wage_slug_key" ON "Client_Table_Wage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Client_Table_Wage_Row_slug_key" ON "Client_Table_Wage_Row"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Table_Wage_slug_key" ON "Software_Table_Wage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Table_Wage_Row_slug_key" ON "Software_Table_Wage_Row"("slug");

-- AddForeignKey
ALTER TABLE "Table_Seniority" ADD CONSTRAINT "Table_Seniority_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Table_Seniority" ADD CONSTRAINT "Client_Table_Seniority_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Table_Seniority" ADD CONSTRAINT "Client_Table_Seniority_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Table_Seniority" ADD CONSTRAINT "Software_Table_Seniority_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Table_Seniority" ADD CONSTRAINT "Software_Table_Seniority_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Table_Seniority_Row" ADD CONSTRAINT "Software_Table_Seniority_Row_tableId_clientId_idcc_softwar_fkey" FOREIGN KEY ("tableId", "clientId", "idcc", "softwareLabel") REFERENCES "Software_Table_Seniority"("id", "clientId", "idcc", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Table_Seniority_Row" ADD CONSTRAINT "Client_Table_Seniority_Row_tableId_clientId_idcc_fkey" FOREIGN KEY ("tableId", "clientId", "idcc") REFERENCES "Client_Table_Seniority"("id", "clientId", "idcc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table_Seniority_Row" ADD CONSTRAINT "Table_Seniority_Row_tableId_idcc_fkey" FOREIGN KEY ("tableId", "idcc") REFERENCES "Table_Seniority"("id", "idcc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table_Age" ADD CONSTRAINT "Table_Age_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table_Age_Row" ADD CONSTRAINT "Table_Age_Row_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table_Age_Row" ADD CONSTRAINT "Table_Age_Row_tableId_idcc_fkey" FOREIGN KEY ("tableId", "idcc") REFERENCES "Table_Age"("id", "idcc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Table_Age" ADD CONSTRAINT "Client_Table_Age_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Table_Age" ADD CONSTRAINT "Client_Table_Age_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Table_Age_Row" ADD CONSTRAINT "Client_Table_Age_Row_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Table_Age_Row" ADD CONSTRAINT "Client_Table_Age_Row_tableId_idcc_clientId_fkey" FOREIGN KEY ("tableId", "idcc", "clientId") REFERENCES "Client_Table_Age"("id", "idcc", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Table_Age_Row" ADD CONSTRAINT "Client_Table_Age_Row_software_Table_AgeId_software_Table_A_fkey" FOREIGN KEY ("software_Table_AgeId", "software_Table_AgeIdcc", "software_Table_AgeClientId", "software_Table_AgeSoftwareLabel") REFERENCES "Software_Table_Age"("id", "idcc", "clientId", "softwareLabel") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Table_Age" ADD CONSTRAINT "Software_Table_Age_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Table_Age" ADD CONSTRAINT "Software_Table_Age_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Table_Age_Row" ADD CONSTRAINT "Software_Table_Age_Row_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Table_Age_Row" ADD CONSTRAINT "Software_Table_Age_Row_tableId_idcc_clientId_softwareLabel_fkey" FOREIGN KEY ("tableId", "idcc", "clientId", "softwareLabel") REFERENCES "Software_Table_Age"("id", "idcc", "clientId", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table_Keeping_Wage" ADD CONSTRAINT "Table_Keeping_Wage_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table_Keeping_Wage_Row" ADD CONSTRAINT "Table_Keeping_Wage_Row_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table_Keeping_Wage_Row" ADD CONSTRAINT "Table_Keeping_Wage_Row_tableId_idcc_fkey" FOREIGN KEY ("tableId", "idcc") REFERENCES "Table_Keeping_Wage"("id", "idcc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Table_Keeping_Wage" ADD CONSTRAINT "Client_Table_Keeping_Wage_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Table_Keeping_Wage" ADD CONSTRAINT "Client_Table_Keeping_Wage_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Table_Keeping_Wage_Row" ADD CONSTRAINT "Client_Table_Keeping_Wage_Row_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Table_Keeping_Wage_Row" ADD CONSTRAINT "Client_Table_Keeping_Wage_Row_tableId_idcc_clientId_fkey" FOREIGN KEY ("tableId", "idcc", "clientId") REFERENCES "Client_Table_Keeping_Wage"("id", "idcc", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Table_Keeping_Wage" ADD CONSTRAINT "Software_Table_Keeping_Wage_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Table_Keeping_Wage" ADD CONSTRAINT "Software_Table_Keeping_Wage_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Table_Keeping_Wage_Row" ADD CONSTRAINT "Software_Table_Keeping_Wage_Row_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Table_Keeping_Wage_Row" ADD CONSTRAINT "Software_Table_Keeping_Wage_Row_tableId_idcc_clientId_sofw_fkey" FOREIGN KEY ("tableId", "idcc", "clientId", "sofwateLabel") REFERENCES "Software_Table_Keeping_Wage"("id", "idcc", "clientId", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table_Wage" ADD CONSTRAINT "Table_Wage_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table_Wage_Row" ADD CONSTRAINT "Table_Wage_Row_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table_Wage_Row" ADD CONSTRAINT "Table_Wage_Row_tableId_idcc_fkey" FOREIGN KEY ("tableId", "idcc") REFERENCES "Table_Wage"("id", "idcc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Table_Wage" ADD CONSTRAINT "Client_Table_Wage_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Table_Wage" ADD CONSTRAINT "Client_Table_Wage_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Table_Wage_Row" ADD CONSTRAINT "Client_Table_Wage_Row_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Table_Wage_Row" ADD CONSTRAINT "Client_Table_Wage_Row_tableId_idcc_clientId_fkey" FOREIGN KEY ("tableId", "idcc", "clientId") REFERENCES "Client_Table_Wage"("id", "idcc", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Table_Wage" ADD CONSTRAINT "Software_Table_Wage_clientId_softwareLabel_fkey" FOREIGN KEY ("clientId", "softwareLabel") REFERENCES "Software"("clientId", "label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Table_Wage" ADD CONSTRAINT "Software_Table_Wage_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Table_Wage_Row" ADD CONSTRAINT "Software_Table_Wage_Row_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Table_Wage_Row" ADD CONSTRAINT "Software_Table_Wage_Row_tableId_idcc_clientId_softwareLabe_fkey" FOREIGN KEY ("tableId", "idcc", "clientId", "softwareLabel") REFERENCES "Software_Table_Wage"("id", "idcc", "clientId", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;
