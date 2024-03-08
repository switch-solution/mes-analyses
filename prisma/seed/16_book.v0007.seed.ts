
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

class BookV0007Seed extends Seed {
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
                        slug: "taux-at",
                    },
                    update: {
                        label: "Cahier des taux AT",
                        status: "actif",
                        slug: "taux-at",
                        description: "Cahier des taux AT",
                    },
                    create: {
                        label: "Cahier des taux AT",
                        status: "actif",
                        slug: "taux-at",
                        createdBy: "system",
                        description: "Cahier des taux AT",
                    },
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des taux AT",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {
                        bookLabel: "Cahier des taux AT",
                    },
                    create: {
                        label: "Liste des services",
                        bookLabel: "Cahier des taux AT",
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        slug: "1-0-0-taux-at",
                        createdBy: "system"
                    }
                })

                //Associate with Form
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des taux AT",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Taux AT",
                            formType: "DSN_TAUX_AT",
                            formVersion: 1
                        }
                    },
                    update: {
                        formTitle: "Taux AT",
                        formType: "DSN_TAUX_AT",
                        formVersion: 1,
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des taux AT",
                    },
                    create: {
                        formTitle: "Taux AT",
                        formType: "DSN_TAUX_AT",
                        formVersion: 1,
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des taux AT",
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
export const bookV0007Seed = new BookV0007Seed("BOOK_V0007", "Cahier des taux AT", 16, "FORM_V0004")


