
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

class BookV0002Seed extends Seed {
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
                        slug: "emploi",
                    },
                    update: {
                        label: "Emploi",
                        status: "actif",
                        slug: "emploi",
                        description: "Cahier des codes emplois",
                    },
                    create: {
                        label: "Emploi",
                        status: "actif",
                        slug: "emploi",
                        createdBy: "system",
                        description: "Cahier des codes emplois",
                    },
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Emploi",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {
                        label: "Liste des emplois",
                    },
                    create: {
                        label: "Liste des emplois",
                        bookLabel: "Emploi",
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        slug: "1-0-0-emploi",
                        createdBy: "system"
                    }
                })
                //Associate with Form
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Emploi",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Emploi",
                            formType: "DSN_EMPLOI",
                            formVersion: 1
                        }
                    },
                    update: {
                        formTitle: 'Emploi',
                        formType: "DSN_EMPLOI",
                        formVersion: 1,
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Emploi",
                    },
                    create: {
                        formTitle: 'Emploi',
                        formType: "DSN_EMPLOI",
                        formVersion: 1,
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Emploi",
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
export const bookV0002Seed = new BookV0002Seed("BOOK_V0002", "Cahier des emplois", 8, "TASK_V0001")