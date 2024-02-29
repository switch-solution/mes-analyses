
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

class BookV0001Seed extends Seed {
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
                        slug: "structure-juridique",
                    },
                    update: {
                        label: "Structure juridique",
                        status: "actif",
                        slug: "structure-juridique",
                        description: "Cahier de rédaction de la structure juridique de l'entreprise",
                    },
                    create: {
                        label: "Structure juridique",
                        status: "actif",
                        slug: "structure-juridique",
                        createdBy: "system",
                        description: "Cahier de rédaction de la structure juridique de l'entreprise",
                    },
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Structure juridique",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {
                        label: "Liste des sociétés",
                    },
                    create: {
                        label: "Préambule",
                        bookLabel: "Structure juridique",
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        slug: "1-0-0-societes",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Structure juridique",
                            level_1: 2,
                            level_2: 0,
                            level_3: 0

                        }
                    },
                    update: {
                        label: "Liste des établissements",
                    },
                    create: {
                        label: "Etablissements",
                        bookLabel: "Structure juridique",
                        level_1: 2,
                        level_2: 0,
                        level_3: 0,
                        slug: "2-0-0-etablissements",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Structure juridique",
                            level_1: 3,
                            level_2: 0,
                            level_3: 0

                        }
                    },
                    update: {
                        label: "Liste des banques établissement",
                    },
                    create: {
                        label: "Liste des banques établissement",
                        bookLabel: "Structure juridique",
                        level_1: 3,
                        level_2: 0,
                        level_3: 0,
                        slug: "3-0-0-banques-etablissement",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Structure juridique",
                            level_1: 4,
                            level_2: 0,
                            level_3: 0

                        }
                    },
                    update: {
                        label: "Caisses de cotisation",
                    },
                    create: {
                        label: "Caisses de cotisation",
                        bookLabel: "Structure juridique",
                        level_1: 4,
                        level_2: 0,
                        level_3: 0,
                        slug: "4-0-0-caisses-cotisation",
                        createdBy: "system"
                    }
                })
                //Associate with Form
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Structure juridique",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Société",
                            formType: "DSN_SOCIETE",
                            formVersion: 1
                        }
                    },
                    update: {
                        formTitle: 'Société',
                        formType: 'DSN_SOCIETE',
                        formVersion: 1,
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Structure juridique",
                    },
                    create: {
                        formTitle: 'Société',
                        formType: 'DSN_SOCIETE',
                        formVersion: 1,
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Structure juridique",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            formTitle: 'Etablissement',
                            formType: 'DSN_ETABLISSEMENT',
                            formVersion: 1,
                            level_1: 2,
                            level_2: 0,
                            level_3: 0,
                            bookLabel: "Structure juridique",
                        }
                    },
                    update: {
                        formTitle: 'Etablissement',
                        formType: 'DSN_ETABLISSEMENT',
                        formVersion: 1,
                        level_1: 2,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Structure juridique",
                    },
                    create: {
                        formTitle: 'Etablissement',
                        formType: 'DSN_ETABLISSEMENT',
                        formVersion: 1,
                        level_1: 2,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Structure juridique",
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
export const bookV0001Seed = new BookV0001Seed("BOOK_V0001", "Cahier entreprise et établissement", 3, "IDCC_V0001")