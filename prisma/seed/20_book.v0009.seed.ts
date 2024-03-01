
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

class BookV0009Seed extends Seed {
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
                        slug: "categories-salaries",
                    },
                    update: {},
                    create: {
                        label: "Cahier des catégories salariés",
                        status: "actif",
                        slug: "categories-salaries",
                        description: "Cahier des catégories des salariés",
                    },
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des catégories salariés",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Catégories salariés",
                        bookLabel: "Cahier des catégories salariés",
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        slug: "1-0-0-categories-salaries",
                        createdBy: "system"
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
export const bookV0009Seed = new BookV0009Seed("BOOK_V0009", "Cahiers des catégories salariés", 20, "FORM_V0005")