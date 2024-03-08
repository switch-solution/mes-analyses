
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

class BookV0010Seed extends Seed {
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

                //Associate with Form cahier des catégories salariés
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des catégories salariés",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Catégorie de salarié",
                            formType: "STD_CATEGORIE_SALARIE",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Catégorie de salarié",
                        formType: "STD_CATEGORIE_SALARIE",
                        formVersion: 1,
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des catégories salariés",
                    }
                })
                //Associate with Form cahier des contrat DSN
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des contrats DSN",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Contrat DSN",
                            formType: "DSN_CONTRAT",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Contrat DSN",
                        formType: "DSN_CONTRAT",
                        formVersion: 1,
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des contrats DSN",
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
export const bookV0010Seed = new BookV0010Seed("BOOK_V0010", "Création des chapitres cahier catégorie,contrat DSN,absences", 21, "BOOK_V0009")