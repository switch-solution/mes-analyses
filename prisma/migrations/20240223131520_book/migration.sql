-- CreateTable
CREATE TABLE "Book" (
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'System',
    "clientId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("label")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "Book_slug_key" ON "Book"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_id_key" ON "Chapter"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_slug_key" ON "Chapter"("slug");

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_bookLabel_fkey" FOREIGN KEY ("bookLabel") REFERENCES "Book"("label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
