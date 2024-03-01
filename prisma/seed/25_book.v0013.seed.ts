
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

class BookV0013Seed extends Seed {
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
                        slug: "interface-sortante",
                    },
                    update: {},
                    create: {
                        label: "Interface sortante",
                        status: "actif",
                        slug: "interface-sortante",
                        createdBy: "system",
                        description: "Cahier des interfaces sortantes de la solution",
                    },
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Interface sortante",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Préambule",
                        bookLabel: "Interface sortante",
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        slug: "1-0-0-interface-sortante-preambule",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Interface sortante",
                            level_1: 1,
                            level_2: 1,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Format",
                        bookLabel: "Interface sortante",
                        level_1: 1,
                        level_2: 1,
                        level_3: 0,
                        slug: "1-1-0-interface-sortante-description",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Interface sortante",
                            level_1: 2,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Tracer des données du fichier interace",
                        bookLabel: "Interface sortante",
                        level_1: 2,
                        level_2: 0,
                        level_3: 0,
                        slug: "1-1-0-interface-sortante-tracer",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Interface sortante",
                            level_1: 2,
                            level_2: 1,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Régles de nommage",
                        bookLabel: "Interface sortante",
                        level_1: 2,
                        level_2: 1,
                        level_3: 0,
                        slug: "1-1-0-interface-sortante-nommage",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Interface sortante",
                            level_1: 2,
                            level_2: 2,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Régles métiers",
                        bookLabel: "Interface sortante",
                        level_1: 2,
                        level_2: 2,
                        level_3: 0,
                        slug: "1-1-0-interface-sortante-metiers",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Interface sortante",
                            level_1: 2,
                            level_2: 3,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Périodicité",
                        bookLabel: "Interface sortante",
                        level_1: 2,
                        level_2: 3,
                        level_3: 0,
                        slug: "1-1-0-interface-sortante-periodicite",
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
export const bookV0013Seed = new BookV0013Seed("BOOK_V0013", "Création du cahier des interfaces sortantes", 25, "BOOK_V0012")