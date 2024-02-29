
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient(
    {
        log: [
            {
                emit: 'stdout',
                level: 'query',
            },
            {
                emit: 'stdout',
                level: 'error',
            },
            {
                emit: 'stdout',
                level: 'info',
            },
            {
                emit: 'stdout',
                level: 'warn',
            },
        ],
    }
)
import { Seed } from "./seedModel"

class BookV0005Seed extends Seed {
    constructor(
        protected name: string,
        protected description: string,
        protected order: number,
        protected previousLabel: string
    ) {
        super(name, description, order, previousLabel)
    }
    async run() {
        const seedExist = await this.seedIsComplete()
        const previousStatus = await this.previousSeedIsComplete()

        try {
            if (previousStatus && !seedExist) {

                //Create book
                await prisma.book.upsert({
                    where: {
                        slug: "services",
                    },
                    update: {
                        label: "Cahier des services",
                        status: "actif",
                        slug: "classification",
                        description: "Cahier des services de de votre organisation",
                    },
                    create: {
                        label: "Cahier des services",
                        status: "actif",
                        slug: "services",
                        createdBy: "system",
                        description: "Cahier des services de de votre organisation",
                    },
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des services",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {
                        label: "Liste des services",
                    },
                    create: {
                        label: "Liste des services",
                        bookLabel: "Cahier des services",
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        slug: "1-0-0-services",
                        createdBy: "system"
                    }
                })

                //Associate with Form
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des services",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Service",
                            formType: "STD_SERVICE",
                            formVersion: 1
                        }
                    },
                    update: {
                        formTitle: "Service",
                        formType: "STD_SERVICE",
                        formVersion: 1,
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des services",
                    },
                    create: {
                        formTitle: "Service",
                        formType: "STD_SERVICE",
                        formVersion: 1,
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des services",
                    }
                })

                await this.seedUpdateStatus("completed")
            }

        } catch (err) {
            console.log(err)
            await this.seedUpdateStatus("error")
        }
    }
}
export const bookV0005Seed = new BookV0005Seed("BOOK_V0005", "Cahier des services", 12, "BOOK_V0004")