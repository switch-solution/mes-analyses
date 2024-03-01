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
CREATE TABLE "Software_Book" (
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Software_Book_pkey" PRIMARY KEY ("label","softwareLabel","clientId")
);

-- CreateTable
CREATE TABLE "Book" (
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("label")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'System',
    "level_1" INTEGER NOT NULL,
    "level_2" INTEGER NOT NULL,
    "level_3" INTEGER NOT NULL,
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "bookLabel" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("bookLabel","level_1","level_2","level_3")
);

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

-- CreateTable
CREATE TABLE "Software_Component" (
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "isForm" BOOLEAN DEFAULT false,
    "isTextArea" BOOLEAN DEFAULT false,
    "isImage" BOOLEAN DEFAULT false,
    "buttonLabel" TEXT NOT NULL DEFAULT 'Ajouter',
    "slug" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,

    CONSTRAINT "Software_Component_pkey" PRIMARY KEY ("label","softwareLabel","clientId","type")
);

-- CreateTable
CREATE TABLE "Software_Component_Input" (
    "type" TEXT NOT NULL,
    "dsnType" TEXT,
    "otherData" TEXT,
    "label" TEXT NOT NULL,
    "maxLength" INTEGER DEFAULT 255,
    "minLength" INTEGER DEFAULT 0,
    "minValue" INTEGER DEFAULT 0,
    "maxValue" INTEGER DEFAULT 9999,
    "placeholder" TEXT DEFAULT 'Saisir une valeur',
    "order" INTEGER NOT NULL,
    "formSource" TEXT,
    "inputSource" TEXT,
    "defaultValue" TEXT DEFAULT '',
    "required" BOOLEAN DEFAULT false,
    "readonly" BOOLEAN DEFAULT false,
    "multiple" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "componentLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "isCode" BOOLEAN DEFAULT false,
    "isDescription" BOOLEAN DEFAULT false,
    "isLabel" BOOLEAN DEFAULT false,
    "componentType" TEXT NOT NULL,
    "id" TEXT NOT NULL,

    CONSTRAINT "Software_Component_Input_pkey" PRIMARY KEY ("componentLabel","softwareLabel","clientId","label")
);

-- CreateTable
CREATE TABLE "Software_Component_TextArea" (
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "componentLabel" TEXT NOT NULL,
    "componentType" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,

    CONSTRAINT "Software_Component_TextArea_pkey" PRIMARY KEY ("componentLabel","softwareLabel","clientId","componentType")
);

-- CreateTable
CREATE TABLE "Software_Component_Image" (
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "componentLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "componentType" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "device" TEXT NOT NULL,

    CONSTRAINT "Software_Component_Image_pkey" PRIMARY KEY ("componentLabel","softwareLabel","clientId","version","componentType")
);

-- CreateTable
CREATE TABLE "Software_Component_Select_Option" (
    "label" TEXT NOT NULL,
    "selected" BOOLEAN,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "componentLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "inputLabel" TEXT NOT NULL,

    CONSTRAINT "Software_Component_Select_Option_pkey" PRIMARY KEY ("inputLabel","clientId","softwareLabel","componentLabel","label")
);

-- CreateTable
CREATE TABLE "Software_Chapter" (
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

    CONSTRAINT "Software_Chapter_pkey" PRIMARY KEY ("clientId","bookLabel","bookSoftwareLabel","level_1","level_2","level_3")
);

-- CreateTable
CREATE TABLE "SoftwareChapterSoftwareComponent" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "componentLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "componentType" TEXT NOT NULL,
    "bookLabel" TEXT NOT NULL,
    "bookSoftwareLabel" TEXT NOT NULL,
    "level_1" INTEGER NOT NULL,
    "level_2" INTEGER NOT NULL,
    "level_3" INTEGER NOT NULL,

    CONSTRAINT "SoftwareChapterSoftwareComponent_pkey" PRIMARY KEY ("clientId","bookLabel","level_1","level_2","level_3","componentLabel","softwareLabel","componentType")
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

    CONSTRAINT "UserProject_pkey" PRIMARY KEY ("userId","projectClientId","projectLabel","projectSoftwareLabel")
);

-- CreateTable
CREATE TABLE "Project_Book" (
    "label" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isHold" BOOLEAN NOT NULL DEFAULT false,
    "isStarted" BOOLEAN NOT NULL DEFAULT false,
    "isValidate" BOOLEAN NOT NULL DEFAULT false,
    "isModifiedAfertValidation" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "projectSoftwareLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_Book_pkey" PRIMARY KEY ("clientId","label","projectLabel","projectSoftwareLabel")
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
    "projectLabel" TEXT NOT NULL,
    "projectSoftwareLabel" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_Chapter_pkey" PRIMARY KEY ("bookLabel","clientId","projectLabel","projectSoftwareLabel","level_1","level_2","level_3")
);

-- CreateTable
CREATE TABLE "Project_Component" (
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "buttonLabel" TEXT NOT NULL DEFAULT 'Ajouter',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "chapterSlug" TEXT,
    "bookLabel" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "projectSoftwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "chapterLevel_1" INTEGER NOT NULL,
    "chapterLevel_2" INTEGER NOT NULL,
    "chapterLevel_3" INTEGER NOT NULL,
    "isForm" BOOLEAN DEFAULT false,
    "isTextArea" BOOLEAN DEFAULT false,
    "isImage" BOOLEAN DEFAULT false,

    CONSTRAINT "Project_Component_pkey" PRIMARY KEY ("bookLabel","projectLabel","clientId","chapterLevel_1","chapterLevel_2","chapterLevel_3","projectSoftwareLabel")
);

-- CreateTable
CREATE TABLE "Project_Input" (
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "dsnType" TEXT,
    "label" TEXT NOT NULL,
    "maxLength" INTEGER,
    "minLength" INTEGER,
    "minValue" INTEGER,
    "maxValue" INTEGER,
    "placeholder" TEXT,
    "order" INTEGER NOT NULL,
    "defaultValue" TEXT,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "readonly" BOOLEAN NOT NULL DEFAULT false,
    "inputSource" TEXT,
    "multiple" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "bookLabel" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "projectSoftwareLabel" TEXT NOT NULL,
    "isCode" BOOLEAN DEFAULT false,
    "isDescription" BOOLEAN DEFAULT false,
    "isLabel" BOOLEAN DEFAULT false,
    "chapterLevel_1" INTEGER NOT NULL,
    "chapterLevel_2" INTEGER NOT NULL,
    "chapterLevel_3" INTEGER NOT NULL,

    CONSTRAINT "Project_Input_pkey" PRIMARY KEY ("clientId","bookLabel","projectLabel","chapterLevel_1","chapterLevel_2","chapterLevel_3","label","projectSoftwareLabel")
);

-- CreateTable
CREATE TABLE "Project_Value" (
    "version" INTEGER NOT NULL,
    "recordId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
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
    "projectSoftwareLabel" TEXT NOT NULL,
    "chapterLevel_1" INTEGER NOT NULL,
    "chapterLevel_2" INTEGER NOT NULL,
    "chapterLevel_3" INTEGER NOT NULL,
    "isCode" BOOLEAN DEFAULT false,
    "isDescription" BOOLEAN DEFAULT false,
    "isLabel" BOOLEAN DEFAULT false,

    CONSTRAINT "Project_Value_pkey" PRIMARY KEY ("clientId","bookLabel","inputLabel","projectLabel","chapterLevel_1","chapterLevel_2","chapterLevel_3","version","projectSoftwareLabel","recordId")
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
    "projectSoftwareLabel" TEXT NOT NULL,
    "chapterLevel_1" INTEGER NOT NULL,
    "chapterLevel_2" INTEGER NOT NULL,
    "chapterLevel_3" INTEGER NOT NULL,
    "version" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Project_Option_pkey" PRIMARY KEY ("clientId","bookLabel","inputLabel","projectLabel","chapterLevel_1","chapterLevel_2","chapterLevel_3","label","version","projectSoftwareLabel")
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
    "projectSoftwareLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Dsn_pkey" PRIMARY KEY ("siren","nic","month","version","fraction")
);

-- CreateTable
CREATE TABLE "Dsn_Establishment" (
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
    "clientId" TEXT NOT NULL,
    "siret" TEXT NOT NULL,

    CONSTRAINT "Dsn_Establishment_pkey" PRIMARY KEY ("clientId","siret")
);

-- CreateTable
CREATE TABLE "Dsn_RateAt" (
    "code" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "siret" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Dsn_RateAt_pkey" PRIMARY KEY ("code","siret","clientId")
);

-- CreateTable
CREATE TABLE "Dsn_ContributionFund" (
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
    "siret" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Dsn_ContributionFund_pkey" PRIMARY KEY ("code","siret","clientId")
);

-- CreateTable
CREATE TABLE "Dsn_Mutual" (
    "contractId" TEXT NOT NULL,
    "organisme" TEXT,
    "delegate" TEXT,
    "covererd" TEXT,
    "techId" TEXT,
    "clientId" TEXT NOT NULL,
    "siren" TEXT NOT NULL,

    CONSTRAINT "Dsn_Mutual_pkey" PRIMARY KEY ("contractId","clientId","siren")
);

-- CreateTable
CREATE TABLE "Dsn_Idcc" (
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
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Dsn_Idcc_pkey" PRIMARY KEY ("code","dsnSiren","dsnNic","dsnMonth","dsnVersion","dsnFraction","clientId")
);

-- CreateTable
CREATE TABLE "Dsn_Job" (
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "dsnSiren" TEXT NOT NULL,
    "dsnNic" TEXT NOT NULL,
    "dsnMonth" TEXT NOT NULL,
    "dsnVersion" TEXT NOT NULL,
    "dsnFraction" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Dsn_Job_pkey" PRIMARY KEY ("label","dsnSiren","dsnNic","dsnMonth","dsnVersion","dsnFraction","clientId")
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
CREATE TABLE "SandboxValues" (
    "value" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL,
    "componentLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "componentType" TEXT NOT NULL,
    "inputLabel" TEXT NOT NULL,
    "versionId" INTEGER NOT NULL,

    CONSTRAINT "SandboxValues_pkey" PRIMARY KEY ("clientId","componentLabel","softwareLabel","componentType","inputLabel","version")
);

-- CreateTable
CREATE TABLE "Software_Items" (
    "id" TEXT NOT NULL,
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
    "level" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "idccCode" TEXT NOT NULL DEFAULT '9999',
    "value" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "softwareLabel" TEXT,
    "clientId" TEXT,
    "projectLabel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Constant_Legal_pkey" PRIMARY KEY ("id","level","dateStart","dateEnd")
);

-- CreateTable
CREATE TABLE "Project_Constant" (
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "idccCode" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "projectSoftwareLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_Constant_pkey" PRIMARY KEY ("code","dateStart","dateEnd","projectLabel","projectSoftwareLabel","clientId")
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
CREATE TABLE "Validation" (
    "bookLabel" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "projectLabel" TEXT NOT NULL,
    "projectSoftwareLabel" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Validation_pkey" PRIMARY KEY ("bookLabel","userId","clientId","projectLabel","projectSoftwareLabel")
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
CREATE TABLE "Form" (
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "buttonLabel" TEXT NOT NULL DEFAULT 'Ajouter',
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
    "dsnType" TEXT,
    "otherData" TEXT,
    "maxLength" INTEGER,
    "minLength" INTEGER,
    "minValue" INTEGER,
    "maxValue" INTEGER,
    "placeholder" TEXT,
    "order" INTEGER NOT NULL,
    "isCode" BOOLEAN DEFAULT false,
    "isDescription" BOOLEAN DEFAULT false,
    "isLabel" BOOLEAN DEFAULT false,
    "defaultValue" TEXT,
    "required" BOOLEAN NOT NULL,
    "readonly" BOOLEAN NOT NULL,
    "multiple" BOOLEAN,
    "formSource" TEXT,
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
CREATE TABLE "Alert" (
    "label" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isViewed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("label","userId")
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
    "createdBy" TEXT NOT NULL DEFAULT 'System',
    "bookLabel" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("label")
);

-- CreateTable
CREATE TABLE "Software_Task" (
    "label" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "isSwitch" BOOLEAN NOT NULL DEFAULT false,
    "isUpload" BOOLEAN NOT NULL DEFAULT false,
    "accept" TEXT,
    "softwareLabel" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'System',
    "bookLabel" TEXT,

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
    "createdBy" TEXT NOT NULL DEFAULT 'System',
    "owner" TEXT NOT NULL,
    "message" TEXT,
    "dateStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_Task_pkey" PRIMARY KEY ("label","clientId","projectLabel","softwareLabel","owner")
);

-- CreateTable
CREATE TABLE "Absence" (
    "label" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isSocialSecurity" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'System',

    CONSTRAINT "Absence_pkey" PRIMARY KEY ("label")
);

-- CreateTable
CREATE TABLE "Software_Absence" (
    "label" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isSocialSecurity" BOOLEAN NOT NULL DEFAULT false,
    "softwareLabel" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'System',

    CONSTRAINT "Software_Absence_pkey" PRIMARY KEY ("label","code","clientId","softwareLabel")
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
CREATE UNIQUE INDEX "Software_Book_slug_key" ON "Software_Book"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Book_slug_key" ON "Book"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_id_key" ON "Chapter"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_slug_key" ON "Chapter"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Component_slug_key" ON "Software_Component"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Component_Input_id_key" ON "Software_Component_Input"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Component_Image_slug_key" ON "Software_Component_Image"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Chapter_id_key" ON "Software_Chapter"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Chapter_slug_key" ON "Software_Chapter"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Book_slug_key" ON "Project_Book"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Chapter_slug_key" ON "Project_Chapter"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Component_slug_key" ON "Project_Component"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Input_slug_key" ON "Project_Input"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_slug_key" ON "Invoice"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Items_slug_key" ON "Software_Items"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Setting_slug_key" ON "Software_Setting"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Constant_Legal_slug_key" ON "Constant_Legal"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Attachment_slug_key" ON "Project_Attachment"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Task_slug_key" ON "Project_Task"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Absence_code_key" ON "Absence"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Software_Absence_slug_key" ON "Software_Absence"("slug");

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
ALTER TABLE "Software_Book" ADD CONSTRAINT "Software_Book_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_bookLabel_fkey" FOREIGN KEY ("bookLabel") REFERENCES "Book"("label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterForm" ADD CONSTRAINT "ChapterForm_bookLabel_level_1_level_2_level_3_fkey" FOREIGN KEY ("bookLabel", "level_1", "level_2", "level_3") REFERENCES "Chapter"("bookLabel", "level_1", "level_2", "level_3") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterForm" ADD CONSTRAINT "ChapterForm_formTitle_formType_formVersion_fkey" FOREIGN KEY ("formTitle", "formType", "formVersion") REFERENCES "Form"("title", "type", "version") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Component" ADD CONSTRAINT "Software_Component_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Component" ADD CONSTRAINT "Software_Component_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Component_Input" ADD CONSTRAINT "Software_Component_Input_componentLabel_softwareLabel_clie_fkey" FOREIGN KEY ("componentLabel", "softwareLabel", "clientId", "componentType") REFERENCES "Software_Component"("label", "softwareLabel", "clientId", "type") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Component_TextArea" ADD CONSTRAINT "Software_Component_TextArea_componentLabel_softwareLabel_c_fkey" FOREIGN KEY ("componentLabel", "softwareLabel", "componentType", "clientId") REFERENCES "Software_Component"("label", "softwareLabel", "type", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Component_Image" ADD CONSTRAINT "Software_Component_Image_componentLabel_softwareLabel_comp_fkey" FOREIGN KEY ("componentLabel", "softwareLabel", "componentType", "clientId") REFERENCES "Software_Component"("label", "softwareLabel", "type", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Component_Select_Option" ADD CONSTRAINT "Software_Component_Select_Option_inputLabel_clientId_softw_fkey" FOREIGN KEY ("inputLabel", "clientId", "softwareLabel", "componentLabel") REFERENCES "Software_Component_Input"("label", "clientId", "softwareLabel", "componentLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Chapter" ADD CONSTRAINT "Software_Chapter_clientId_bookLabel_bookSoftwareLabel_fkey" FOREIGN KEY ("clientId", "bookLabel", "bookSoftwareLabel") REFERENCES "Software_Book"("clientId", "label", "softwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Chapter" ADD CONSTRAINT "Software_Chapter_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Software_Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftwareChapterSoftwareComponent" ADD CONSTRAINT "SoftwareChapterSoftwareComponent_clientId_bookLabel_softwa_fkey" FOREIGN KEY ("clientId", "bookLabel", "softwareLabel", "level_1", "level_2", "level_3") REFERENCES "Software_Chapter"("clientId", "bookLabel", "bookSoftwareLabel", "level_1", "level_2", "level_3") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftwareChapterSoftwareComponent" ADD CONSTRAINT "SoftwareChapterSoftwareComponent_componentLabel_softwareLa_fkey" FOREIGN KEY ("componentLabel", "softwareLabel", "clientId", "componentType") REFERENCES "Software_Component"("label", "softwareLabel", "clientId", "type") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_projectClientId_projectLabel_projectSoftwareLa_fkey" FOREIGN KEY ("projectClientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Book" ADD CONSTRAINT "Project_Book_clientId_projectLabel_projectSoftwareLabel_fkey" FOREIGN KEY ("clientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Chapter" ADD CONSTRAINT "Project_Chapter_bookLabel_clientId_projectLabel_level_1_le_fkey" FOREIGN KEY ("bookLabel", "clientId", "projectLabel", "level_1", "level_2", "level_3", "projectSoftwareLabel") REFERENCES "Project_Chapter"("bookLabel", "clientId", "projectLabel", "level_1", "level_2", "level_3", "projectSoftwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Chapter" ADD CONSTRAINT "Project_Chapter_clientId_bookLabel_projectLabel_projectSof_fkey" FOREIGN KEY ("clientId", "bookLabel", "projectLabel", "projectSoftwareLabel") REFERENCES "Project_Book"("clientId", "label", "projectLabel", "projectSoftwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Component" ADD CONSTRAINT "Project_Component_bookLabel_projectLabel_clientId_chapterL_fkey" FOREIGN KEY ("bookLabel", "projectLabel", "clientId", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3", "projectSoftwareLabel") REFERENCES "Project_Chapter"("bookLabel", "projectLabel", "clientId", "level_1", "level_2", "level_3", "projectSoftwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Input" ADD CONSTRAINT "Project_Input_bookLabel_projectLabel_clientId_chapterLevel_fkey" FOREIGN KEY ("bookLabel", "projectLabel", "clientId", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3", "projectSoftwareLabel") REFERENCES "Project_Component"("bookLabel", "projectLabel", "clientId", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3", "projectSoftwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Value" ADD CONSTRAINT "Project_Value_clientId_bookLabel_projectLabel_chapterLevel_fkey" FOREIGN KEY ("clientId", "bookLabel", "projectLabel", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3", "inputLabel", "projectSoftwareLabel") REFERENCES "Project_Input"("clientId", "bookLabel", "projectLabel", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3", "label", "projectSoftwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Option" ADD CONSTRAINT "Project_Option_clientId_bookLabel_inputLabel_projectLabel__fkey" FOREIGN KEY ("clientId", "bookLabel", "inputLabel", "projectLabel", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3", "projectSoftwareLabel") REFERENCES "Project_Input"("clientId", "bookLabel", "label", "projectLabel", "chapterLevel_1", "chapterLevel_2", "chapterLevel_3", "projectSoftwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dsn" ADD CONSTRAINT "Dsn_clientId_projectLabel_projectSoftwareLabel_fkey" FOREIGN KEY ("clientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dsn_Establishment" ADD CONSTRAINT "Dsn_Establishment_dsnSiren_dsnNic_dsnMonth_dsnVersion_dsnF_fkey" FOREIGN KEY ("dsnSiren", "dsnNic", "dsnMonth", "dsnVersion", "dsnFraction") REFERENCES "Dsn"("siren", "nic", "month", "version", "fraction") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dsn_RateAt" ADD CONSTRAINT "Dsn_RateAt_clientId_siret_fkey" FOREIGN KEY ("clientId", "siret") REFERENCES "Dsn_Establishment"("clientId", "siret") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dsn_ContributionFund" ADD CONSTRAINT "Dsn_ContributionFund_clientId_siret_fkey" FOREIGN KEY ("clientId", "siret") REFERENCES "Dsn_Establishment"("clientId", "siret") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dsn_Idcc" ADD CONSTRAINT "Dsn_Idcc_dsnSiren_dsnNic_dsnMonth_dsnVersion_dsnFraction_fkey" FOREIGN KEY ("dsnSiren", "dsnNic", "dsnMonth", "dsnVersion", "dsnFraction") REFERENCES "Dsn"("siren", "nic", "month", "version", "fraction") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dsn_Job" ADD CONSTRAINT "Dsn_Job_dsnSiren_dsnNic_dsnMonth_dsnVersion_dsnFraction_fkey" FOREIGN KEY ("dsnSiren", "dsnNic", "dsnMonth", "dsnVersion", "dsnFraction") REFERENCES "Dsn"("siren", "nic", "month", "version", "fraction") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceLine" ADD CONSTRAINT "InvoiceLine_clientId_dateStart_dateEnd_fkey" FOREIGN KEY ("clientId", "dateStart", "dateEnd") REFERENCES "Invoice"("clientId", "dateStart", "dateEnd") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logger" ADD CONSTRAINT "Logger_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("siren") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logger" ADD CONSTRAINT "Logger_clientId_projectLabel_projectSoftwareLabel_fkey" FOREIGN KEY ("clientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SandboxValues" ADD CONSTRAINT "SandboxValues_componentLabel_softwareLabel_clientId_inputL_fkey" FOREIGN KEY ("componentLabel", "softwareLabel", "clientId", "inputLabel") REFERENCES "Software_Component_Input"("componentLabel", "softwareLabel", "clientId", "label") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SandboxValues" ADD CONSTRAINT "SandboxValues_componentLabel_softwareLabel_clientId_compon_fkey" FOREIGN KEY ("componentLabel", "softwareLabel", "clientId", "componentType") REFERENCES "Software_Component"("label", "softwareLabel", "clientId", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Items" ADD CONSTRAINT "Software_Items_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Items" ADD CONSTRAINT "Software_Items_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Setting" ADD CONSTRAINT "Software_Setting_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Items" ADD CONSTRAINT "Project_Items_projectLabel_projectSoftwareLabel_clientId_fkey" FOREIGN KEY ("projectLabel", "projectSoftwareLabel", "clientId") REFERENCES "Project"("label", "softwareLabel", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Items" ADD CONSTRAINT "Project_Items_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Constant_Legal" ADD CONSTRAINT "Constant_Legal_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Constant_Legal" ADD CONSTRAINT "Constant_Legal_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Constant_Legal" ADD CONSTRAINT "Constant_Legal_clientId_projectLabel_softwareLabel_fkey" FOREIGN KEY ("clientId", "projectLabel", "softwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Constant" ADD CONSTRAINT "Project_Constant_idccCode_fkey" FOREIGN KEY ("idccCode") REFERENCES "Idcc"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Constant" ADD CONSTRAINT "Project_Constant_clientId_projectLabel_projectSoftwareLabe_fkey" FOREIGN KEY ("clientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Validation" ADD CONSTRAINT "Validation_bookLabel_clientId_projectLabel_projectSoftware_fkey" FOREIGN KEY ("bookLabel", "clientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project_Book"("label", "clientId", "projectLabel", "projectSoftwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Validation" ADD CONSTRAINT "Validation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Attachment" ADD CONSTRAINT "Project_Attachment_clientId_projectLabel_projectSoftwareLa_fkey" FOREIGN KEY ("clientId", "projectLabel", "projectSoftwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form_Input" ADD CONSTRAINT "Form_Input_formTitle_formType_formVersion_fkey" FOREIGN KEY ("formTitle", "formType", "formVersion") REFERENCES "Form"("title", "type", "version") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_bookLabel_fkey" FOREIGN KEY ("bookLabel") REFERENCES "Book"("label") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Task" ADD CONSTRAINT "Software_Task_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Task" ADD CONSTRAINT "Software_Task_bookLabel_softwareLabel_clientId_fkey" FOREIGN KEY ("bookLabel", "softwareLabel", "clientId") REFERENCES "Software_Book"("label", "softwareLabel", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Task" ADD CONSTRAINT "Project_Task_clientId_projectLabel_softwareLabel_fkey" FOREIGN KEY ("clientId", "projectLabel", "softwareLabel") REFERENCES "Project"("clientId", "label", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Task" ADD CONSTRAINT "Project_Task_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software_Absence" ADD CONSTRAINT "Software_Absence_softwareLabel_clientId_fkey" FOREIGN KEY ("softwareLabel", "clientId") REFERENCES "Software"("label", "clientId") ON DELETE RESTRICT ON UPDATE CASCADE;
