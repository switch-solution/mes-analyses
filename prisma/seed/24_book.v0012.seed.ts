
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

class BookV0012Seed extends Seed {
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
                            bookLabel: "Cahier des cotisations",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Cotisations Urssaf",
                            formType: "STD_COTISATION_URSSAF",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Cotisations Urssaf",
                        formType: "STD_COTISATION_URSSAF",
                        formVersion: 1,
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des cotisations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 2,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Cotisation MSA",
                            formType: "STD_COTISATION_MSA",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Cotisation MSA",
                        formType: "STD_COTISATION_MSA",
                        formVersion: 1,
                        level_1: 2,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des cotisations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 3,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Cotisation retraite",
                            formType: "STD_COTISATION_RETRAITE",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Cotisation retraite",
                        formType: "STD_COTISATION_RETRAITE",
                        formVersion: 1,
                        level_1: 3,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des cotisations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 3,
                            level_2: 1,
                            level_3: 0,
                            formTitle: "Cotisation IRCANTEC",
                            formType: "STD_COTISATION_IRCANTEC",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Cotisation IRCANTEC",
                        formType: "STD_COTISATION_IRCANTEC",
                        formVersion: 1,
                        level_1: 3,
                        level_2: 1,
                        level_3: 0,
                        bookLabel: "Cahier des cotisations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 4,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Cotisation Prévoyance",
                            formType: "STD_COTISATION_PREVOYANCE",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Cotisation Prévoyance",
                        formType: "STD_COTISATION_PREVOYANCE",
                        formVersion: 1,
                        level_1: 4,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des cotisations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 4,
                            level_2: 1,
                            level_3: 0,
                            formTitle: "Cotisation Prévoyance non cadre",
                            formType: "STD_COTISATION_PREVOYANCE_NON_CADRE",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Cotisation Prévoyance non cadre",
                        formType: "STD_COTISATION_PREVOYANCE_NON_CADRE",
                        formVersion: 1,
                        level_1: 4,
                        level_2: 1,
                        level_3: 0,
                        bookLabel: "Cahier des cotisations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 4,
                            level_2: 1,
                            level_3: 1,
                            formTitle: "Cotisation Prévoyance non cadre supplémentaire",
                            formType: "STD_COTISATION_PREVOYANCE_NON_CADRE_SUPPLEMENTAIRE",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Cotisation Prévoyance non cadre supplémentaire",
                        formType: "STD_COTISATION_PREVOYANCE_NON_CADRE_SUPPLEMENTAIRE",
                        formVersion: 1,
                        level_1: 4,
                        level_2: 1,
                        level_3: 1,
                        bookLabel: "Cahier des cotisations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 4,
                            level_2: 2,
                            level_3: 0,
                            formTitle: "Cotisation Prévoyance cadre",
                            formType: "STD_COTISATION_PREVOYANCE_CADRE",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Cotisation Prévoyance cadre",
                        formType: "STD_COTISATION_PREVOYANCE_CADRE",
                        formVersion: 1,
                        level_1: 4,
                        level_2: 2,
                        level_3: 0,
                        bookLabel: "Cahier des cotisations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 4,
                            level_2: 2,
                            level_3: 1,
                            formTitle: "Cotisation Prévoyance cadre supplémentaire",
                            formType: "STD_COTISATION_PREVOYANCE_CADRE_SUPPLEMENTAIRE",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Cotisation Prévoyance cadre supplémentaire",
                        formType: "STD_COTISATION_PREVOYANCE_CADRE_SUPPLEMENTAIRE",
                        formVersion: 1,
                        level_1: 4,
                        level_2: 2,
                        level_3: 1,
                        bookLabel: "Cahier des cotisations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 5,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Cotisation Mutuelle",
                            formType: "STD_COTISATION_MUTUELLE",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Cotisation Mutuelle",
                        formType: "STD_COTISATION_MUTUELLE",
                        formVersion: 1,
                        level_1: 5,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des cotisations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 5,
                            level_2: 1,
                            level_3: 0,
                            formTitle: "Cotisation Mutuelle non cadre",
                            formType: "STD_COTISATION_MUTUELLE_NON_CADRE",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Cotisation Mutuelle non cadre",
                        formType: "STD_COTISATION_MUTUELLE_NON_CADRE",
                        formVersion: 1,
                        level_1: 5,
                        level_2: 1,
                        level_3: 0,
                        bookLabel: "Cahier des cotisations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 5,
                            level_2: 1,
                            level_3: 1,
                            formTitle: "Cotisation Mutuelle non cadre supplémentaire",
                            formType: "STD_COTISATION_MUTUELLE_NON_CADRE_SUPPLEMENTAIRE",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Cotisation Mutuelle non cadre supplémentaire",
                        formType: "STD_COTISATION_MUTUELLE_NON_CADRE_SUPPLEMENTAIRE",
                        formVersion: 1,
                        level_1: 5,
                        level_2: 1,
                        level_3: 1,
                        bookLabel: "Cahier des cotisations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 5,
                            level_2: 2,
                            level_3: 0,
                            formTitle: "Cotisation Mutuelle cadre",
                            formType: "STD_COTISATION_MUTUELLE_CADRE",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Cotisation Mutuelle cadre",
                        formType: "STD_COTISATION_MUTUELLE_CADRE",
                        formVersion: 1,
                        level_1: 5,
                        level_2: 2,
                        level_3: 0,
                        bookLabel: "Cahier des cotisations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 5,
                            level_2: 2,
                            level_3: 1,
                            formTitle: "Cotisation Mutuelle cadre supplémentaire",
                            formType: "STD_COTISATION_MUTUELLE_CADRE_SUPPLEMENTAIRE",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Cotisation Mutuelle cadre supplémentaire",
                        formType: "STD_COTISATION_MUTUELLE_CADRE_SUPPLEMENTAIRE",
                        formVersion: 1,
                        level_1: 5,
                        level_2: 2,
                        level_3: 1,
                        bookLabel: "Cahier des cotisations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 6,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Cotisation retraite supplémentaires",
                            formType: "STD_COTISATION_RETRAITE_SUPPLEMENTAIRE",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Cotisation retraite supplémentaires",
                        formType: "STD_COTISATION_RETRAITE_SUPPLEMENTAIRE",
                        formVersion: 1,
                        level_1: 6,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des cotisations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 6,
                            level_2: 1,
                            level_3: 0,
                            formTitle: "Cotisation retraite supplémentaires non cadre",
                            formType: "STD_COTISATION_RETRAITE_SUPPLEMENTAIRE_NON_CADRE",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Cotisation retraite supplémentaires non cadre",
                        formType: "STD_COTISATION_RETRAITE_SUPPLEMENTAIRE_NON_CADRE",
                        formVersion: 1,
                        level_1: 6,
                        level_2: 1,
                        level_3: 0,
                        bookLabel: "Cahier des cotisations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 6,
                            level_2: 2,
                            level_3: 0,
                            formTitle: "Cotisation retraite supplémentaires cadre",
                            formType: "STD_COTISATION_RETRAITE_SUPPLEMENTAIRE_CADRE",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Cotisation retraite supplémentaires cadre",
                        formType: "STD_COTISATION_RETRAITE_SUPPLEMENTAIRE_CADRE",
                        formVersion: 1,
                        level_1: 6,
                        level_2: 2,
                        level_3: 0,
                        bookLabel: "Cahier des cotisations",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 7,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Cotisation caisse de congés payés",
                            formType: "STD_COTISATION_CAISSE_CONGES_PAYES",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Cotisation caisse de congés payés",
                        formType: "STD_COTISATION_CAISSE_CONGES_PAYES",
                        formVersion: 1,
                        level_1: 7,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des cotisations",
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
export const bookV0012Seed = new BookV0012Seed("BOOK_V0012", "Création des chapitres cahiers rémunération", 24, "BOOK_V0011")