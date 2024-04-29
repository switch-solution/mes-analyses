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
    "limit" INTEGER NOT NULL,
    "apiKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "uuid" TEXT NOT NULL,

    CONSTRAINT "Client_API_pkey" PRIMARY KEY ("clientId","uuid")
);

-- CreateTable
CREATE TABLE "Client_API_Activity" (
    "clientId" TEXT NOT NULL,
    "uuidApi" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Client_API_Activity_pkey" PRIMARY KEY ("clientId","uuidApi","url","createdAt")
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "comment" TEXT,

    CONSTRAINT "Software_Setting_pkey" PRIMARY KEY ("id","label","value","clientId","softwareLabel")
);

-- CreateTable
CREATE TABLE "Table_Seniority" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "url" TEXT,
    "extended" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,

    CONSTRAINT "Table_Seniority_pkey" PRIMARY KEY ("id","idcc")
);

-- CreateTable
CREATE TABLE "Table_Seniority_Row" (
    "id" TEXT NOT NULL,
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

    CONSTRAINT "Table_Seniority_Row_pkey" PRIMARY KEY ("id","tableId","idcc")
);

-- CreateTable
CREATE TABLE "Table_Keeping_Wage" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'Maladie',
    "label" TEXT NOT NULL,
    "url" TEXT,
    "idcc" TEXT NOT NULL,
    "extended" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,

    CONSTRAINT "Table_Keeping_Wage_pkey" PRIMARY KEY ("id","idcc")
);

-- CreateTable
CREATE TABLE "Table_Keeping_Wage_Row" (
    "id" TEXT NOT NULL,
    "deficiency" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
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
CREATE TABLE "Table_Wage" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT,
    "idcc" TEXT NOT NULL,
    "extended" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,

    CONSTRAINT "Table_Wage_pkey" PRIMARY KEY ("id","idcc")
);

-- CreateTable
CREATE TABLE "Table_Wage_Row" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "coefficient" TEXT,
    "qualification" TEXT,
    "niveau" TEXT,
    "echelon" TEXT,
    "indice" TEXT,
    "position" TEXT,
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
    "status" TEXT NOT NULL DEFAULT 'Actif',
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
    "ape" TEXT NOT NULL,
    "socialReason" TEXT NOT NULL DEFAULT 'En attente',
    "address1" TEXT NOT NULL,
    "address2" TEXT DEFAULT '',
    "address3" TEXT DEFAULT '',
    "address4" TEXT DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "source" TEXT NOT NULL DEFAULT 'analyse',
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
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
CREATE TABLE "Project_Society_Archived" (
    "slug" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
    "ape" TEXT NOT NULL,
    "socialReason" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "address3" TEXT,
    "address4" TEXT,
    "status" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,

    CONSTRAINT "Project_Society_Archived_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","siren","version")
);

-- CreateTable
CREATE TABLE "Project_Payrool_Item" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "population" TEXT,
    "idcc" TEXT,
    "example1" TEXT,
    "example2" TEXT,
    "example3" TEXT,
    "example4" TEXT,
    "example5" TEXT,
    "clientId" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "societyId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "base" TEXT,
    "baseDetail" TEXT,
    "rate" TEXT,
    "rateDetail" TEXT,
    "coefficient" TEXT,
    "coefficientDetail" TEXT,
    "amount" TEXT,
    "amountDetail" TEXT,
    "contributionBase" TEXT,
    "contributionBaseDetail" TEXT,
    "contributionRateEmployee" TEXT,
    "contributionRateEmployeeDetail" TEXT,
    "contributionRateEmployerDetail" TEXT,
    "contributionRateEmployer" TEXT,
    "projectLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Payrool_Item_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel")
);

-- CreateTable
CREATE TABLE "Project_Absence" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "dsnId" TEXT,
    "method" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "population" TEXT,
    "description" TEXT,
    "clientId" TEXT NOT NULL,
    "settlement" TEXT,
    "slug" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "projectLabel" TEXT NOT NULL,
    "isSocialSecurity" BOOLEAN NOT NULL DEFAULT false,
    "softwareLabel" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'analyse',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Absence_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel")
);

-- CreateTable
CREATE TABLE "Project_Society_Absence" (
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "absenceId" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_Society_Absence_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","societyId","absenceId")
);

-- CreateTable
CREATE TABLE "Project_Absence_Archived" (
    "slug" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "dsnId" TEXT,
    "method" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "population" TEXT,
    "description" TEXT,
    "clientId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "isSocialSecurity" BOOLEAN NOT NULL DEFAULT false,
    "softwareLabel" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'analyse',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "version" INTEGER NOT NULL,

    CONSTRAINT "Project_Absence_Archived_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel","version")
);

-- CreateTable
CREATE TABLE "Project_Establishment" (
    "slug" TEXT NOT NULL,
    "id" TEXT NOT NULL DEFAULT 'En attente',
    "nic" TEXT NOT NULL,
    "ape" TEXT NOT NULL,
    "legalStatus" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "address1" TEXT NOT NULL,
    "socialReason" TEXT NOT NULL DEFAULT 'En attente',
    "address2" TEXT DEFAULT '',
    "address3" TEXT DEFAULT '',
    "address4" TEXT DEFAULT '',
    "postalCode" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "source" TEXT NOT NULL DEFAULT 'analyse',
    "city" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'France',
    "description" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "projectLabel" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,

    CONSTRAINT "Project_Establishment_pkey" PRIMARY KEY ("clientId","softwareLabel","societyId","projectLabel","nic")
);

-- CreateTable
CREATE TABLE "Project_Establishment_Archived" (
    "slug" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "nic" TEXT NOT NULL,
    "ape" TEXT NOT NULL,
    "legalStatus" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "socialReason" TEXT NOT NULL,
    "address2" TEXT,
    "address3" TEXT,
    "address4" TEXT,
    "postalCode" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,

    CONSTRAINT "Project_Establishment_Archived_pkey" PRIMARY KEY ("clientId","softwareLabel","societyId","projectLabel","nic","version")
);

-- CreateTable
CREATE TABLE "Project_Establishment_Idcc" (
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "source" TEXT NOT NULL DEFAULT 'analyse',
    "projectLabel" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "establishmentNic" TEXT NOT NULL,
    "isStandby" BOOLEAN NOT NULL DEFAULT false,
    "idcc" TEXT NOT NULL,

    CONSTRAINT "Project_Establishment_Idcc_pkey" PRIMARY KEY ("idcc","clientId","softwareLabel","projectLabel","societyId","establishmentNic")
);

-- CreateTable
CREATE TABLE "Project_Establishement_Rate_AT" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "establishmentNic" TEXT NOT NULL,
    "idRateAt" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Establishement_Rate_AT_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","societyId","establishmentNic","idRateAt")
);

-- CreateTable
CREATE TABLE "Project_Free_Zone" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "label" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Free_Zone_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel")
);

-- CreateTable
CREATE TABLE "Project_Free_Zone_Archived" (
    "slug" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL,
    "isPending" BOOLEAN NOT NULL,
    "isApproved" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
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
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "zoneId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Society_Free_Zone_pkey" PRIMARY KEY ("zoneId","clientId","softwareLabel","projectLabel","societyId")
);

-- CreateTable
CREATE TABLE "Project_Rate_AT" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'analyse',
    "label" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "projectLabel" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "softwareLabel" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "isStandby" BOOLEAN NOT NULL DEFAULT false,
    "rate" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER,
    "office" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "projectClientId" TEXT,
    "projectSoftwareLabel" TEXT,

    CONSTRAINT "Project_Rate_AT_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel")
);

-- CreateTable
CREATE TABLE "Project_Rate_Mobility" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "idInsee" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "projectClientId" TEXT,
    "projectSoftwareLabel" TEXT,

    CONSTRAINT "Project_Rate_Mobility_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","idInsee")
);

-- CreateTable
CREATE TABLE "Project_Establishment_Rate_Mobility" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "establishmentNic" TEXT NOT NULL,
    "idInsee" TEXT NOT NULL,

    CONSTRAINT "Project_Establishment_Rate_Mobility_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","societyId","establishmentNic","idInsee")
);

-- CreateTable
CREATE TABLE "Project_Idcc" (
    "idcc" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "extended" BOOLEAN NOT NULL DEFAULT false,
    "clientId" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "slug" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "source" TEXT NOT NULL DEFAULT 'analyse',
    "projectLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Idcc_pkey" PRIMARY KEY ("idcc","clientId","softwareLabel","projectLabel")
);

-- CreateTable
CREATE TABLE "Project_Idcc_Archived" (
    "slug" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "extended" BOOLEAN NOT NULL,
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Idcc_Archived_pkey" PRIMARY KEY ("idcc","clientId","softwareLabel","projectLabel","version")
);

-- CreateTable
CREATE TABLE "Project_Table_Seniority" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Project_Table_Seniority_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel","idcc")
);

-- CreateTable
CREATE TABLE "Project_Table_Seniority_Row" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "minMonth" INTEGER NOT NULL,
    "maxMonth" INTEGER NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Project_Table_Seniority_Row_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel","idcc","tableId")
);

-- CreateTable
CREATE TABLE "Project_Coefficient" (
    "level" TEXT NOT NULL DEFAULT 'Logiciel',
    "id" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "source" TEXT NOT NULL DEFAULT 'analyse',
    "description" TEXT,
    "idcc" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Coefficient_pkey" PRIMARY KEY ("id","idcc","projectLabel","clientId","softwareLabel")
);

-- CreateTable
CREATE TABLE "Project_Coefficient_Archived" (
    "id" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL,
    "isPending" BOOLEAN NOT NULL,
    "isOpen" BOOLEAN NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT,
    "idcc" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "version" INTEGER NOT NULL,

    CONSTRAINT "Project_Coefficient_Archived_pkey" PRIMARY KEY ("id","idcc","projectLabel","clientId","softwareLabel","version")
);

-- CreateTable
CREATE TABLE "Project_Bank" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "iban" TEXT NOT NULL,
    "bic" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Bank_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","iban")
);

-- CreateTable
CREATE TABLE "Project_Bank_Archived" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "iban" TEXT NOT NULL,
    "bic" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Bank_Archived_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","iban","version")
);

-- CreateTable
CREATE TABLE "Project_Establishment_Bank_Archived" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "establishmentNic" TEXT NOT NULL,
    "iban" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "societyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "salary" BOOLEAN NOT NULL,
    "contribution" BOOLEAN NOT NULL,
    "deposit" BOOLEAN NOT NULL,
    "expsense" BOOLEAN NOT NULL,

    CONSTRAINT "Project_Establishment_Bank_Archived_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","establishmentNic","iban","version")
);

-- CreateTable
CREATE TABLE "Project_Establishment_Bank" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "softwareLabel" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "establishmentNic" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "iban" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "salary" BOOLEAN NOT NULL DEFAULT false,
    "contribution" BOOLEAN NOT NULL DEFAULT false,
    "deposit" BOOLEAN NOT NULL DEFAULT false,
    "expsense" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Project_Establishment_Bank_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","societyId","establishmentNic","iban")
);

-- CreateTable
CREATE TABLE "Project_Qualification" (
    "id" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "source" TEXT NOT NULL DEFAULT 'analyse',
    "description" TEXT,
    "idcc" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Qualification_pkey" PRIMARY KEY ("id","idcc","projectLabel","clientId","softwareLabel")
);

-- CreateTable
CREATE TABLE "Project_Qualification_Archived" (
    "id" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL,
    "isPending" BOOLEAN NOT NULL,
    "idcc" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL,
    "version" INTEGER NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Qualification_Archived_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel","version")
);

-- CreateTable
CREATE TABLE "Project_Niveau" (
    "id" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "projectLabel" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "source" TEXT NOT NULL DEFAULT 'analyse',
    "description" TEXT,
    "idcc" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Niveau_pkey" PRIMARY KEY ("id","idcc","projectLabel","clientId","softwareLabel")
);

-- CreateTable
CREATE TABLE "Project_Niveau_Archived" (
    "id" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL,
    "isPending" BOOLEAN NOT NULL,
    "idcc" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL,
    "version" INTEGER NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Niveau_Archived_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel","version")
);

-- CreateTable
CREATE TABLE "Project_Indice" (
    "id" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "source" TEXT NOT NULL DEFAULT 'analyse',
    "description" TEXT,
    "idcc" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Indice_pkey" PRIMARY KEY ("id","idcc","projectLabel","clientId","softwareLabel")
);

-- CreateTable
CREATE TABLE "Project_Indice_Archived" (
    "id" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL,
    "isPending" BOOLEAN NOT NULL,
    "idcc" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL,
    "version" INTEGER NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Indice_Archived_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel","version")
);

-- CreateTable
CREATE TABLE "Project_Echelon" (
    "id" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "source" TEXT NOT NULL DEFAULT 'analyse',
    "description" TEXT,
    "idcc" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Echelon_pkey" PRIMARY KEY ("id","idcc","projectLabel","clientId","softwareLabel")
);

-- CreateTable
CREATE TABLE "Project_Echelon_Archived" (
    "id" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL,
    "isPending" BOOLEAN NOT NULL,
    "idcc" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL,
    "version" INTEGER NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Echelon_Archived_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel","version")
);

-- CreateTable
CREATE TABLE "Project_Establishment_Paid_Leave" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "establishmentNic" TEXT NOT NULL,
    "idPaidLeave" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Establishment_Paid_Leave_pkey" PRIMARY KEY ("idPaidLeave","clientId","softwareLabel","projectLabel","establishmentNic","societyId")
);

-- CreateTable
CREATE TABLE "Project_Paid_Leave" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "label" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "source" TEXT NOT NULL DEFAULT 'analyse',
    "projectLabel" TEXT NOT NULL,
    "periodEndDate" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "valuationLeave" TEXT NOT NULL,
    "roudingMethod" TEXT NOT NULL,
    "roudingMethodLeave" TEXT NOT NULL,
    "valuation" TEXT NOT NULL,
    "tableSeniority" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_Paid_Leave_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel")
);

-- CreateTable
CREATE TABLE "Project_Paid_Leave_Archived" (
    "slug" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL,
    "isPending" BOOLEAN NOT NULL,
    "isOpen" BOOLEAN NOT NULL,
    "label" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "periodEndDate" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "valuationLeave" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "roudingMethod" TEXT NOT NULL,
    "roudingMethodLeave" TEXT NOT NULL,
    "valuation" TEXT NOT NULL,
    "tableSeniority" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_Paid_Leave_Archived_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel","version")
);

-- CreateTable
CREATE TABLE "Project_Society_Job" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "societyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "jobId" TEXT NOT NULL,

    CONSTRAINT "Project_Society_Job_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","societyId","jobId")
);

-- CreateTable
CREATE TABLE "Project_Job" (
    "slug" TEXT NOT NULL,
    "id" TEXT NOT NULL DEFAULT 'En attente',
    "label" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "clientId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "source" TEXT NOT NULL DEFAULT 'analyse',
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,

    CONSTRAINT "Project_Job_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","id")
);

-- CreateTable
CREATE TABLE "Project_Job_Archived" (
    "slug" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "clientId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "version" INTEGER NOT NULL,

    CONSTRAINT "Project_Job_Archived_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","id","version")
);

-- CreateTable
CREATE TABLE "Project_Establishment_URSSAF" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "establishmentNic" TEXT NOT NULL,
    "URSSAFId" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Establishment_URSSAF_pkey" PRIMARY KEY ("URSSAFId","clientId","softwareLabel","projectLabel","establishmentNic","societyId")
);

-- CreateTable
CREATE TABLE "Project_URSSAF" (
    "slug" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "softwareLabel" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'analyse',
    "label" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "address1" TEXT NOT NULL,
    "address2" TEXT DEFAULT '',
    "address3" TEXT DEFAULT '',
    "address4" TEXT DEFAULT '',
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_URSSAF_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel")
);

-- CreateTable
CREATE TABLE "Project_URSSAF_Archived" (
    "slug" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "softwareLabel" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "status" TEXT NOT NULL,
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
    "version" INTEGER NOT NULL,

    CONSTRAINT "Project_URSSAF_Archived_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel","version")
);

-- CreateTable
CREATE TABLE "Project_Establishment_AGIRC_ARRCO" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "establishmentNic" TEXT NOT NULL,
    "AGIRC_ARRCOId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "project_EstablishmentClientId" TEXT,
    "project_EstablishmentSoftwareLabel" TEXT,
    "project_EstablishmentSocietyId" TEXT,
    "project_EstablishmentProjectLabel" TEXT,
    "project_EstablishmentNic" TEXT,

    CONSTRAINT "Project_Establishment_AGIRC_ARRCO_pkey" PRIMARY KEY ("AGIRC_ARRCOId","clientId","softwareLabel","projectLabel")
);

-- CreateTable
CREATE TABLE "Project_AGIRC_ARRCO" (
    "slug" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "softwareLabel" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'analyse',
    "label" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "address1" TEXT NOT NULL,
    "address2" TEXT DEFAULT '',
    "address3" TEXT DEFAULT '',
    "address4" TEXT DEFAULT '',
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_AGIRC_ARRCO_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel")
);

-- CreateTable
CREATE TABLE "Project_AGIRC_ARRCO_Archived" (
    "slug" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "address3" TEXT,
    "address4" TEXT,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_AGIRC_ARRCO_Archived_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel","version")
);

-- CreateTable
CREATE TABLE "Project_Establishment_Prevoyance" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "establishmentNic" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "prevoyanceId" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Establishment_Prevoyance_pkey" PRIMARY KEY ("prevoyanceId","clientId","softwareLabel","projectLabel","establishmentNic","societyId")
);

-- CreateTable
CREATE TABLE "Project_Prevoyance" (
    "slug" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "softwareLabel" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'analyse',
    "label" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "address1" TEXT NOT NULL,
    "address2" TEXT DEFAULT '',
    "address3" TEXT DEFAULT '',
    "address4" TEXT DEFAULT '',
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_Prevoyance_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel")
);

-- CreateTable
CREATE TABLE "Project_Prevoyance_Archived" (
    "slug" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'analyse',
    "label" TEXT NOT NULL,
    "status" TEXT NOT NULL,
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
    "version" INTEGER NOT NULL,

    CONSTRAINT "Project_Prevoyance_Archived_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel","version")
);

-- CreateTable
CREATE TABLE "Project_Establishment_Mutuelle" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "establishmentNic" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "mutuelleId" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Establishment_Mutuelle_pkey" PRIMARY KEY ("mutuelleId","clientId","softwareLabel","projectLabel","establishmentNic","societyId")
);

-- CreateTable
CREATE TABLE "Project_Mutuelle" (
    "slug" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "softwareLabel" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'analyse',
    "label" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "address1" TEXT NOT NULL,
    "address2" TEXT DEFAULT '',
    "address3" TEXT DEFAULT '',
    "address4" TEXT DEFAULT '',
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_Mutuelle_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel")
);

-- CreateTable
CREATE TABLE "Project_Mutuelle_Archived" (
    "slug" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'analyse',
    "label" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "address1" TEXT NOT NULL,
    "address2" TEXT DEFAULT '',
    "address3" TEXT DEFAULT '',
    "address4" TEXT DEFAULT '',
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "version" INTEGER NOT NULL,

    CONSTRAINT "Project_Mutuelle_Archived_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel","version")
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
CREATE TABLE "Project_Salary" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "baseType" TEXT,
    "base" TEXT,
    "rateType" TEXT,
    "rate" TEXT,
    "source" TEXT NOT NULL DEFAULT 'analyse',
    "amoutType" TEXT,
    "amount" TEXT,
    "slug" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Salary_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel")
);

-- CreateTable
CREATE TABLE "Project_Salary_Archived" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL,
    "baseType" TEXT,
    "base" TEXT,
    "rateType" TEXT,
    "version" INTEGER NOT NULL,
    "rate" TEXT,
    "amoutType" TEXT,
    "source" TEXT,
    "amount" TEXT,
    "slug" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL,
    "isPending" BOOLEAN NOT NULL,
    "isOpen" BOOLEAN NOT NULL,

    CONSTRAINT "Project_Salary_Archived_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel","version")
);

-- CreateTable
CREATE TABLE "Project_Contribution" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "baseType" TEXT NOT NULL,
    "base" TEXT NOT NULL,
    "rateTypeEmployee" TEXT NOT NULL,
    "rateEmployee" TEXT NOT NULL,
    "rateTypeEmployer" TEXT NOT NULL,
    "rateEmployer" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Contribution_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel")
);

-- CreateTable
CREATE TABLE "Project_Contribution_Archived" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL,
    "baseType" TEXT NOT NULL,
    "base" TEXT NOT NULL,
    "rateTypeEmployee" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "rateEmployee" TEXT NOT NULL,
    "rateTypeEmployer" TEXT NOT NULL,
    "rateEmployer" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL,
    "isPending" BOOLEAN NOT NULL,
    "isOpen" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_Contribution_Archived_pkey" PRIMARY KEY ("id","clientId","softwareLabel","projectLabel","version")
);

-- CreateTable
CREATE TABLE "Project_Society_Contribution" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "contributionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Society_Contribution_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","societyId","contributionId")
);

-- CreateTable
CREATE TABLE "Project_Society_Salary" (
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "salaryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Society_Salary_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","societyId","salaryId")
);

-- CreateTable
CREATE TABLE "Constant_Legal" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "idccCode" TEXT NOT NULL DEFAULT '9999',
    "value" TEXT NOT NULL,
    "extended" BOOLEAN NOT NULL DEFAULT false,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3),
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "sourceId" TEXT,

    CONSTRAINT "Constant_Legal_pkey" PRIMARY KEY ("id","dateStart")
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
CREATE TABLE "Processus" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'Standard',
    "description" TEXT,
    "theme" TEXT NOT NULL,
    "isTable" BOOLEAN NOT NULL DEFAULT false,
    "isTableSeniority" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL,
    "version" INTEGER NOT NULL,
    "clientId" TEXT,
    "softwareLabel" TEXT,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "isDuplicate" BOOLEAN NOT NULL DEFAULT false,
    "idOrigin" TEXT,

    CONSTRAINT "Processus_pkey" PRIMARY KEY ("id","version")
);

-- CreateTable
CREATE TABLE "Project_Processus" (
    "id" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "clientId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "processusSlug" TEXT NOT NULL,
    "description" TEXT,
    "projectLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL DEFAULT false,
    "isFinish" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT true,
    "isReopen" BOOLEAN NOT NULL DEFAULT false,
    "isProgress" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Non démarré',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "order" INTEGER NOT NULL,

    CONSTRAINT "Project_Processus_pkey" PRIMARY KEY ("clientId","projectLabel","softwareLabel","id","version")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "isCreate" BOOLEAN NOT NULL DEFAULT false,
    "isEdit" BOOLEAN NOT NULL DEFAULT false,
    "subForm" BOOLEAN NOT NULL DEFAULT false,
    "level" TEXT NOT NULL DEFAULT 'Standard',
    "description" TEXT,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "processusId" TEXT NOT NULL,
    "processusVersion" INTEGER NOT NULL,
    "isDuplicate" BOOLEAN NOT NULL DEFAULT false,
    "idOrigin" TEXT,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id","level")
);

-- CreateTable
CREATE TABLE "Form_Input_Overload" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "inputId" TEXT NOT NULL,
    "inputLabel" TEXT NOT NULL,
    "required" BOOLEAN,
    "readOnly" BOOLEAN,
    "disabled" BOOLEAN,
    "minLenght" INTEGER,
    "maxLenght" INTEGER,
    "min" INTEGER,
    "max" INTEGER,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Form_Input_Overload_pkey" PRIMARY KEY ("clientId","softwareLabel","id")
);

-- CreateTable
CREATE TABLE "Form_Input" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'Standard',
    "label" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "zodLabel" TEXT NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "placeholder" TEXT,
    "minLenght" INTEGER,
    "defaultValue" TEXT,
    "maxLenght" INTEGER,
    "min" INTEGER,
    "max" INTEGER,
    "selectTableSource" TEXT,
    "selectFieldSource" TEXT,
    "selectOption" TEXT,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "readOnly" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "order" INTEGER NOT NULL,

    CONSTRAINT "Form_Input_pkey" PRIMARY KEY ("id","level","formId","label")
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
    "description" TEXT,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Default_Setting_pkey" PRIMARY KEY ("id","label","value")
);

-- CreateTable
CREATE TABLE "Dsn_OPS" (
    "type" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "dsnId" TEXT,
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
    "blockNote" JSONB NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

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
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "slug" TEXT NOT NULL,
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
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT,
    "idcc" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Classification_pkey" PRIMARY KEY ("id","idcc","type")
);

-- CreateTable
CREATE TABLE "Dsn_Structure" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Dsn_Structure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project_Approve" (
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "processusSlug" TEXT NOT NULL,
    "rowSlug" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectSlug" TEXT NOT NULL,
    "clientSlug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isRefused" BOOLEAN NOT NULL DEFAULT false,
    "comment" TEXT,
    "slug" TEXT NOT NULL,
    "response" TEXT NOT NULL DEFAULT 'En attente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Approve_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","rowSlug","processusSlug","userId")
);

-- CreateTable
CREATE TABLE "Rate_At" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Rate_At_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project_Establishment_Service" (
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "establishmentNic" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Establishment_Service_pkey" PRIMARY KEY ("serviceId","clientId","softwareLabel","projectLabel","establishmentNic","societyId")
);

-- CreateTable
CREATE TABLE "Project_Service" (
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "description" TEXT,
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "highterLevel" TEXT,
    "label" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Service_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","id")
);

-- CreateTable
CREATE TABLE "Project_Service_Archieved" (
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "description" TEXT,
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "highterLevel" TEXT,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Project_Service_Archieved_pkey" PRIMARY KEY ("clientId","softwareLabel","projectLabel","id","version")
);

-- CreateTable
CREATE TABLE "Software_Processus" (
    "clientId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "processusId" TEXT NOT NULL,
    "processusVersion" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Software_Processus_pkey" PRIMARY KEY ("clientId","softwareLabel","processusId","processusVersion")
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
CREATE UNIQUE INDEX "Client_API_apiKey_key" ON "Client_API"("apiKey");

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
CREATE UNIQUE INDEX "Table_Seniority_Row_slug_key" ON "Table_Seniority_Row"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Table_Keeping_Wage_slug_key" ON "Table_Keeping_Wage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Table_Keeping_Wage_Row_slug_key" ON "Table_Keeping_Wage_Row"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Table_Wage_slug_key" ON "Table_Wage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Table_Wage_Row_slug_key" ON "Table_Wage_Row"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Society_slug_key" ON "Project_Society"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Society_Archived_slug_key" ON "Project_Society_Archived"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Absence_slug_key" ON "Project_Absence"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Absence_Archived_slug_key" ON "Project_Absence_Archived"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Establishment_slug_key" ON "Project_Establishment"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Establishment_Archived_slug_key" ON "Project_Establishment_Archived"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Free_Zone_slug_key" ON "Project_Free_Zone"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Free_Zone_Archived_slug_key" ON "Project_Free_Zone_Archived"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Society_Free_Zone_slug_key" ON "Project_Society_Free_Zone"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Rate_AT_slug_key" ON "Project_Rate_AT"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Idcc_slug_key" ON "Project_Idcc"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Idcc_Archived_slug_key" ON "Project_Idcc_Archived"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Table_Seniority_slug_key" ON "Project_Table_Seniority"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Table_Seniority_Row_slug_key" ON "Project_Table_Seniority_Row"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Coefficient_slug_key" ON "Project_Coefficient"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Coefficient_Archived_slug_key" ON "Project_Coefficient_Archived"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Bank_slug_key" ON "Project_Bank"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Bank_Archived_slug_key" ON "Project_Bank_Archived"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Establishment_Bank_slug_key" ON "Project_Establishment_Bank"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Qualification_slug_key" ON "Project_Qualification"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Qualification_Archived_slug_key" ON "Project_Qualification_Archived"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Niveau_slug_key" ON "Project_Niveau"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Niveau_Archived_slug_key" ON "Project_Niveau_Archived"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Indice_slug_key" ON "Project_Indice"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Indice_Archived_slug_key" ON "Project_Indice_Archived"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Echelon_slug_key" ON "Project_Echelon"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Echelon_Archived_slug_key" ON "Project_Echelon_Archived"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Paid_Leave_slug_key" ON "Project_Paid_Leave"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Paid_Leave_Archived_slug_key" ON "Project_Paid_Leave_Archived"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Job_slug_key" ON "Project_Job"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Job_Archived_slug_key" ON "Project_Job_Archived"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_URSSAF_slug_key" ON "Project_URSSAF"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_URSSAF_Archived_slug_key" ON "Project_URSSAF_Archived"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_AGIRC_ARRCO_slug_key" ON "Project_AGIRC_ARRCO"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_AGIRC_ARRCO_Archived_slug_key" ON "Project_AGIRC_ARRCO_Archived"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Prevoyance_slug_key" ON "Project_Prevoyance"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Prevoyance_Archived_slug_key" ON "Project_Prevoyance_Archived"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Mutuelle_slug_key" ON "Project_Mutuelle"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Mutuelle_Archived_slug_key" ON "Project_Mutuelle_Archived"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Salary_slug_key" ON "Project_Salary"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Contribution_slug_key" ON "Project_Contribution"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Contribution_Archived_slug_key" ON "Project_Contribution_Archived"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Constant_Legal_slug_key" ON "Constant_Legal"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Processus_slug_key" ON "Processus"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Processus_slug_key" ON "Project_Processus"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Form_slug_key" ON "Form"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Form_Input_slug_key" ON "Form_Input"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Absence_slug_key" ON "Software_Absence"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_DSN_slug_key" ON "Project_DSN"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Accumulation_slug_key" ON "Software_Accumulation"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Classification_slug_key" ON "Classification"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Approve_slug_key" ON "Project_Approve"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Service_slug_key" ON "Project_Service"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Service_Archieved_slug_key" ON "Project_Service_Archieved"("slug");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOtherData" ADD CONSTRAINT "UserOtherData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_API" ADD CONSTRAINT "Client_API_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_API_Activity" ADD CONSTRAINT "Client_API_Activity_clientId_uuidApi_fkey" FOREIGN KEY ("clientId", "uuidApi") REFERENCES "Client_API"("clientId", "uuid") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "Table_Seniority_Row" ADD CONSTRAINT "Table_Seniority_Row_tableId_idcc_fkey" FOREIGN KEY ("tableId", "idcc") REFERENCES "Table_Seniority"("id", "idcc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table_Keeping_Wage" ADD CONSTRAINT "Table_Keeping_Wage_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table_Keeping_Wage_Row" ADD CONSTRAINT "Table_Keeping_Wage_Row_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table_Keeping_Wage_Row" ADD CONSTRAINT "Table_Keeping_Wage_Row_tableId_idcc_fkey" FOREIGN KEY ("tableId", "idcc") REFERENCES "Table_Keeping_Wage"("id", "idcc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table_Wage" ADD CONSTRAINT "Table_Wage_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table_Wage_Row" ADD CONSTRAINT "Table_Wage_Row_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table_Wage_Row" ADD CONSTRAINT "Table_Wage_Row_tableId_idcc_fkey" FOREIGN KEY ("tableId", "idcc") REFERENCES "Table_Wage"("id", "idcc") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "Project_Society_Archived" ADD CONSTRAINT "Project_Society_Archived_clientId_softwareLabel_projectLab_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "siren") REFERENCES "Project_Society"("clientId", "softwareLabel", "projectLabel", "siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Payrool_Item" ADD CONSTRAINT "Project_Payrool_Item_projectLabel_softwareLabel_clientId_s_fkey" FOREIGN KEY ("projectLabel", "softwareLabel", "clientId", "societyId") REFERENCES "Project_Society"("projectLabel", "softwareLabel", "clientId", "siren") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Payrool_Item" ADD CONSTRAINT "Project_Payrool_Item_clientId_softwareLabel_projectLabel_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Absence" ADD CONSTRAINT "Project_Absence_clientId_softwareLabel_projectLabel_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel") REFERENCES "Project"("clientId", "softwareLabel", "label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Society_Absence" ADD CONSTRAINT "Society" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Society"("clientId", "softwareLabel", "projectLabel", "siren") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Society_Absence" ADD CONSTRAINT "Absence" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "absenceId") REFERENCES "Project_Absence"("clientId", "softwareLabel", "projectLabel", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Absence_Archived" ADD CONSTRAINT "Project_Absence_Archived_clientId_softwareLabel_projectLab_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "id") REFERENCES "Project_Absence"("clientId", "softwareLabel", "projectLabel", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment" ADD CONSTRAINT "Project_Establishment_clientId_softwareLabel_societyId_pro_fkey" FOREIGN KEY ("clientId", "softwareLabel", "societyId", "projectLabel") REFERENCES "Project_Society"("clientId", "softwareLabel", "siren", "projectLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment_Archived" ADD CONSTRAINT "Project_Establishment_Archived_clientId_softwareLabel_soci_fkey" FOREIGN KEY ("clientId", "softwareLabel", "societyId", "projectLabel", "nic") REFERENCES "Project_Establishment"("clientId", "softwareLabel", "societyId", "projectLabel", "nic") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment_Idcc" ADD CONSTRAINT "Project_Establishment_Idcc_idcc_clientId_softwareLabel_pro_fkey" FOREIGN KEY ("idcc", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Idcc"("idcc", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment_Idcc" ADD CONSTRAINT "Project_Establishment_Idcc_establishmentNic_clientId_softw_fkey" FOREIGN KEY ("establishmentNic", "clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Establishment"("nic", "clientId", "softwareLabel", "projectLabel", "societyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishement_Rate_AT" ADD CONSTRAINT "Project_Establishement_Rate_AT_establishmentNic_clientId_s_fkey" FOREIGN KEY ("establishmentNic", "clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Establishment"("nic", "clientId", "softwareLabel", "projectLabel", "societyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishement_Rate_AT" ADD CONSTRAINT "Project_Establishement_Rate_AT_clientId_softwareLabel_proj_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "idRateAt") REFERENCES "Project_Rate_AT"("clientId", "softwareLabel", "projectLabel", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Free_Zone_Archived" ADD CONSTRAINT "Project_Free_Zone_Archived_id_clientId_softwareLabel_proje_fkey" FOREIGN KEY ("id", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Free_Zone"("id", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Society_Free_Zone" ADD CONSTRAINT "Project_Society_Free_Zone_clientId_softwareLabel_projectLa_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Society"("clientId", "softwareLabel", "projectLabel", "siren") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Society_Free_Zone" ADD CONSTRAINT "Project_Society_Free_Zone_zoneId_clientId_softwareLabel_pr_fkey" FOREIGN KEY ("zoneId", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Free_Zone"("id", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Rate_AT" ADD CONSTRAINT "Project_Rate_AT_projectClientId_projectSoftwareLabel_proje_fkey" FOREIGN KEY ("projectClientId", "projectSoftwareLabel", "projectLabel") REFERENCES "Project"("clientId", "softwareLabel", "label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Rate_Mobility" ADD CONSTRAINT "Project_Rate_Mobility_projectClientId_projectSoftwareLabel_fkey" FOREIGN KEY ("projectClientId", "projectSoftwareLabel", "projectLabel") REFERENCES "Project"("clientId", "softwareLabel", "label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment_Rate_Mobility" ADD CONSTRAINT "Project_Establishment_Rate_Mobility_establishmentNic_clien_fkey" FOREIGN KEY ("establishmentNic", "clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Establishment"("nic", "clientId", "softwareLabel", "projectLabel", "societyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment_Rate_Mobility" ADD CONSTRAINT "Project_Establishment_Rate_Mobility_clientId_softwareLabel_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "idInsee") REFERENCES "Project_Rate_Mobility"("clientId", "softwareLabel", "projectLabel", "idInsee") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Idcc" ADD CONSTRAINT "Project_Idcc_clientId_softwareLabel_projectLabel_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel") REFERENCES "Project"("clientId", "softwareLabel", "label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Idcc_Archived" ADD CONSTRAINT "Project_Idcc_Archived_idcc_clientId_softwareLabel_projectL_fkey" FOREIGN KEY ("idcc", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Idcc"("idcc", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Table_Seniority" ADD CONSTRAINT "Project_Table_Seniority_idcc_clientId_softwareLabel_projec_fkey" FOREIGN KEY ("idcc", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Idcc"("idcc", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Table_Seniority_Row" ADD CONSTRAINT "Project_Table_Seniority_Row_tableId_clientId_softwareLabel_fkey" FOREIGN KEY ("tableId", "clientId", "softwareLabel", "projectLabel", "idcc") REFERENCES "Project_Table_Seniority"("id", "clientId", "softwareLabel", "projectLabel", "idcc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Coefficient" ADD CONSTRAINT "Project_Coefficient_idcc_clientId_softwareLabel_projectLab_fkey" FOREIGN KEY ("idcc", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Idcc"("idcc", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Coefficient_Archived" ADD CONSTRAINT "Project_Coefficient_Archived_id_idcc_projectLabel_clientId_fkey" FOREIGN KEY ("id", "idcc", "projectLabel", "clientId", "softwareLabel") REFERENCES "Project_Coefficient"("id", "idcc", "projectLabel", "clientId", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Bank" ADD CONSTRAINT "Project_Bank_clientId_projectLabel_softwareLabel_fkey" FOREIGN KEY ("clientId", "projectLabel", "softwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Bank_Archived" ADD CONSTRAINT "Project_Bank_Archived_clientId_projectLabel_softwareLabel__fkey" FOREIGN KEY ("clientId", "projectLabel", "softwareLabel", "iban") REFERENCES "Project_Bank"("clientId", "projectLabel", "softwareLabel", "iban") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment_Bank_Archived" ADD CONSTRAINT "Project_Establishment_Bank_Archived_clientId_softwareLabel_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "iban") REFERENCES "Project_Bank"("clientId", "softwareLabel", "projectLabel", "iban") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment_Bank_Archived" ADD CONSTRAINT "Project_Establishment_Bank_Archived_establishmentNic_clien_fkey" FOREIGN KEY ("establishmentNic", "clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Establishment"("nic", "clientId", "softwareLabel", "projectLabel", "societyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment_Bank" ADD CONSTRAINT "Project_Establishment_Bank_clientId_softwareLabel_projectL_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "iban") REFERENCES "Project_Bank"("clientId", "softwareLabel", "projectLabel", "iban") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment_Bank" ADD CONSTRAINT "Project_Establishment_Bank_establishmentNic_clientId_softw_fkey" FOREIGN KEY ("establishmentNic", "clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Establishment"("nic", "clientId", "softwareLabel", "projectLabel", "societyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Qualification" ADD CONSTRAINT "Project_Qualification_idcc_clientId_softwareLabel_projectL_fkey" FOREIGN KEY ("idcc", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Idcc"("idcc", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Qualification_Archived" ADD CONSTRAINT "Project_Qualification_Archived_id_idcc_projectLabel_client_fkey" FOREIGN KEY ("id", "idcc", "projectLabel", "clientId", "softwareLabel") REFERENCES "Project_Qualification"("id", "idcc", "projectLabel", "clientId", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Niveau" ADD CONSTRAINT "Project_Niveau_idcc_clientId_softwareLabel_projectLabel_fkey" FOREIGN KEY ("idcc", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Idcc"("idcc", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Niveau_Archived" ADD CONSTRAINT "Project_Niveau_Archived_id_idcc_projectLabel_clientId_soft_fkey" FOREIGN KEY ("id", "idcc", "projectLabel", "clientId", "softwareLabel") REFERENCES "Project_Niveau"("id", "idcc", "projectLabel", "clientId", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Indice" ADD CONSTRAINT "Project_Indice_idcc_clientId_softwareLabel_projectLabel_fkey" FOREIGN KEY ("idcc", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Idcc"("idcc", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Indice_Archived" ADD CONSTRAINT "Project_Indice_Archived_id_idcc_projectLabel_clientId_soft_fkey" FOREIGN KEY ("id", "idcc", "projectLabel", "clientId", "softwareLabel") REFERENCES "Project_Indice"("id", "idcc", "projectLabel", "clientId", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Echelon" ADD CONSTRAINT "Project_Echelon_idcc_clientId_softwareLabel_projectLabel_fkey" FOREIGN KEY ("idcc", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Idcc"("idcc", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Echelon_Archived" ADD CONSTRAINT "Project_Echelon_Archived_id_idcc_projectLabel_clientId_sof_fkey" FOREIGN KEY ("id", "idcc", "projectLabel", "clientId", "softwareLabel") REFERENCES "Project_Echelon"("id", "idcc", "projectLabel", "clientId", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment_Paid_Leave" ADD CONSTRAINT "Project_Establishment_Paid_Leave_establishmentNic_clientId_fkey" FOREIGN KEY ("establishmentNic", "clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Establishment"("nic", "clientId", "softwareLabel", "projectLabel", "societyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment_Paid_Leave" ADD CONSTRAINT "Project_Establishment_Paid_Leave_idPaidLeave_clientId_soft_fkey" FOREIGN KEY ("idPaidLeave", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Paid_Leave"("id", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Paid_Leave" ADD CONSTRAINT "Project_Paid_Leave_clientId_softwareLabel_projectLabel_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel") REFERENCES "Project"("clientId", "softwareLabel", "label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Paid_Leave_Archived" ADD CONSTRAINT "Project_Paid_Leave_Archived_id_clientId_softwareLabel_proj_fkey" FOREIGN KEY ("id", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Paid_Leave"("id", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Society_Job" ADD CONSTRAINT "Project_Society_Job_clientId_softwareLabel_projectLabel_so_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Society"("clientId", "softwareLabel", "projectLabel", "siren") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Society_Job" ADD CONSTRAINT "Project_Society_Job_clientId_softwareLabel_projectLabel_jo_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "jobId") REFERENCES "Project_Job"("clientId", "softwareLabel", "projectLabel", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Job" ADD CONSTRAINT "Project_Job_clientId_projectLabel_softwareLabel_fkey" FOREIGN KEY ("clientId", "projectLabel", "softwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Job_Archived" ADD CONSTRAINT "Project_Job_Archived_clientId_projectLabel_softwareLabel_i_fkey" FOREIGN KEY ("clientId", "projectLabel", "softwareLabel", "id") REFERENCES "Project_Job"("clientId", "projectLabel", "softwareLabel", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment_URSSAF" ADD CONSTRAINT "Project_Establishment_URSSAF_establishmentNic_clientId_sof_fkey" FOREIGN KEY ("establishmentNic", "clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Establishment"("nic", "clientId", "softwareLabel", "projectLabel", "societyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment_URSSAF" ADD CONSTRAINT "Project_Establishment_URSSAF_URSSAFId_clientId_softwareLab_fkey" FOREIGN KEY ("URSSAFId", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_URSSAF"("id", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment_AGIRC_ARRCO" ADD CONSTRAINT "Project_Establishment_AGIRC_ARRCO_AGIRC_ARRCOId_clientId_s_fkey" FOREIGN KEY ("AGIRC_ARRCOId", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_AGIRC_ARRCO"("id", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment_AGIRC_ARRCO" ADD CONSTRAINT "Project_Establishment_AGIRC_ARRCO_project_EstablishmentCli_fkey" FOREIGN KEY ("project_EstablishmentClientId", "project_EstablishmentSoftwareLabel", "project_EstablishmentSocietyId", "project_EstablishmentProjectLabel", "project_EstablishmentNic") REFERENCES "Project_Establishment"("clientId", "softwareLabel", "societyId", "projectLabel", "nic") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_AGIRC_ARRCO_Archived" ADD CONSTRAINT "Project_AGIRC_ARRCO_Archived_id_clientId_softwareLabel_pro_fkey" FOREIGN KEY ("id", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_AGIRC_ARRCO"("id", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment_Prevoyance" ADD CONSTRAINT "Project_Establishment_Prevoyance_establishmentNic_clientId_fkey" FOREIGN KEY ("establishmentNic", "clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Establishment"("nic", "clientId", "softwareLabel", "projectLabel", "societyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment_Prevoyance" ADD CONSTRAINT "Project_Establishment_Prevoyance_prevoyanceId_clientId_sof_fkey" FOREIGN KEY ("prevoyanceId", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Prevoyance"("id", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment_Mutuelle" ADD CONSTRAINT "Project_Establishment_Mutuelle_establishmentNic_clientId_s_fkey" FOREIGN KEY ("establishmentNic", "clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Establishment"("nic", "clientId", "softwareLabel", "projectLabel", "societyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment_Mutuelle" ADD CONSTRAINT "Project_Establishment_Mutuelle_mutuelleId_clientId_softwar_fkey" FOREIGN KEY ("mutuelleId", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Mutuelle"("id", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Mutuelle_Archived" ADD CONSTRAINT "Project_Mutuelle_Archived_id_clientId_softwareLabel_projec_fkey" FOREIGN KEY ("id", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Mutuelle"("id", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logger" ADD CONSTRAINT "Logger_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logger" ADD CONSTRAINT "Logger_clientId_projectLabel_projectSoftwareLabel_fkey" FOREIGN KEY ("clientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logger" ADD CONSTRAINT "Logger_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Salary" ADD CONSTRAINT "Project_Salary_clientId_softwareLabel_projectLabel_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel") REFERENCES "Project"("clientId", "softwareLabel", "label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Salary_Archived" ADD CONSTRAINT "Project_Salary_Archived_id_clientId_softwareLabel_projectL_fkey" FOREIGN KEY ("id", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Salary"("id", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Contribution" ADD CONSTRAINT "Project_Contribution_clientId_softwareLabel_projectLabel_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel") REFERENCES "Project"("clientId", "softwareLabel", "label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Contribution_Archived" ADD CONSTRAINT "Project_Contribution_Archived_id_clientId_softwareLabel_pr_fkey" FOREIGN KEY ("id", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Contribution"("id", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Society_Contribution" ADD CONSTRAINT "Society" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Society"("clientId", "softwareLabel", "projectLabel", "siren") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Society_Contribution" ADD CONSTRAINT "Contribution" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "contributionId") REFERENCES "Project_Contribution"("clientId", "softwareLabel", "projectLabel", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Society_Salary" ADD CONSTRAINT "Society" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Society"("clientId", "softwareLabel", "projectLabel", "siren") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Society_Salary" ADD CONSTRAINT "Salary" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "salaryId") REFERENCES "Project_Salary"("clientId", "softwareLabel", "projectLabel", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Constant_Legal" ADD CONSTRAINT "Constant_Legal_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Constant" ADD CONSTRAINT "Project_Constant_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Constant" ADD CONSTRAINT "Project_Constant_clientId_projectLabel_projectSoftwareLabe_fkey" FOREIGN KEY ("clientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Processus" ADD CONSTRAINT "Project_Processus_clientId_projectLabel_softwareLabel_fkey" FOREIGN KEY ("clientId", "projectLabel", "softwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_processusId_processusVersion_fkey" FOREIGN KEY ("processusId", "processusVersion") REFERENCES "Processus"("id", "version") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form_Input_Overload" ADD CONSTRAINT "Form_Input_Overload_clientId_softwareLabel_fkey" FOREIGN KEY ("clientId", "softwareLabel") REFERENCES "Software"("clientId", "label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form_Input_Overload" ADD CONSTRAINT "Form_Input_Overload_inputId_level_formId_label_fkey" FOREIGN KEY ("inputId", "level", "formId", "label") REFERENCES "Form_Input"("id", "level", "formId", "label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form_Input" ADD CONSTRAINT "Form_Input_formId_level_fkey" FOREIGN KEY ("formId", "level") REFERENCES "Form"("id", "level") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "Classification" ADD CONSTRAINT "Classification_idcc_fkey" FOREIGN KEY ("idcc") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Approve" ADD CONSTRAINT "Project_Approve_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Approve" ADD CONSTRAINT "Project_Approve_clientId_softwareLabel_projectLabel_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel") REFERENCES "Project"("clientId", "softwareLabel", "label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment_Service" ADD CONSTRAINT "Project_Establishment_Service_establishmentNic_clientId_so_fkey" FOREIGN KEY ("establishmentNic", "clientId", "softwareLabel", "projectLabel", "societyId") REFERENCES "Project_Establishment"("nic", "clientId", "softwareLabel", "projectLabel", "societyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Establishment_Service" ADD CONSTRAINT "Project_Establishment_Service_serviceId_clientId_softwareL_fkey" FOREIGN KEY ("serviceId", "clientId", "softwareLabel", "projectLabel") REFERENCES "Project_Service"("id", "clientId", "softwareLabel", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Service" ADD CONSTRAINT "Project_Service_clientId_softwareLabel_projectLabel_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel") REFERENCES "Project"("clientId", "softwareLabel", "label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Service_Archieved" ADD CONSTRAINT "Project_Service_Archieved_clientId_softwareLabel_projectLa_fkey" FOREIGN KEY ("clientId", "softwareLabel", "projectLabel", "id") REFERENCES "Project_Service"("clientId", "softwareLabel", "projectLabel", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Processus" ADD CONSTRAINT "Software_Processus_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Processus" ADD CONSTRAINT "Software_Processus_processusId_processusVersion_fkey" FOREIGN KEY ("processusId", "processusVersion") REFERENCES "Processus"("id", "version") ON DELETE RESTRICT ON UPDATE CASCADE;