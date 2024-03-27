-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "username" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOtherData" (
    "userId" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "password" TEXT,
    "civility" TEXT,
    "cgv" BOOLEAN NOT NULL DEFAULT false,
    "gdpr" BOOLEAN NOT NULL DEFAULT false,
    "isBlocked" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isInternal" BOOLEAN NOT NULL DEFAULT false,
    "isSetup" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserOtherData_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Client" (
    "slug" TEXT NOT NULL,
    "socialReason" TEXT NOT NULL,
    "dateStartTrial" TIMESTAMP(3),
    "dateEndTrial" TIMESTAMP(3),
    "siren" TEXT NOT NULL,
    "isBlocked" BOOLEAN NOT NULL,
    "invoiceStart" TIMESTAMP(3),
    "invoiceEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("siren")
);

-- CreateTable
CREATE TABLE "Client_API" (
    "clientId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "apiSecret" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Client_API_pkey" PRIMARY KEY ("clientId","label")
);

-- CreateTable
CREATE TABLE "UserClient" (
    "userId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "isBlocked" BOOLEAN NOT NULL,
    "isBillable" BOOLEAN NOT NULL,
    "defaultRole" TEXT NOT NULL,
    "isAdministrator" BOOLEAN NOT NULL DEFAULT false,
    "isEditor" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActivated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserClient_pkey" PRIMARY KEY ("userId","clientId")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "email" TEXT NOT NULL,
    "sendEmail" BOOLEAN NOT NULL,
    "civility" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "defaultRole" TEXT,
    "lastname" TEXT NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "isBillable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "isEditorProject" BOOLEAN NOT NULL DEFAULT false,
    "isAdministratorProject" BOOLEAN NOT NULL DEFAULT false,
    "isValidatorProject" BOOLEAN NOT NULL DEFAULT false,
    "isInternal" BOOLEAN NOT NULL DEFAULT false,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "projectLabel" TEXT,
    "projectSoftwareLabel" TEXT,
    "isAdministratorClient" BOOLEAN NOT NULL DEFAULT false,
    "isEditorClient" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("email","clientId")
);

-- CreateTable
CREATE TABLE "Project_Invitation" (
    "projectLabel" TEXT NOT NULL,
    "projectSoftwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isAdministrator" BOOLEAN NOT NULL DEFAULT false,
    "isEditor" BOOLEAN NOT NULL DEFAULT false,
    "isValidator" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_Invitation_pkey" PRIMARY KEY ("projectLabel","projectSoftwareLabel","clientId","email")
);

-- CreateTable
CREATE TABLE "Software" (
    "label" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Software_pkey" PRIMARY KEY ("label","clientId")
);

-- CreateTable
CREATE TABLE "UserSoftware" (
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isEditor" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "softwareLabel" TEXT NOT NULL,
    "softwareClientId" TEXT NOT NULL,
    "isActivated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserSoftware_pkey" PRIMARY KEY ("userId","softwareLabel","softwareClientId")
);

-- CreateTable
CREATE TABLE "Software_Items" (
    "id" TEXT NOT NULL,
    "idSoftware" TEXT,
    "slug" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "idccCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "base" TEXT,
    "rate" TEXT,
    "amount" TEXT,
    "status" TEXT,
    "employeeContribution" TEXT,
    "employerContribution" TEXT,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Software_Items_pkey" PRIMARY KEY ("id","type","softwareLabel","clientId","dateStart")
);

-- CreateTable
CREATE TABLE "Software_Setting" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "value" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "comment" TEXT,

    CONSTRAINT "Software_Setting_pkey" PRIMARY KEY ("id","label","value","dateStart","clientId","softwareLabel")
);

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
    "id" TEXT NOT NULL,
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
    "pourcentage" DOUBLE PRECISION NOT NULL,
    "coefficient" TEXT,
    "qualification" TEXT,
    "niveau" TEXT,
    "echelon" TEXT,
    "indice" TEXT,

    CONSTRAINT "Software_Table_Seniority_Row_pkey" PRIMARY KEY ("id","tableId","idcc","softwareLabel")
);

-- CreateTable
CREATE TABLE "Client_Table_Seniority_Row" (
    "level" TEXT NOT NULL DEFAULT 'client',
    "id" TEXT NOT NULL,
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
    "pourcentage" DOUBLE PRECISION NOT NULL,
    "coefficient" TEXT,
    "qualification" TEXT,
    "niveau" TEXT,
    "echelon" TEXT,
    "indice" TEXT,

    CONSTRAINT "Client_Table_Seniority_Row_pkey" PRIMARY KEY ("id","tableId","idcc")
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
    "pourcentage" DOUBLE PRECISION NOT NULL,
    "coefficient" TEXT,
    "qualification" TEXT,
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
    "schoolYear" INTEGER NOT NULL,
    "minMonth" INTEGER NOT NULL,
    "pourcentage" DOUBLE PRECISION NOT NULL,
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
    "schoolYear" INTEGER NOT NULL,
    "minMonth" INTEGER NOT NULL,
    "maxMonth" INTEGER NOT NULL,
    "pourcentage" DOUBLE PRECISION NOT NULL,
    "idcc" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,

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
    "schoolYear" INTEGER NOT NULL,
    "minMonth" INTEGER NOT NULL,
    "maxMonth" INTEGER NOT NULL,
    "idcc" TEXT NOT NULL,
    "pourcentage" DOUBLE PRECISION NOT NULL,
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
    "pourcentage" DOUBLE PRECISION NOT NULL,
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
    "pourcentage" DOUBLE PRECISION NOT NULL,
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
    "pourcentage" DOUBLE PRECISION NOT NULL,
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

-- CreateTable
CREATE TABLE "UserProject" (
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isEditor" BOOLEAN NOT NULL DEFAULT false,
    "isValidator" BOOLEAN NOT NULL DEFAULT false,
    "projectClientId" TEXT NOT NULL,
    "projectSoftwareLabel" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "role" TEXT,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserProject_pkey" PRIMARY KEY ("userId","projectClientId","projectLabel","projectSoftwareLabel")
);

-- CreateTable
CREATE TABLE "Project" (
    "clientId" TEXT NOT NULL,
    "logo" TEXT,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'actif',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("clientId","softwareLabel","label")
);

-- CreateTable
CREATE TABLE "Project_Society" (
    "slug" TEXT NOT NULL,
    "id" TEXT NOT NULL DEFAULT 'En attente',
    "siren" TEXT NOT NULL,
    "nic" TEXT NOT NULL,
    "ape" TEXT NOT NULL,
    "socialReason" TEXT NOT NULL DEFAULT 'En attente',
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "address3" TEXT,
    "address4" TEXT,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'France',
    "softwareLabel" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "projectLabel" TEXT NOT NULL,

    CONSTRAINT "Project_Society_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","siren")
);

-- CreateTable
CREATE TABLE "Project_Establishment" (
    "slug" TEXT NOT NULL,
    "id" TEXT NOT NULL DEFAULT 'En attente',
    "nic" TEXT NOT NULL,
    "ape" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "socialReason" TEXT NOT NULL DEFAULT 'En attente',
    "address2" TEXT,
    "address3" TEXT,
    "address4" TEXT,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'France',
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "projectLabel" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,

    CONSTRAINT "Project_Establishment_pkey" PRIMARY KEY ("clientId","softwareLabel","societyId","projectLabel","nic")
);

-- CreateTable
CREATE TABLE "Project_Establishment_Idcc" (
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "establishmentNic" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,

    CONSTRAINT "Project_Establishment_Idcc_pkey" PRIMARY KEY ("idcc","clientId","softwareLabel","projectLabel","societyId","establishmentNic")
);

-- CreateTable
CREATE TABLE "Project_Rate_AT" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "rate" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "office" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "establishmentNic" TEXT NOT NULL,

    CONSTRAINT "Project_Rate_AT_pkey" PRIMARY KEY ("id","clientId","societyId","establishmentNic","softwareLabel","projectLabel","order")
);

-- CreateTable
CREATE TABLE "Project_OPS" (
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "establishmentNic" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "address3" TEXT,
    "address4" TEXT,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_OPS_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","establishmentNic","type")
);

-- CreateTable
CREATE TABLE "Project_Idcc" (
    "idcc" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "establishmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "societyId" TEXT NOT NULL,

    CONSTRAINT "Project_Idcc_pkey" PRIMARY KEY ("idcc","clientId","softwareLabel","projectLabel","societyId")
);

-- CreateTable
CREATE TABLE "Project_Classification" (
    "level" TEXT NOT NULL DEFAULT 'Logiciel',
    "id" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "description" TEXT,
    "idcc" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Classification_pkey" PRIMARY KEY ("id","idcc","projectLabel","type","clientId","softwareLabel","societyId")
);

-- CreateTable
CREATE TABLE "Project_Paid_Leave" (
    "slug" TEXT NOT NULL,
    "establishmentNic" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "rule" TEXT NOT NULL,
    "periodStartDate" TIMESTAMP(3) NOT NULL,
    "periodEndDate" TIMESTAMP(3) NOT NULL,
    "method" TEXT NOT NULL,
    "valuation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_Paid_Leave_pkey" PRIMARY KEY ("establishmentNic","societyId","clientId","softwareLabel","projectLabel","rule")
);

-- CreateTable
CREATE TABLE "Project_Job" (
    "slug" TEXT NOT NULL,
    "id" TEXT NOT NULL DEFAULT 'En attente',
    "label" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "societyId" TEXT,
    "establishmentId" TEXT,
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,

    CONSTRAINT "Project_Job_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","label")
);

-- CreateTable
CREATE TABLE "Projet_OPS" (
    "slug" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "address2" TEXT,
    "address3" TEXT,
    "address4" TEXT,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "establishmentNic" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Projet_OPS_pkey" PRIMARY KEY ("id","clientId","societyId","softwareLabel","establishmentNic","projectLabel")
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "value" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "system" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id","label","dateStart","dateEnd")
);

-- CreateTable
CREATE TABLE "Logger" (
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "clientId" TEXT,
    "userId" TEXT,
    "projectSoftwareLabel" TEXT,
    "projectLabel" TEXT,

    CONSTRAINT "Logger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project_Items" (
    "id" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "projectSoftwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "idccCode" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "base" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "employeeContribution" TEXT NOT NULL,
    "employerContribution" TEXT NOT NULL,

    CONSTRAINT "Project_Items_pkey" PRIMARY KEY ("id","type","projectLabel","projectSoftwareLabel","clientId","version")
);

-- CreateTable
CREATE TABLE "Constant_Legal" (
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'Standard',
    "label" TEXT NOT NULL,
    "description" TEXT,
    "idccCode" TEXT NOT NULL DEFAULT '9999',
    "value" TEXT NOT NULL,
    "dateStart" TEXT NOT NULL,
    "softwareLabel" TEXT,
    "clientId" TEXT,
    "projectLabel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "sourceId" TEXT,

    CONSTRAINT "Constant_Legal_pkey" PRIMARY KEY ("id","level","dateStart")
);

-- CreateTable
CREATE TABLE "Client_Constant_Legal" (
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'Client',
    "label" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "description" TEXT,
    "idccCode" TEXT NOT NULL DEFAULT '9999',
    "value" TEXT NOT NULL,
    "dateStart" TEXT NOT NULL,
    "softwareLabel" TEXT,
    "projectLabel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "sourceId" TEXT,

    CONSTRAINT "Client_Constant_Legal_pkey" PRIMARY KEY ("id","level","dateStart","clientId")
);

-- CreateTable
CREATE TABLE "Software_Constant_Legal" (
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'Logiciel',
    "label" TEXT NOT NULL,
    "description" TEXT,
    "idccCode" TEXT NOT NULL DEFAULT '9999',
    "value" TEXT NOT NULL,
    "dateStart" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Software_Constant_Legal_pkey" PRIMARY KEY ("id","level","dateStart","clientId","softwareLabel")
);

-- CreateTable
CREATE TABLE "Project_Constant" (
    "code" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'Projet',
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "idccCode" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "dateStart" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "projectSoftwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_Constant_pkey" PRIMARY KEY ("code","dateStart","projectLabel","projectSoftwareLabel","clientId")
);

-- CreateTable
CREATE TABLE "Idcc" (
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Idcc_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Project_Attachment" (
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isObligatory" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "projectSoftwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "deliveryDeadline" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accept" TEXT NOT NULL DEFAULT 'pdf',
    "multiple" BOOLEAN NOT NULL DEFAULT false,
    "url" TEXT,
    "isDelivered" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Project_Attachment_pkey" PRIMARY KEY ("label","projectLabel","clientId")
);

-- CreateTable
CREATE TABLE "Processus" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'Standard',
    "description" TEXT,
    "formId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "formUrl" TEXT NOT NULL,
    "descriptionUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Processus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project_Processus" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "processusId" TEXT NOT NULL,
    "isStarted" BOOLEAN NOT NULL DEFAULT false,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Processus_pkey" PRIMARY KEY ("clientId","projectLabel","softwareLabel","processusId")
);

-- CreateTable
CREATE TABLE "Project_Client_Processus" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "processusId" TEXT NOT NULL,
    "isStarted" BOOLEAN NOT NULL DEFAULT false,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Client_Processus_pkey" PRIMARY KEY ("clientId","projectLabel","softwareLabel","processusId")
);

-- CreateTable
CREATE TABLE "Client_Processus" (
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'Client',
    "label" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "description" TEXT,
    "formUrl" TEXT NOT NULL,
    "descriptionUrl" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Client_Processus_pkey" PRIMARY KEY ("id","clientId")
);

-- CreateTable
CREATE TABLE "Project_Software_Processus" (
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "processusId" TEXT NOT NULL,
    "isStarted" BOOLEAN NOT NULL DEFAULT false,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Software_Processus_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","processusId")
);

-- CreateTable
CREATE TABLE "Software_Processus" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "formVersion" INTEGER NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'Logiciel',
    "description" TEXT,
    "formUrl" TEXT NOT NULL,
    "descriptionUrl" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Software_Processus_pkey" PRIMARY KEY ("id","softwareLabel","clientId")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'Standard',
    "description" TEXT,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL,
    "buttonLabel" TEXT NOT NULL DEFAULT 'Ajouter',
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id","version")
);

-- CreateTable
CREATE TABLE "Project_Form" (
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "formVersion" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Form_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","formId","formVersion")
);

-- CreateTable
CREATE TABLE "Project_Client_Form" (
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "formVersion" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Client_Form_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","formId","formVersion")
);

-- CreateTable
CREATE TABLE "Client_Form" (
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'Client',
    "label" TEXT NOT NULL,
    "description" TEXT,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL,
    "buttonLabel" TEXT NOT NULL DEFAULT 'Ajouter',
    "version" INTEGER NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Client_Form_pkey" PRIMARY KEY ("id","version","clientId")
);

-- CreateTable
CREATE TABLE "Software_Form" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'Logiciel',
    "description" TEXT,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL,
    "buttonLabel" TEXT NOT NULL DEFAULT 'Ajouter',
    "version" INTEGER NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Software_Form_pkey" PRIMARY KEY ("id","version","softwareLabel","clientId")
);

-- CreateTable
CREATE TABLE "Project_Software_Form" (
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "formVersion" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Software_Form_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","formId","formVersion")
);

-- CreateTable
CREATE TABLE "Form_Input" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "zodLabel" TEXT NOT NULL,
    "placeholder" TEXT,
    "minLenght" INTEGER,
    "defaultValue" TEXT,
    "maxLenght" INTEGER,
    "min" INTEGER,
    "max" INTEGER,
    "selectSource" TEXT,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "readOnly" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "formVersion" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Form_Input_pkey" PRIMARY KEY ("id","formId","formVersion","label")
);

-- CreateTable
CREATE TABLE "Client_Form_Input" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "zodLabel" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "minLenght" INTEGER,
    "maxLenght" INTEGER,
    "min" INTEGER,
    "defaultValue" TEXT,
    "max" INTEGER,
    "selectSource" TEXT,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "readOnly" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "placeholder" TEXT,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "formVersion" INTEGER NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Client_Form_Input_pkey" PRIMARY KEY ("id","formId","formVersion","label","clientId")
);

-- CreateTable
CREATE TABLE "Software_Form_Input" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "minLenght" INTEGER,
    "maxLenght" INTEGER,
    "min" INTEGER,
    "max" INTEGER,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "readOnly" BOOLEAN NOT NULL DEFAULT false,
    "zodLabel" TEXT NOT NULL,
    "selectSource" TEXT,
    "defaultValue" TEXT,
    "slug" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "placeholder" TEXT,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "formVersion" INTEGER NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Software_Form_Input_pkey" PRIMARY KEY ("id","formId","formVersion","label","softwareLabel","clientId")
);

-- CreateTable
CREATE TABLE "Prisma_Seed" (
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "previousLabel" TEXT NOT NULL,
    "error" TEXT,

    CONSTRAINT "Prisma_Seed_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Task" (
    "label" TEXT NOT NULL,
    "isSwitch" BOOLEAN NOT NULL DEFAULT false,
    "isUpload" BOOLEAN NOT NULL DEFAULT false,
    "accept" TEXT,
    "description" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "bookLabel" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("label")
);

-- CreateTable
CREATE TABLE "Client_Task" (
    "label" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "isSwitch" BOOLEAN NOT NULL DEFAULT false,
    "isUpload" BOOLEAN NOT NULL DEFAULT false,
    "accept" TEXT,
    "description" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'actif',
    "bookLabel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "owner" TEXT NOT NULL,
    "message" TEXT,
    "dateStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_Task_pkey" PRIMARY KEY ("label","clientId")
);

-- CreateTable
CREATE TABLE "Software_Task" (
    "label" TEXT NOT NULL,
    "isSwitch" BOOLEAN NOT NULL DEFAULT false,
    "isUpload" BOOLEAN NOT NULL DEFAULT false,
    "isObligatory" BOOLEAN NOT NULL DEFAULT false,
    "accept" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "multiple" BOOLEAN NOT NULL DEFAULT false,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Software_Task_pkey" PRIMARY KEY ("label","clientId","softwareLabel")
);

-- CreateTable
CREATE TABLE "Project_Task" (
    "label" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "isSwitch" BOOLEAN NOT NULL DEFAULT false,
    "isUpload" BOOLEAN NOT NULL DEFAULT false,
    "accept" TEXT,
    "description" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'actif',
    "projectLabel" TEXT NOT NULL,
    "bookLabel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "owner" TEXT NOT NULL,
    "message" TEXT,
    "dateStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_Task_pkey" PRIMARY KEY ("label","clientId","projectLabel","softwareLabel","owner")
);

-- CreateTable
CREATE TABLE "Absence" (
    "label" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isPrintable" BOOLEAN NOT NULL DEFAULT false,
    "dsnCode" TEXT,
    "dsnLabel" TEXT,
    "isSocialSecurity" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Absence_pkey" PRIMARY KEY ("label")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "nature" TEXT NOT NULL,
    "label" TEXT,
    "type" TEXT NOT NULL,
    "baseType" TEXT,
    "base" TEXT,
    "rateType" TEXT,
    "rate" TEXT,
    "coeffType" TEXT,
    "coeff" TEXT,
    "amountType" TEXT,
    "amount" TEXT,
    "employeeContributionType" TEXT,
    "employerContributionType" TEXT,
    "employerContribution" TEXT,
    "employeeContribution" TEXT,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id","type")
);

-- CreateTable
CREATE TABLE "Counter" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "inHours" BOOLEAN NOT NULL DEFAULT false,
    "inDays" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Counter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Software_Counter" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "inHours" BOOLEAN NOT NULL DEFAULT false,
    "inDays" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Software_Counter_pkey" PRIMARY KEY ("id","label","clientId","softwareLabel")
);

-- CreateTable
CREATE TABLE "Software_Profile" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Software_Profile_pkey" PRIMARY KEY ("id","label","clientId","softwareLabel")
);

-- CreateTable
CREATE TABLE "Software_Absence" (
    "label" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "description" TEXT,
    "isSocialSecurity" BOOLEAN NOT NULL DEFAULT false,
    "softwareLabel" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "dsnCode" TEXT,
    "dsnLabel" TEXT,
    "methodOfCalcul" TEXT NOT NULL,
    "population" TEXT,
    "itemHour" TEXT,
    "itemDay" TEXT,
    "counter" TEXT,
    "isPrintable" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Software_Absence_pkey" PRIMARY KEY ("label","id","clientId","softwareLabel")
);

-- CreateTable
CREATE TABLE "Default_Setting" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Default_Setting_pkey" PRIMARY KEY ("id","label")
);

-- CreateTable
CREATE TABLE "Dsn_OPS" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "address1" TEXT,
    "codeZip" TEXT,
    "city" TEXT,

    CONSTRAINT "Dsn_OPS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dsn_Absence" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Dsn_Absence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextArea" (
    "label" TEXT NOT NULL,
    "value" JSONB NOT NULL DEFAULT '{}',
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "package" TEXT NOT NULL,

    CONSTRAINT "TextArea_pkey" PRIMARY KEY ("label")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project_DSN" (
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "dsnDate" TEXT NOT NULL,
    "random" TEXT NOT NULL,
    "dsnSiret" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_DSN_pkey" PRIMARY KEY ("projectLabel","softwareLabel","clientId","dsnDate","dsnSiret")
);

-- CreateTable
CREATE TABLE "Project_DSN_Data" (
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "fraction" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "dsnDate" TEXT NOT NULL,
    "dsnSiret" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "siret" TEXT NOT NULL,
    "dsnId" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,

    CONSTRAINT "Project_DSN_Data_pkey" PRIMARY KEY ("projectLabel","softwareLabel","clientId","fraction","siret","dsnId","dsnDate","dsnSiret","uuid")
);

-- CreateTable
CREATE TABLE "Accumulation" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Accumulation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Software_Accumulation" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Software_Accumulation_pkey" PRIMARY KEY ("id","label","clientId","softwareLabel")
);

-- CreateTable
CREATE TABLE "Classification" (
    "level" TEXT NOT NULL DEFAULT 'Standard',
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "idIdcc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Classification_pkey" PRIMARY KEY ("id","idIdcc","type")
);

-- CreateTable
CREATE TABLE "Client_Classification" (
    "level" TEXT NOT NULL DEFAULT 'Client',
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "idIdcc" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Client_Classification_pkey" PRIMARY KEY ("id","idIdcc","type","clientId")
);

-- CreateTable
CREATE TABLE "Software_Classification" (
    "level" TEXT NOT NULL DEFAULT 'Logiciel',
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "idIdcc" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Software_Classification_pkey" PRIMARY KEY ("id","idIdcc","type","clientId","softwareLabel")
);

-- CreateTable
CREATE TABLE "Dsn_Structure" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Dsn_Structure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_slug_key" ON "Client"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Client_API_slug_key" ON "Client_API"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_email_key" ON "Invitation"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Software_slug_key" ON "Software"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Items_slug_key" ON "Software_Items"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Setting_slug_key" ON "Software_Setting"("slug");

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

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Society_slug_key" ON "Project_Society"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Establishment_slug_key" ON "Project_Establishment"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Rate_AT_slug_key" ON "Project_Rate_AT"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_OPS_slug_key" ON "Project_OPS"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Idcc_slug_key" ON "Project_Idcc"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Classification_slug_key" ON "Project_Classification"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Paid_Leave_slug_key" ON "Project_Paid_Leave"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Job_slug_key" ON "Project_Job"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Projet_OPS_slug_key" ON "Projet_OPS"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Constant_Legal_slug_key" ON "Constant_Legal"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Client_Constant_Legal_slug_key" ON "Client_Constant_Legal"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Constant_Legal_slug_key" ON "Software_Constant_Legal"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Attachment_slug_key" ON "Project_Attachment"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Processus_slug_key" ON "Processus"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Processus_formUrl_key" ON "Processus"("formUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Processus_descriptionUrl_key" ON "Processus"("descriptionUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Client_Processus_formUrl_key" ON "Client_Processus"("formUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Client_Processus_descriptionUrl_key" ON "Client_Processus"("descriptionUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Client_Processus_slug_key" ON "Client_Processus"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Processus_formUrl_key" ON "Software_Processus"("formUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Processus_descriptionUrl_key" ON "Software_Processus"("descriptionUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Processus_slug_key" ON "Software_Processus"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Form_slug_key" ON "Form"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Client_Form_slug_key" ON "Client_Form"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Form_slug_key" ON "Software_Form"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Form_Input_slug_key" ON "Form_Input"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Form_Input_formId_formVersion_id_order_key" ON "Form_Input"("formId", "formVersion", "id", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Client_Form_Input_slug_key" ON "Client_Form_Input"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Client_Form_Input_clientId_formId_formVersion_id_order_key" ON "Client_Form_Input"("clientId", "formId", "formVersion", "id", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Form_Input_slug_key" ON "Software_Form_Input"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Form_Input_clientId_softwareLabel_formId_formVersi_key" ON "Software_Form_Input"("clientId", "softwareLabel", "formId", "formVersion", "id", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Client_Task_slug_key" ON "Client_Task"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Task_slug_key" ON "Software_Task"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Task_slug_key" ON "Project_Task"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Absence_id_key" ON "Absence"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Absence_slug_key" ON "Software_Absence"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Accumulation_slug_key" ON "Software_Accumulation"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Client_Classification_slug_key" ON "Client_Classification"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Classification_slug_key" ON "Software_Classification"("slug");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOtherData" ADD CONSTRAINT "UserOtherData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_API" ADD CONSTRAINT "Client_API_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClient" ADD CONSTRAINT "UserClient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClient" ADD CONSTRAINT "UserClient_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Invitation" ADD CONSTRAINT "Project_Invitation_clientId_projectLabel_projectSoftwareLa_fkey" FOREIGN KEY ("clientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software" ADD CONSTRAINT "Software_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSoftware" ADD CONSTRAINT "UserSoftware_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSoftware" ADD CONSTRAINT "UserSoftware_softwareLabel_softwareClientId_fkey" FOREIGN KEY ("softwareLabel", "softwareClientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Items" ADD CONSTRAINT "Software_Items_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Items" ADD CONSTRAINT "Software_Items_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Setting" ADD CONSTRAINT "Software_Setting_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_projectClientId_projectLabel_projectSoftwareLa_fkey" FOREIGN KEY ("projectClientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Society" ADD CONSTRAINT "Project_Society_clientId_softwareLabel_projectLabel_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel") REFERENCES "Project"("clientId", "softwareLabel", "label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment" ADD CONSTRAINT "Project_Establishment_clientId_softwareLabel_societyId_pro_fkey" FOREIGN KEY ("clientId", "softwareLabel", "societyId", "projectLabel") REFERENCES "Project_Society"("clientId", "softwareLabel", "siren", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment_Idcc" ADD CONSTRAINT "Project_Establishment_Idcc_idcc_clientId_softwareLabel_pro_fkey" FOREIGN KEY ("idcc", "clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Idcc"("idcc", "clientId", "softwareLabel", "projectLabel", "societyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment_Idcc" ADD CONSTRAINT "Project_Establishment_Idcc_establishmentNic_clientId_softw_fkey" FOREIGN KEY ("establishmentNic", "clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Establishment"("nic", "clientId", "softwareLabel", "projectLabel", "societyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Rate_AT" ADD CONSTRAINT "Project_Rate_AT_establishmentNic_clientId_softwareLabel_pr_fkey" FOREIGN KEY ("establishmentNic", "clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Establishment"("nic", "clientId", "softwareLabel", "projectLabel", "societyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_OPS" ADD CONSTRAINT "Project_OPS_establishmentNic_clientId_softwareLabel_projec_fkey" FOREIGN KEY ("establishmentNic", "clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Establishment"("nic", "clientId", "softwareLabel", "projectLabel", "societyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Idcc" ADD CONSTRAINT "Project_Idcc_clientId_softwareLabel_projectLabel_societyId_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Society"("clientId", "softwareLabel", "projectLabel", "siren") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Classification" ADD CONSTRAINT "Project_Classification_idcc_clientId_softwareLabel_project_fkey" FOREIGN KEY ("idcc", "clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Idcc"("idcc", "clientId", "softwareLabel", "projectLabel", "societyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Paid_Leave" ADD CONSTRAINT "Project_Paid_Leave_establishmentNic_clientId_softwareLabel_fkey" FOREIGN KEY ("establishmentNic", "clientId", "softwareLabel", "societyId", "projectLabel") REFERENCES "Project_Establishment"("nic", "clientId", "softwareLabel", "societyId", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Job" ADD CONSTRAINT "Project_Job_clientId_softwareLabel_projectLabel_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projet_OPS" ADD CONSTRAINT "Projet_OPS_clientId_softwareLabel_projectLabel_establishme_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "establishmentNic", "societyId") REFERENCES "Project_Establishment"("clientId", "softwareLabel", "projectLabel", "nic", "societyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logger" ADD CONSTRAINT "Logger_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logger" ADD CONSTRAINT "Logger_clientId_projectLabel_projectSoftwareLabel_fkey" FOREIGN KEY ("clientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Items" ADD CONSTRAINT "Project_Items_projectLabel_projectSoftwareLabel_clientId_fkey" FOREIGN KEY ("projectLabel", "projectSoftwareLabel", "clientId") REFERENCES "Project"("label", "softwareLabel", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Items" ADD CONSTRAINT "Project_Items_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Constant_Legal" ADD CONSTRAINT "Constant_Legal_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Constant_Legal" ADD CONSTRAINT "Client_Constant_Legal_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Constant_Legal" ADD CONSTRAINT "Client_Constant_Legal_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Constant_Legal" ADD CONSTRAINT "Software_Constant_Legal_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Constant_Legal" ADD CONSTRAINT "Software_Constant_Legal_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Constant" ADD CONSTRAINT "Project_Constant_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Constant" ADD CONSTRAINT "Project_Constant_clientId_projectLabel_projectSoftwareLabe_fkey" FOREIGN KEY ("clientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Attachment" ADD CONSTRAINT "Project_Attachment_clientId_projectLabel_projectSoftwareLa_fkey" FOREIGN KEY ("clientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Processus" ADD CONSTRAINT "Project_Processus_clientId_projectLabel_softwareLabel_fkey" FOREIGN KEY ("clientId", "projectLabel", "softwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Processus" ADD CONSTRAINT "Project_Processus_processusId_fkey" FOREIGN KEY ("processusId") REFERENCES "Processus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Client_Processus" ADD CONSTRAINT "Project_Client_Processus_clientId_projectLabel_softwareLab_fkey" FOREIGN KEY ("clientId", "projectLabel", "softwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Client_Processus" ADD CONSTRAINT "Project_Client_Processus_processusId_clientId_fkey" FOREIGN KEY ("processusId", "clientId") REFERENCES "Client_Processus"("id", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Processus" ADD CONSTRAINT "Client_Processus_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Software_Processus" ADD CONSTRAINT "Project_Software_Processus_clientId_projectLabel_softwareL_fkey" FOREIGN KEY ("clientId", "projectLabel", "softwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Software_Processus" ADD CONSTRAINT "Project_Software_Processus_processusId_softwareLabel_clien_fkey" FOREIGN KEY ("processusId", "softwareLabel", "clientId") REFERENCES "Software_Processus"("id", "softwareLabel", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Form" ADD CONSTRAINT "Project_Form_formId_formVersion_fkey" FOREIGN KEY ("formId", "formVersion") REFERENCES "Form"("id", "version") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Form" ADD CONSTRAINT "Project_Form_clientId_projectLabel_softwareLabel_fkey" FOREIGN KEY ("clientId", "projectLabel", "softwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Client_Form" ADD CONSTRAINT "Project_Client_Form_formId_formVersion_clientId_fkey" FOREIGN KEY ("formId", "formVersion", "clientId") REFERENCES "Client_Form"("id", "version", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Client_Form" ADD CONSTRAINT "Project_Client_Form_clientId_projectLabel_softwareLabel_fkey" FOREIGN KEY ("clientId", "projectLabel", "softwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Form" ADD CONSTRAINT "Client_Form_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Form" ADD CONSTRAINT "Software_Form_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Software_Form" ADD CONSTRAINT "Project_Software_Form_formId_formVersion_softwareLabel_cli_fkey" FOREIGN KEY ("formId", "formVersion", "softwareLabel", "clientId") REFERENCES "Software_Form"("id", "version", "softwareLabel", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Software_Form" ADD CONSTRAINT "Project_Software_Form_clientId_projectLabel_softwareLabel_fkey" FOREIGN KEY ("clientId", "projectLabel", "softwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form_Input" ADD CONSTRAINT "Form_Input_formId_formVersion_fkey" FOREIGN KEY ("formId", "formVersion") REFERENCES "Form"("id", "version") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Form_Input" ADD CONSTRAINT "Client_Form_Input_formId_formVersion_clientId_fkey" FOREIGN KEY ("formId", "formVersion", "clientId") REFERENCES "Client_Form"("id", "version", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Form_Input" ADD CONSTRAINT "Software_Form_Input_formId_formVersion_softwareLabel_clien_fkey" FOREIGN KEY ("formId", "formVersion", "softwareLabel", "clientId") REFERENCES "Software_Form"("id", "version", "softwareLabel", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Task" ADD CONSTRAINT "Client_Task_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Task" ADD CONSTRAINT "Software_Task_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Task" ADD CONSTRAINT "Project_Task_clientId_projectLabel_softwareLabel_fkey" FOREIGN KEY ("clientId", "projectLabel", "softwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Task" ADD CONSTRAINT "Project_Task_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Counter" ADD CONSTRAINT "Software_Counter_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Profile" ADD CONSTRAINT "Software_Profile_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Absence" ADD CONSTRAINT "Software_Absence_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_DSN" ADD CONSTRAINT "Project_DSN_clientId_projectLabel_softwareLabel_fkey" FOREIGN KEY ("clientId", "projectLabel", "softwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_DSN_Data" ADD CONSTRAINT "Project_DSN_Data_projectLabel_softwareLabel_clientId_dsnDa_fkey" FOREIGN KEY ("projectLabel", "softwareLabel", "clientId", "dsnDate", "dsnSiret") REFERENCES "Project_DSN"("projectLabel", "softwareLabel", "clientId", "dsnDate", "dsnSiret") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Accumulation" ADD CONSTRAINT "Software_Accumulation_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classification" ADD CONSTRAINT "Classification_idIdcc_fkey" FOREIGN KEY ("idIdcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Classification" ADD CONSTRAINT "Client_Classification_idIdcc_fkey" FOREIGN KEY ("idIdcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Classification" ADD CONSTRAINT "Client_Classification_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Classification" ADD CONSTRAINT "Software_Classification_idIdcc_fkey" FOREIGN KEY ("idIdcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Classification" ADD CONSTRAINT "Software_Classification_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;
