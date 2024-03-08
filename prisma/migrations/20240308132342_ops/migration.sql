-- CreateTable
CREATE TABLE "Dsn_OPS" (
    "codeDsn" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "codeZip" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Dsn_OPS_pkey" PRIMARY KEY ("codeDsn")
);
