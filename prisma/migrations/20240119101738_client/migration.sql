-- CreateTable
CREATE TABLE "UserOtherData" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserOtherData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
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
    "billingAddress2" TEXT NOT NULL,
    "billingAddress3" TEXT NOT NULL,
    "billingAddress4" TEXT NOT NULL,
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
CREATE TABLE "UserClient" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "isBlocked" BOOLEAN NOT NULL,
    "isBillable" BOOLEAN NOT NULL,
    "isAdministrator" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserClient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserOtherData" ADD CONSTRAINT "UserOtherData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClient" ADD CONSTRAINT "UserClient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClient" ADD CONSTRAINT "UserClient_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
