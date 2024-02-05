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
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "username" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOtherData" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "password" TEXT NOT NULL,
    "civility" TEXT NOT NULL,
    "isBlocked" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserOtherData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "socialReason" TEXT NOT NULL,
    "dateStartTrial" TIMESTAMP(3) NOT NULL,
    "dateEndTrial" TIMESTAMP(3) NOT NULL,
    "siret" TEXT NOT NULL,
    "ape" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "address3" TEXT,
    "address4" TEXT,
    "city" TEXT NOT NULL,
    "codeZip" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "billingAddress1" TEXT NOT NULL,
    "billingAddress2" TEXT,
    "billingAddress3" TEXT,
    "billingAddress4" TEXT,
    "billingCity" TEXT NOT NULL,
    "billingCodeZip" TEXT NOT NULL,
    "billingCountry" TEXT NOT NULL,
    "isBlocked" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
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
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "isBlocked" BOOLEAN NOT NULL,
    "isBillable" BOOLEAN NOT NULL,
    "isAdministrator" BOOLEAN NOT NULL DEFAULT false,
    "isEditor" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sendEmail" BOOLEAN NOT NULL,
    "civility" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Software" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Software_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Standard_Book" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "softwareId" TEXT NOT NULL,

    CONSTRAINT "Standard_Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Standard_Composant" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "softwareId" TEXT NOT NULL,

    CONSTRAINT "Standard_Composant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Standard_Composant_Input" (
    "id" TEXT NOT NULL,
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
    "textArea" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "standard_ComposantId" TEXT NOT NULL,

    CONSTRAINT "Standard_Composant_Input_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Standard_Composant_TextArea" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "placeholder" TEXT,
    "defaultValue" TEXT,
    "readonly" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "standard_ComposantId" TEXT NOT NULL,

    CONSTRAINT "Standard_Composant_TextArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Standard_Composant_Image" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "standard_ComposantId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "device" TEXT NOT NULL,

    CONSTRAINT "Standard_Composant_Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Standard_Composant_Select_Option" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "selected" BOOLEAN,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "standard_Composant_InputId" TEXT,

    CONSTRAINT "Standard_Composant_Select_Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Standard_Input" (
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Standard_Input_pkey" PRIMARY KEY ("type")
);

-- CreateTable
CREATE TABLE "Standard_Chapter" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "underRank" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "Standard_Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChapterStdComposant" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "standardComposantId" TEXT NOT NULL,

    CONSTRAINT "ChapterStdComposant_pkey" PRIMARY KEY ("chapterId","standardComposantId")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "softwareId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'actif',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProject" (
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isEditor" BOOLEAN NOT NULL DEFAULT false,
    "isValidator" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserProject_pkey" PRIMARY KEY ("userId","projectId")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "underRank" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "parentId" TEXT,
    "bookId" TEXT NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Composant" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "chapterId" TEXT,

    CONSTRAINT "Composant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Input" (
    "id" TEXT NOT NULL,
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
    "textArea" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "composantId" TEXT,
    "standard_Composant_InputId" TEXT,

    CONSTRAINT "Input_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Value" (
    "id" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "textValue" TEXT,
    "numberValue" INTEGER,
    "booleanValue" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "inputId" TEXT NOT NULL,

    CONSTRAINT "Value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "selected" BOOLEAN,
    "inputId" TEXT,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dsn" (
    "structureId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Dsn_pkey" PRIMARY KEY ("structureId","projectId")
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
    "id" TEXT NOT NULL,
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

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceLine" (
    "id" TEXT NOT NULL,
    "billId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "quantity" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "InvoiceLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logger" (
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "metadata" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "projetId" TEXT NOT NULL,

    CONSTRAINT "Logger_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "Client_socialReason_key" ON "Client"("socialReason");

-- CreateIndex
CREATE UNIQUE INDEX "Client_siret_key" ON "Client"("siret");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_email_key" ON "Invitation"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Software_name_key" ON "Software"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Standard_Chapter_bookId_level_rank_underRank_key" ON "Standard_Chapter"("bookId", "level", "rank", "underRank");

-- CreateIndex
CREATE UNIQUE INDEX "Value_version_inputId_key" ON "Value"("version", "inputId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOtherData" ADD CONSTRAINT "UserOtherData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClient" ADD CONSTRAINT "UserClient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClient" ADD CONSTRAINT "UserClient_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Software" ADD CONSTRAINT "Software_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Book" ADD CONSTRAINT "Standard_Book_softwareId_fkey" FOREIGN KEY ("softwareId") REFERENCES "Software"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Composant" ADD CONSTRAINT "Standard_Composant_softwareId_fkey" FOREIGN KEY ("softwareId") REFERENCES "Software"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Composant" ADD CONSTRAINT "Standard_Composant_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Composant_Input" ADD CONSTRAINT "Standard_Composant_Input_standard_ComposantId_fkey" FOREIGN KEY ("standard_ComposantId") REFERENCES "Standard_Composant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Composant_TextArea" ADD CONSTRAINT "Standard_Composant_TextArea_standard_ComposantId_fkey" FOREIGN KEY ("standard_ComposantId") REFERENCES "Standard_Composant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Composant_Image" ADD CONSTRAINT "Standard_Composant_Image_standard_ComposantId_fkey" FOREIGN KEY ("standard_ComposantId") REFERENCES "Standard_Composant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Composant_Select_Option" ADD CONSTRAINT "Standard_Composant_Select_Option_standard_Composant_InputI_fkey" FOREIGN KEY ("standard_Composant_InputId") REFERENCES "Standard_Composant_Input"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Chapter" ADD CONSTRAINT "Standard_Chapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Standard_Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Chapter" ADD CONSTRAINT "Standard_Chapter_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Standard_Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterStdComposant" ADD CONSTRAINT "ChapterStdComposant_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Standard_Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterStdComposant" ADD CONSTRAINT "ChapterStdComposant_standardComposantId_fkey" FOREIGN KEY ("standardComposantId") REFERENCES "Standard_Composant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_softwareId_fkey" FOREIGN KEY ("softwareId") REFERENCES "Software"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Composant" ADD CONSTRAINT "Composant_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Input" ADD CONSTRAINT "Input_composantId_fkey" FOREIGN KEY ("composantId") REFERENCES "Composant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Input" ADD CONSTRAINT "Input_standard_Composant_InputId_fkey" FOREIGN KEY ("standard_Composant_InputId") REFERENCES "Standard_Composant_Input"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Value" ADD CONSTRAINT "Value_inputId_fkey" FOREIGN KEY ("inputId") REFERENCES "Input"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_inputId_fkey" FOREIGN KEY ("inputId") REFERENCES "Input"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dsn" ADD CONSTRAINT "Dsn_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceLine" ADD CONSTRAINT "InvoiceLine_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logger" ADD CONSTRAINT "Logger_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logger" ADD CONSTRAINT "Logger_projetId_fkey" FOREIGN KEY ("projetId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
