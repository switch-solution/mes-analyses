
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

class BookV0011Seed extends Seed {
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
                            bookLabel: "Cahier des rémunérations",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Salaire de base",
                            formType: "STD_SALAIRE_DE_BASE",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Salaire de base",
                        formType: "STD_SALAIRE_DE_BASE",
                        formVersion: 1,
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des rémunérations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des rémunérations",
                            level_1: 1,
                            level_2: 1,
                            level_3: 0,
                            formTitle: "Rémunération éléments variables",
                            formType: "STD_REMUNERATION_ELEMENTS_VARIABLES",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Rémunération éléments variables",
                        formType: "STD_REMUNERATION_ELEMENTS_VARIABLES",
                        formVersion: 1,
                        level_1: 1,
                        level_2: 1,
                        level_3: 0,
                        bookLabel: "Cahier des rémunérations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des rémunérations",
                            level_1: 1,
                            level_2: 2,
                            level_3: 0,
                            formTitle: "Rémunération éléments fixes",
                            formType: "STD_REMUNERATION_ELEMENTS_FIXES",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Rémunération éléments fixes",
                        formType: "STD_REMUNERATION_ELEMENTS_FIXES",
                        formVersion: 1,
                        level_1: 1,
                        level_2: 2,
                        level_3: 0,
                        bookLabel: "Cahier des rémunérations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des rémunérations",
                            level_1: 2,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Rémunération primes",
                            formType: "STD_REMUNERATION_PRIMES",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Rémunération primes",
                        formType: "STD_REMUNERATION_PRIMES",
                        formVersion: 1,
                        level_1: 2,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des rémunérations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des rémunérations",
                            level_1: 2,
                            level_2: 1,
                            level_3: 0,
                            formTitle: "Rémunération primes ancienneté",
                            formType: "STD_REMUNERATION_PRIMES_ANCIENNETE",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Rémunération primes ancienneté",
                        formType: "STD_REMUNERATION_PRIMES_ANCIENNETE",
                        formVersion: 1,
                        level_1: 2,
                        level_2: 1,
                        level_3: 0,
                        bookLabel: "Cahier des rémunérations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des rémunérations",
                            level_1: 2,
                            level_2: 2,
                            level_3: 0,
                            formTitle: "Rémunération primes non liées à l'activité",
                            formType: "STD_REMUNERATION_PRIMES_NON_LIEES_ACTIVITE",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Rémunération primes non liées à l'activité",
                        formType: "STD_REMUNERATION_PRIMES_NON_LIEES_ACTIVITE",
                        formVersion: 1,
                        level_1: 2,
                        level_2: 2,
                        level_3: 0,
                        bookLabel: "Cahier des rémunérations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des rémunérations",
                            level_1: 2,
                            level_2: 3,
                            level_3: 0,
                            formTitle: "Rémunération primes liées à l'activité",
                            formType: "STD_REMUNERATION_PRIMES_LIEES_ACTIVITE",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Rémunération primes liées à l'activité",
                        formType: "STD_REMUNERATION_PRIMES_LIEES_ACTIVITE",
                        formVersion: 1,
                        level_1: 2,
                        level_2: 3,
                        level_3: 0,
                        bookLabel: "Cahier des rémunérations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des rémunérations",
                            level_1: 3,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Rémunération bas de bulletin",
                            formType: "STD_REMUNERATION_BAS_BULLETIN",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Rémunération bas de bulletin",
                        formType: "STD_REMUNERATION_BAS_BULLETIN",
                        formVersion: 1,
                        level_1: 3,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des rémunérations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des rémunérations",
                            level_1: 3,
                            level_2: 1,
                            level_3: 0,
                            formTitle: "Rémunération bas de bulletin gain",
                            formType: "STD_REMUNERATION_BAS_BULLETIN_GAIN",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Rémunération bas de bulletin gain",
                        formType: "STD_REMUNERATION_BAS_BULLETIN_GAIN",
                        formVersion: 1,
                        level_1: 3,
                        level_2: 1,
                        level_3: 0,
                        bookLabel: "Cahier des rémunérations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des rémunérations",
                            level_1: 3,
                            level_2: 2,
                            level_3: 0,
                            formTitle: "RRémunération bas de bulletin retenue",
                            formType: "STD_REMUNERATION_BAS_BULLETIN_RETENUE",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Rémunération bas de bulletin retenue",
                        formType: "STD_REMUNERATION_BAS_BULLETIN_RETENUE",
                        formVersion: 1,
                        level_1: 3,
                        level_2: 2,
                        level_3: 0,
                        bookLabel: "Cahier des rémunérations",
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
export const bookV0011Seed = new BookV0011Seed("BOOK_V0011", "Création des chapitres cahiers rémunération", 23, "FORM_V0006")