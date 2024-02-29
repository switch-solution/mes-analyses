
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

class BookV0003Seed extends Seed {
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
                        slug: "ccn",
                    },
                    update: {
                        label: "Convention collective nationale",
                        status: "actif",
                        slug: "ccn",
                        description: "Cahier des codes conventions collectives",
                    },
                    create: {
                        label: "Convention collective nationale",
                        status: "actif",
                        slug: "ccn",
                        createdBy: "system",
                        description: "Cahier des codes conventions collectives",
                    },
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Convention collective nationale",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {
                        label: "Liste des conventions collectives",
                    },
                    create: {
                        label: "Liste des conventions collectives",
                        bookLabel: "Convention collective nationale",
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        slug: "1-0-0-ccn",
                        createdBy: "system"
                    }
                })
                //Associate with Form
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Convention collective nationale",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Convention collective",
                            formType: "DSN_CONVENTION_COLLECTIVE",
                            formVersion: 1
                        }
                    },
                    update: {
                        formTitle: "Convention collective",
                        formType: "DSN_CONVENTION_COLLECTIVE",
                        formVersion: 1,
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Convention collective nationale",
                    },
                    create: {
                        formTitle: "Convention collective",
                        formType: "DSN_CONVENTION_COLLECTIVE",
                        formVersion: 1,
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Convention collective nationale",
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
export const bookV0003Seed = new BookV0003Seed("BOOK_V0003", "Cahier des ccn", 10, "FORM_V0002")