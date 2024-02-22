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

    CONSTRAINT "UserOtherData_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Client" (
    "slug" TEXT NOT NULL,
    "socialReason" TEXT NOT NULL,
    "dateStartTrial" TIMESTAMP(3),
    "dateEndTrial" TIMESTAMP(3),
    "siren" TEXT NOT NULL,
    "ape" TEXT,
    "address1" TEXT,
    "address2" TEXT,
    "address3" TEXT,
    "address4" TEXT,
    "city" TEXT,
    "codeZip" TEXT,
    "country" TEXT,
    "invoiceAddress1" TEXT,
    "invoiceAddress2" TEXT,
    "invoiceAddress3" TEXT,
    "invoiceAddress4" TEXT,
    "invoiceCity" TEXT,
    "invoiceCodeZip" TEXT,
    "invoiceCountry" TEXT,
    "isBlocked" BOOLEAN NOT NULL,
    "invoiceStart" TIMESTAMP(3),
    "invoiceEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("siren")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "civility" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserClient" (
    "userId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "isBlocked" BOOLEAN NOT NULL,
    "isBillable" BOOLEAN NOT NULL,
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
    "firstName" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "isBillable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("email","clientId")
);

-- CreateTable
CREATE TABLE "Software" (
    "label" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Software_pkey" PRIMARY KEY ("label","clientId")
);

-- CreateTable
CREATE TABLE "UserSoftware" (
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isEditor" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "softwareClientId" TEXT NOT NULL,

    CONSTRAINT "UserSoftware_pkey" PRIMARY KEY ("userId","softwareLabel","softwareClientId")
);

-- CreateTable
CREATE TABLE "Standard_Book" (
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Standard_Book_pkey" PRIMARY KEY ("label","softwareLabel","clientId")
);

-- CreateTable
CREATE TABLE "Standard_Component" (
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "softwareId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,

    CONSTRAINT "Standard_Component_pkey" PRIMARY KEY ("title","softwareLabel","clientId","type")
);

-- CreateTable
CREATE TABLE "Standard_Component_Input" (
    "type" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "maxLength" INTEGER,
    "minLength" INTEGER,
    "minValue" INTEGER,
    "maxValue" INTEGER,
    "placeholder" TEXT,
    "order" INTEGER NOT NULL,
    "inputSource" TEXT,
    "isObligatory" BOOLEAN NOT NULL DEFAULT false,
    "defaultValue" TEXT,
    "required" BOOLEAN NOT NULL,
    "readonly" BOOLEAN NOT NULL,
    "multiple" BOOLEAN,
    "textArea" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "componentTitle" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "componentType" TEXT NOT NULL,

    CONSTRAINT "Standard_Component_Input_pkey" PRIMARY KEY ("componentTitle","softwareLabel","clientId","version","label")
);

-- CreateTable
CREATE TABLE "Standard_Component_TextArea" (
    "value" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "Standard_ComponentId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "componentTitle" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "componentType" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,

    CONSTRAINT "Standard_Component_TextArea_pkey" PRIMARY KEY ("componentTitle","softwareLabel","clientId","version","componentType")
);

-- CreateTable
CREATE TABLE "Standard_Component_Image" (
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "Standard_ComponentId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "componentTitle" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "componentType" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "device" TEXT NOT NULL,

    CONSTRAINT "Standard_Component_Image_pkey" PRIMARY KEY ("componentTitle","softwareLabel","clientId","version","componentType")
);

-- CreateTable
CREATE TABLE "Standard_Component_Select_Option" (
    "label" TEXT NOT NULL,
    "selected" BOOLEAN,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "componentTitle" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "inputVersion" INTEGER NOT NULL,
    "inputLabel" TEXT NOT NULL,

    CONSTRAINT "Standard_Component_Select_Option_pkey" PRIMARY KEY ("inputLabel","clientId","softwareLabel","inputVersion","componentTitle","label")
);

-- CreateTable
CREATE TABLE "Standard_Chapter" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "level_1" INTEGER NOT NULL,
    "level_2" INTEGER NOT NULL,
    "level_3" INTEGER NOT NULL,
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "bookLabel" TEXT NOT NULL,
    "bookSoftwareLabel" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "Standard_Chapter_pkey" PRIMARY KEY ("clientId","bookLabel","bookSoftwareLabel","level_1","level_2","level_3")
);

-- CreateTable
CREATE TABLE "ChapterStdComponent" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "componentTitle" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "componentType" TEXT NOT NULL,
    "bookLabel" TEXT NOT NULL,
    "bookSoftwareLabel" TEXT NOT NULL,
    "level_1" INTEGER NOT NULL,
    "level_2" INTEGER NOT NULL,
    "level_3" INTEGER NOT NULL,

    CONSTRAINT "ChapterStdComponent_pkey" PRIMARY KEY ("clientId","bookLabel","bookSoftwareLabel","level_1","level_2","level_3","componentTitle","softwareLabel","componentType")
);

-- CreateTable
CREATE TABLE "Project" (
    "clientId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'actif',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("clientId","label")
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
    "projectLabel" TEXT NOT NULL,

    CONSTRAINT "UserProject_pkey" PRIMARY KEY ("userId","projectClientId","projectLabel")
);

-- CreateTable
CREATE TABLE "Project_Book" (
    "label" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "softwareId" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_Book_pkey" PRIMARY KEY ("clientId","label","projectLabel")
);

-- CreateTable
CREATE TABLE "Project_Chapter" (
    "level_1" INTEGER NOT NULL,
    "level_2" INTEGER NOT NULL,
    "level_3" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "parentId" TEXT,
    "clientId" TEXT NOT NULL,
    "bookLabel" TEXT NOT NULL,
    "bookSoftwareId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_Chapter_pkey" PRIMARY KEY ("bookLabel","clientId","projectLabel","level_1","level_2","level_3")
);

-- CreateTable
CREATE TABLE "Projet_Component" (
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "chapterSlug" TEXT,
    "bookLabel" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "chapterLevel_1" INTEGER NOT NULL,
    "chapterLevel_2" INTEGER NOT NULL,
    "chapterLevel_3" INTEGER NOT NULL,

    CONSTRAINT "Projet_Component_pkey" PRIMARY KEY ("bookLabel","projectLabel","clientId","chapterLevel_1","chapterLevel_2","chapterLevel_3")
);

-- CreateTable
CREATE TABLE "Project_Input" (
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "maxLength" INTEGER,
    "minLength" INTEGER,
    "minValue" INTEGER,
    "maxValue" INTEGER,
    "placeholder" TEXT,
    "order" INTEGER NOT NULL,
    "defaultValue" TEXT,
    "required" BOOLEAN NOT NULL,
    "readonly" BOOLEAN NOT NULL,
    "inputSource" TEXT,
    "multiple" BOOLEAN,
    "textArea" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "bookLabel" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "chapterLevel_1" INTEGER NOT NULL,
    "chapterLevel_2" INTEGER NOT NULL,
    "chapterLevel_3" INTEGER NOT NULL,

    CONSTRAINT "Project_Input_pkey" PRIMARY KEY ("clientId","bookLabel","projectLabel","chapterLevel_1","chapterLevel_2","chapterLevel_3","label")
);

-- CreateTable
CREATE TABLE "Project_Value" (
    "slug" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "textValue" TEXT,
    "numberValue" INTEGER,
    "booleanValue" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "bookLabel" TEXT NOT NULL,
    "inputLabel" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "chapterLevel_1" INTEGER NOT NULL,
    "chapterLevel_2" INTEGER NOT NULL,
    "chapterLevel_3" INTEGER NOT NULL,

    CONSTRAINT "Project_Value_pkey" PRIMARY KEY ("clientId","bookLabel","inputLabel","projectLabel","chapterLevel_1","chapterLevel_2","chapterLevel_3","version")
);

-- CreateTable
CREATE TABLE "Project_Option" (
    "label" TEXT NOT NULL,
    "selected" BOOLEAN,
    "inputId" TEXT,
    "clientId" TEXT NOT NULL,
    "bookLabel" TEXT NOT NULL,
    "inputLabel" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "chapterLevel_1" INTEGER NOT NULL,
    "chapterLevel_2" INTEGER NOT NULL,
    "chapterLevel_3" INTEGER NOT NULL,
    "version" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Project_Option_pkey" PRIMARY KEY ("clientId","bookLabel","inputLabel","projectLabel","chapterLevel_1","chapterLevel_2","chapterLevel_3","label","version")
);

-- CreateTable
CREATE TABLE "Dsn" (
    "siren" TEXT NOT NULL,
    "nic" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "fraction" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Dsn_pkey" PRIMARY KEY ("siren","nic","month","version","fraction")
);

-- CreateTable
CREATE TABLE "DsnEstablishment" (
    "nic" TEXT NOT NULL,
    "apet" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "address3" TEXT,
    "codeZip" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'FR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "dsnSiren" TEXT NOT NULL,
    "dsnNic" TEXT NOT NULL,
    "dsnMonth" TEXT NOT NULL,
    "dsnVersion" TEXT NOT NULL,
    "dsnFraction" TEXT NOT NULL,

    CONSTRAINT "DsnEstablishment_pkey" PRIMARY KEY ("nic","dsnSiren","dsnNic","dsnMonth","dsnVersion","dsnFraction")
);

-- CreateTable
CREATE TABLE "DsnRateAt" (
    "code" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "dsnEstablishmentNic" TEXT NOT NULL,
    "dsnEstablishmentDsnSiren" TEXT NOT NULL,
    "dsnEstablishmentDsnNic" TEXT NOT NULL,
    "dsnEstablishmentDsnMonth" TEXT NOT NULL,
    "dsnEstablishmentDsnVersion" TEXT NOT NULL,
    "dsnEstablishmentDsnFraction" TEXT NOT NULL,

    CONSTRAINT "DsnRateAt_pkey" PRIMARY KEY ("code","dsnEstablishmentNic","dsnEstablishmentDsnSiren","dsnEstablishmentDsnNic","dsnEstablishmentDsnMonth","dsnEstablishmentDsnVersion","dsnEstablishmentDsnFraction")
);

-- CreateTable
CREATE TABLE "DsnContributionFund" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "address3" TEXT,
    "city" TEXT NOT NULL,
    "codeZip" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'FR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "dsnEstablishmentNic" TEXT NOT NULL,
    "dsnEstablishmentDsnSiren" TEXT NOT NULL,
    "dsnEstablishmentDsnNic" TEXT NOT NULL,
    "dsnEstablishmentDsnMonth" TEXT NOT NULL,
    "dsnEstablishmentDsnVersion" TEXT NOT NULL,
    "dsnEstablishmentDsnFraction" TEXT NOT NULL,

    CONSTRAINT "DsnContributionFund_pkey" PRIMARY KEY ("code","dsnEstablishmentNic","dsnEstablishmentDsnSiren","dsnEstablishmentDsnNic","dsnEstablishmentDsnMonth","dsnEstablishmentDsnVersion","dsnEstablishmentDsnFraction")
);

-- CreateTable
CREATE TABLE "DsnIdcc" (
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "dsnSiren" TEXT NOT NULL,
    "dsnNic" TEXT NOT NULL,
    "dsnMonth" TEXT NOT NULL,
    "dsnVersion" TEXT NOT NULL,
    "dsnFraction" TEXT NOT NULL,

    CONSTRAINT "DsnIdcc_pkey" PRIMARY KEY ("code","dsnSiren","dsnNic","dsnMonth","dsnVersion","dsnFraction")
);

-- CreateTable
CREATE TABLE "DsnJob" (
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "dsnSiren" TEXT NOT NULL,
    "dsnNic" TEXT NOT NULL,
    "dsnMonth" TEXT NOT NULL,
    "dsnVersion" TEXT NOT NULL,
    "dsnFraction" TEXT NOT NULL,

    CONSTRAINT "DsnJob_pkey" PRIMARY KEY ("label","dsnSiren","dsnNic","dsnMonth","dsnVersion","dsnFraction")
);

-- CreateTable
CREATE TABLE "Setting" (
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "value" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("code","dateStart","dateEnd")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "socialReason" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "dateLimit" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("clientId","dateStart","dateEnd")
);

-- CreateTable
CREATE TABLE "InvoiceLine" (
    "label" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "quantity" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "InvoiceLine_pkey" PRIMARY KEY ("label","clientId","dateStart","dateEnd")
);

-- CreateTable
CREATE TABLE "Logger" (
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "clientId" TEXT,
    "projectLabel" TEXT,

    CONSTRAINT "Logger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SandboxValues" (
    "value" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL,
    "componentTitle" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "componentType" TEXT NOT NULL,
    "inputVersion" INTEGER NOT NULL,
    "inputLabel" TEXT NOT NULL,
    "versionId" INTEGER NOT NULL,

    CONSTRAINT "SandboxValues_pkey" PRIMARY KEY ("clientId","componentTitle","softwareLabel","componentType","inputLabel","inputVersion","version")
);

-- CreateTable
CREATE TABLE "SoftwareItems" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "softwareClientId" TEXT NOT NULL,
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

    CONSTRAINT "SoftwareItems_pkey" PRIMARY KEY ("id","type","softwareLabel","softwareClientId","version")
);

-- CreateTable
CREATE TABLE "ConstantLegal" (
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "idccCode" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "softwareId" TEXT,
    "softwareLabel" TEXT NOT NULL,
    "softwareClientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "ConstantLegal_pkey" PRIMARY KEY ("code","level","dateStart","dateEnd")
);

-- CreateTable
CREATE TABLE "Idcc" (
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'System',

    CONSTRAINT "Idcc_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Standard_Attachment" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isObligatory" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "softwareId" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "softwareClientId" TEXT NOT NULL,

    CONSTRAINT "Standard_Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Validation" (
    "bookLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Validation_pkey" PRIMARY KEY ("bookLabel","userId","clientId","projectLabel")
);

-- CreateTable
CREATE TABLE "Project_Attachment" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isObligatory" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "projectName" TEXT,
    "clientId" TEXT,

    CONSTRAINT "Project_Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Form" (
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("title","type","version")
);

-- CreateTable
CREATE TABLE "Form_Input" (
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "maxLength" INTEGER,
    "minLength" INTEGER,
    "minValue" INTEGER,
    "maxValue" INTEGER,
    "placeholder" TEXT,
    "order" INTEGER NOT NULL,
    "defaultValue" TEXT,
    "required" BOOLEAN NOT NULL,
    "readonly" BOOLEAN NOT NULL,
    "multiple" BOOLEAN,
    "inputSource" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "formTitle" TEXT NOT NULL,
    "formType" TEXT NOT NULL,
    "formVersion" INTEGER NOT NULL,

    CONSTRAINT "Form_Input_pkey" PRIMARY KEY ("formTitle","formType","formVersion","type","label")
);

-- CreateTable
CREATE TABLE "Input" (
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Input_pkey" PRIMARY KEY ("type")
);

-- CreateTable
CREATE TABLE "Prisma_Seed" (
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Prisma_Seed_pkey" PRIMARY KEY ("name")
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
CREATE UNIQUE INDEX "Invitation_email_key" ON "Invitation"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Software_slug_key" ON "Software"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Standard_Book_slug_key" ON "Standard_Book"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Standard_Component_slug_key" ON "Standard_Component"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Standard_Component_Input_slug_key" ON "Standard_Component_Input"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Standard_Component_TextArea_slug_key" ON "Standard_Component_TextArea"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Standard_Component_TextArea_Standard_ComponentId_key" ON "Standard_Component_TextArea"("Standard_ComponentId");

-- CreateIndex
CREATE UNIQUE INDEX "Standard_Component_Image_slug_key" ON "Standard_Component_Image"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Standard_Chapter_id_key" ON "Standard_Chapter"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Standard_Chapter_slug_key" ON "Standard_Chapter"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Book_slug_key" ON "Project_Book"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Chapter_slug_key" ON "Project_Chapter"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Projet_Component_slug_key" ON "Projet_Component"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Input_slug_key" ON "Project_Input"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Value_slug_key" ON "Project_Value"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_slug_key" ON "Invoice"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SoftwareItems_slug_key" ON "SoftwareItems"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Attachment_slug_key" ON "Project_Attachment"("slug");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOtherData" ADD CONSTRAINT "UserOtherData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClient" ADD CONSTRAINT "UserClient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClient" ADD CONSTRAINT "UserClient_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software" ADD CONSTRAINT "Software_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSoftware" ADD CONSTRAINT "UserSoftware_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSoftware" ADD CONSTRAINT "UserSoftware_softwareLabel_softwareClientId_fkey" FOREIGN KEY ("softwareLabel", "softwareClientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Book" ADD CONSTRAINT "Standard_Book_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Component" ADD CONSTRAINT "Standard_Component_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Component" ADD CONSTRAINT "Standard_Component_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Component_Input" ADD CONSTRAINT "Standard_Component_Input_componentTitle_softwareLabel_clie_fkey" FOREIGN KEY ("componentTitle", "softwareLabel", "clientId", "componentType") REFERENCES "Standard_Component"("title", "softwareLabel", "clientId", "type") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Component_TextArea" ADD CONSTRAINT "Standard_Component_TextArea_componentTitle_softwareLabel_c_fkey" FOREIGN KEY ("componentTitle", "softwareLabel", "componentType", "clientId") REFERENCES "Standard_Component"("title", "softwareLabel", "type", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Component_Image" ADD CONSTRAINT "Standard_Component_Image_componentTitle_softwareLabel_comp_fkey" FOREIGN KEY ("componentTitle", "softwareLabel", "componentType", "clientId") REFERENCES "Standard_Component"("title", "softwareLabel", "type", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Component_Select_Option" ADD CONSTRAINT "Standard_Component_Select_Option_inputLabel_clientId_softw_fkey" FOREIGN KEY ("inputLabel", "clientId", "softwareLabel", "inputVersion", "componentTitle") REFERENCES "Standard_Component_Input"("label", "clientId", "softwareLabel", "version", "componentTitle") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Chapter" ADD CONSTRAINT "Standard_Chapter_clientId_bookLabel_bookSoftwareLabel_fkey" FOREIGN KEY ("clientId", "bookLabel", "bookSoftwareLabel") REFERENCES "Standard_Book"("clientId", "label", "softwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Chapter" ADD CONSTRAINT "Standard_Chapter_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Standard_Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterStdComponent" ADD CONSTRAINT "ChapterStdComponent_clientId_bookLabel_bookSoftwareLabel_l_fkey" FOREIGN KEY ("clientId", "bookLabel", "bookSoftwareLabel", "level_1", "level_2", "level_3") REFERENCES "Standard_Chapter"("clientId", "bookLabel", "bookSoftwareLabel", "level_1", "level_2", "level_3") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterStdComponent" ADD CONSTRAINT "ChapterStdComponent_componentTitle_softwareLabel_clientId__fkey" FOREIGN KEY ("componentTitle", "softwareLabel", "clientId", "componentType") REFERENCES "Standard_Component"("title", "softwareLabel", "clientId", "type") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_projectClientId_projectLabel_fkey" FOREIGN KEY ("projectClientId", "projectLabel") REFERENCES "Project"("clientId", "label") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Book" ADD CONSTRAINT "Project_Book_clientId_projectLabel_fkey" FOREIGN KEY ("clientId", "projectLabel") REFERENCES "Project"("clientId", "label") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Chapter" ADD CONSTRAINT "Project_Chapter_bookLabel_clientId_projectLabel_level_1_le_fkey" FOREIGN KEY ("bookLabel", "clientId", "projectLabel", "level_1", "level_2", "level_3") REFERENCES "Project_Chapter"("bookLabel", "clientId", "projectLabel", "level_1", "level_2", "level_3") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Chapter" ADD CONSTRAINT "Project_Chapter_clientId_bookLabel_projectLabel_fkey" FOREIGN KEY ("clientId", "bookLabel", "projectLabel") REFERENCES "Project_Book"("clientId", "label", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projet_Component" ADD CONSTRAINT "Projet_Component_bookLabel_projectLabel_clientId_chapterLe_fkey" FOREIGN KEY ("bookLabel", "projectLabel", "clientId", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3") REFERENCES "Project_Chapter"("bookLabel", "projectLabel", "clientId", "level_1", "level_2", "level_3") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Input" ADD CONSTRAINT "Project_Input_bookLabel_projectLabel_clientId_chapterLevel_fkey" FOREIGN KEY ("bookLabel", "projectLabel", "clientId", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3") REFERENCES "Projet_Component"("bookLabel", "projectLabel", "clientId", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Value" ADD CONSTRAINT "Project_Value_clientId_bookLabel_projectLabel_chapterLevel_fkey" FOREIGN KEY ("clientId", "bookLabel", "projectLabel", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3", "inputLabel") REFERENCES "Project_Input"("clientId", "bookLabel", "projectLabel", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3", "label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Option" ADD CONSTRAINT "Project_Option_clientId_bookLabel_inputLabel_projectLabel__fkey" FOREIGN KEY ("clientId", "bookLabel", "inputLabel", "projectLabel", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3") REFERENCES "Project_Input"("clientId", "bookLabel", "label", "projectLabel", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dsn" ADD CONSTRAINT "Dsn_clientId_projectLabel_fkey" FOREIGN KEY ("clientId", "projectLabel") REFERENCES "Project"("clientId", "label") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DsnEstablishment" ADD CONSTRAINT "DsnEstablishment_dsnSiren_dsnNic_dsnMonth_dsnVersion_dsnFr_fkey" FOREIGN KEY ("dsnSiren", "dsnNic", "dsnMonth", "dsnVersion", "dsnFraction") REFERENCES "Dsn"("siren", "nic", "month", "version", "fraction") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DsnRateAt" ADD CONSTRAINT "DsnRateAt_dsnEstablishmentNic_dsnEstablishmentDsnSiren_dsn_fkey" FOREIGN KEY ("dsnEstablishmentNic", "dsnEstablishmentDsnSiren", "dsnEstablishmentDsnNic", "dsnEstablishmentDsnMonth", "dsnEstablishmentDsnVersion", "dsnEstablishmentDsnFraction") REFERENCES "DsnEstablishment"("nic", "dsnSiren", "dsnNic", "dsnMonth", "dsnVersion", "dsnFraction") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DsnContributionFund" ADD CONSTRAINT "DsnContributionFund_dsnEstablishmentNic_dsnEstablishmentDs_fkey" FOREIGN KEY ("dsnEstablishmentNic", "dsnEstablishmentDsnSiren", "dsnEstablishmentDsnNic", "dsnEstablishmentDsnMonth", "dsnEstablishmentDsnVersion", "dsnEstablishmentDsnFraction") REFERENCES "DsnEstablishment"("nic", "dsnSiren", "dsnNic", "dsnMonth", "dsnVersion", "dsnFraction") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DsnIdcc" ADD CONSTRAINT "DsnIdcc_dsnSiren_dsnNic_dsnMonth_dsnVersion_dsnFraction_fkey" FOREIGN KEY ("dsnSiren", "dsnNic", "dsnMonth", "dsnVersion", "dsnFraction") REFERENCES "Dsn"("siren", "nic", "month", "version", "fraction") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DsnJob" ADD CONSTRAINT "DsnJob_dsnSiren_dsnNic_dsnMonth_dsnVersion_dsnFraction_fkey" FOREIGN KEY ("dsnSiren", "dsnNic", "dsnMonth", "dsnVersion", "dsnFraction") REFERENCES "Dsn"("siren", "nic", "month", "version", "fraction") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceLine" ADD CONSTRAINT "InvoiceLine_clientId_dateStart_dateEnd_fkey" FOREIGN KEY ("clientId", "dateStart", "dateEnd") REFERENCES "Invoice"("clientId", "dateStart", "dateEnd") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logger" ADD CONSTRAINT "Logger_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logger" ADD CONSTRAINT "Logger_clientId_projectLabel_fkey" FOREIGN KEY ("clientId", "projectLabel") REFERENCES "Project"("clientId", "label") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SandboxValues" ADD CONSTRAINT "SandboxValues_componentTitle_softwareLabel_clientId_inputV_fkey" FOREIGN KEY ("componentTitle", "softwareLabel", "clientId", "inputVersion", "inputLabel") REFERENCES "Standard_Component_Input"("componentTitle", "softwareLabel", "clientId", "version", "label") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SandboxValues" ADD CONSTRAINT "SandboxValues_componentTitle_softwareLabel_clientId_compon_fkey" FOREIGN KEY ("componentTitle", "softwareLabel", "clientId", "componentType") REFERENCES "Standard_Component"("title", "softwareLabel", "clientId", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftwareItems" ADD CONSTRAINT "SoftwareItems_softwareLabel_softwareClientId_fkey" FOREIGN KEY ("softwareLabel", "softwareClientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftwareItems" ADD CONSTRAINT "SoftwareItems_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConstantLegal" ADD CONSTRAINT "ConstantLegal_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConstantLegal" ADD CONSTRAINT "ConstantLegal_softwareLabel_softwareClientId_fkey" FOREIGN KEY ("softwareLabel", "softwareClientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Attachment" ADD CONSTRAINT "Standard_Attachment_softwareLabel_softwareClientId_fkey" FOREIGN KEY ("softwareLabel", "softwareClientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Validation" ADD CONSTRAINT "Validation_bookLabel_clientId_projectLabel_fkey" FOREIGN KEY ("bookLabel", "clientId", "projectLabel") REFERENCES "Project_Book"("label", "clientId", "projectLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Validation" ADD CONSTRAINT "Validation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Attachment" ADD CONSTRAINT "Project_Attachment_clientId_projectName_fkey" FOREIGN KEY ("clientId", "projectName") REFERENCES "Project"("clientId", "label") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form_Input" ADD CONSTRAINT "Form_Input_formTitle_formType_formVersion_fkey" FOREIGN KEY ("formTitle", "formType", "formVersion") REFERENCES "Form"("title", "type", "version") ON DELETE RESTRICT ON UPDATE CASCADE;
