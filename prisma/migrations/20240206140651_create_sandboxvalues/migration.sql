-- CreateTable
CREATE TABLE "SandboxValues" (
    "id" TEXT NOT NULL,
    "Standard_Composant_InputId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SandboxValues_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SandboxValues" ADD CONSTRAINT "SandboxValues_Standard_Composant_InputId_fkey" FOREIGN KEY ("Standard_Composant_InputId") REFERENCES "Standard_Composant_Input"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
