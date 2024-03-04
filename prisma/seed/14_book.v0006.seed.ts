
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

class BookV0006Seed extends Seed {
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
                        slug: "caisse-de-cotisation",
                    },
                    update: {},
                    create: {
                        label: "Caisses de cotisation",
                        status: "actif",
                        slug: "caisse-de-cotisation",
                        createdBy: "system",
                        description: "Cahier des caisses de cotisation de votre organisation",
                    },
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Caisses de cotisation",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {
                        label: "Sécurité sociale",
                    },
                    create: {
                        label: "Sécurité sociale",
                        bookLabel: "Caisses de cotisation",
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        slug: "1-0-0-securite-sociale",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Caisses de cotisation",
                            level_1: 1,
                            level_2: 1,
                            level_3: 0
                        }
                    },
                    update: {
                        label: "URSSAF",
                    },
                    create: {
                        label: "URSSAF",
                        bookLabel: "Caisses de cotisation",
                        level_1: 1,
                        level_2: 1,
                        level_3: 0,
                        slug: "1-1-0-urssaf",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Caisses de cotisation",
                            level_1: 1,
                            level_2: 2,
                            level_3: 0
                        }
                    },
                    update: {
                        label: "URSSAF",
                    },
                    create: {
                        label: "MSA",
                        bookLabel: "Caisses de cotisation",
                        level_1: 1,
                        level_2: 2,
                        level_3: 0,
                        slug: "1-2-0-msa",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Caisses de cotisation",
                            level_1: 2,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Retraite",
                        bookLabel: "Caisses de cotisation",
                        level_1: 2,
                        level_2: 0,
                        level_3: 0,
                        slug: "2-0-0-retraite",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Caisses de cotisation",
                            level_1: 3,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {
                        label: "Prévoyance",
                    },
                    create: {
                        label: "Prévoyance",
                        bookLabel: "Caisses de cotisation",
                        level_1: 3,
                        level_2: 0,
                        level_3: 0,
                        slug: "3-0-0-prevoyance",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Caisses de cotisation",
                            level_1: 4,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {
                        label: "Mutuelle",
                    },
                    create: {
                        label: "Mutuelle",
                        bookLabel: "Caisses de cotisation",
                        level_1: 4,
                        level_2: 0,
                        level_3: 0,
                        slug: "4-0-0-mutuelle",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Caisses de cotisation",
                            level_1: 5,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {
                        label: "Retraite supplémentaire",
                    },
                    create: {
                        label: "Retraite supplémentaire",
                        bookLabel: "Caisses de cotisation",
                        level_1: 5,
                        level_2: 0,
                        level_3: 0,
                        slug: "5-0-0-retraite-supplementaire",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Caisses de cotisation",
                            level_1: 6,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Caisse de congé payé",
                        bookLabel: "Caisses de cotisation",
                        level_1: 6,
                        level_2: 0,
                        level_3: 0,
                        slug: "6-0-0-caisse-cp",
                        createdBy: "system"
                    }
                })

                //Associate with Form
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Caisses de cotisation",
                            level_1: 1,
                            level_2: 1,
                            level_3: 0,
                            formTitle: "Caisse de cotisation URSSAF",
                            formType: "DSN_ORGANISME_SOCIAUX_URSSAF",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Caisse de cotisation URSSAF",
                        formType: "DSN_ORGANISME_SOCIAUX_URSSAF",
                        formVersion: 1,
                        level_1: 1,
                        level_2: 1,
                        level_3: 0,
                        bookLabel: "Caisses de cotisation",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Caisses de cotisation",
                            level_1: 1,
                            level_2: 2,
                            level_3: 0,
                            formTitle: "Caisse de cotisation MSA",
                            formType: "DSN_ORGANISME_SOCIAUX_MSA",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Caisse de cotisation MSA",
                        formType: "DSN_ORGANISME_SOCIAUX_MSA",
                        formVersion: 1,
                        level_1: 1,
                        level_2: 2,
                        level_3: 0,
                        bookLabel: "Caisses de cotisation",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Caisses de cotisation",
                            level_1: 2,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Caisse de cotisation retraite",
                            formType: "DSN_ORGANISME_SOCIAUX_RETRAITE",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Caisse de cotisation retraite",
                        formType: "DSN_ORGANISME_SOCIAUX_RETRAITE",
                        formVersion: 1,
                        level_1: 2,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Caisses de cotisation",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Caisses de cotisation",
                            level_1: 3,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Caisse de cotisation prévoyance",
                            formType: "DSN_ORGANISME_SOCIAUX_PREVOYANCE",
                            formVersion: 1
                        }
                    },
                    update: {},
                    create: {
                        formTitle: "Caisse de cotisation prévoyance",
                        formType: "DSN_ORGANISME_SOCIAUX_PREVOYANCE",
                        formVersion: 1,
                        level_1: 3,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Caisses de cotisation",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Caisses de cotisation",
                            level_1: 4,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Caisse de cotisation mutuelle",
                            formType: "DSN_ORGANISME_SOCIAUX_MUTUELLE",
                            formVersion: 1
                        }
                    },
                    update: {
                    },
                    create: {
                        formTitle: "Caisse de cotisation mutuelle",
                        formType: "DSN_ORGANISME_SOCIAUX_MUTUELLE",
                        formVersion: 1,
                        level_1: 4,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Caisses de cotisation",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Caisses de cotisation",
                            level_1: 5,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Caisse de cotisation retraite supplémentaire",
                            formType: "DSN_ORGANISME_SOCIAUX_RETRAITE_SUPPLEMENTAIRE",
                            formVersion: 1
                        }
                    },
                    update: {
                    },
                    create: {
                        formTitle: "Caisse de cotisation retraite supplémentaire",
                        formType: "DSN_ORGANISME_SOCIAUX_RETRAITE_SUPPLEMENTAIRE",
                        formVersion: 1,
                        level_1: 5,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Caisses de cotisation",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Caisses de cotisation",
                            level_1: 6,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Caisse de congé payé",
                            formType: "DSN_ORGANISME_SOCIAUX_CAISSE_CP",
                            formVersion: 1
                        }
                    },
                    update: {
                        formTitle: "Caisse de congé payé",
                        formType: "DSN_ORGANISME_SOCIAUX_CAISSE_CP",
                        formVersion: 1,
                        level_1: 6,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Caisses de cotisation",
                    },
                    create: {
                        formTitle: "Caisse de congé payé",
                        formType: "DSN_ORGANISME_SOCIAUX_CAISSE_CP",
                        formVersion: 1,
                        level_1: 6,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Caisses de cotisation",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Caisses de cotisation",
                            level_1: 5,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Caisse de cotisation retraite supplémentaire",
                            formType: "DSN_ORGANISME_SOCIAUX_RETRAITE_SUPPLEMENTAIRE",
                            formVersion: 1
                        }
                    },
                    update: {
                    },
                    create: {
                        formTitle: "Caisse de cotisation retraite supplémentaire",
                        formType: "DSN_ORGANISME_SOCIAUX_RETRAITE_SUPPLEMENTAIRE",
                        formVersion: 1,
                        level_1: 5,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Caisses de cotisation",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Caisses de cotisation",
                            level_1: 6,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Caisse de congé payé",
                            formType: "DSN_ORGANISME_SOCIAUX_CAISSE_CP",
                            formVersion: 1
                        }
                    },
                    update: {
                    },
                    create: {
                        formTitle: "Caisse de congé payé",
                        formType: "DSN_ORGANISME_SOCIAUX_CAISSE_CP",
                        formVersion: 1,
                        level_1: 6,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Caisses de cotisation",
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
export const bookV0006Seed = new BookV0006Seed("BOOK_V0006", "Cahier des services", 14, "FORM_V0003")