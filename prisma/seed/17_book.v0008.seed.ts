
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

class BookV0008Seed extends Seed {
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
                        slug: "brut",
                    },
                    update: {
                        label: "Cahier des rémunérations",
                        status: "actif",
                        slug: "brut",
                        description: "Cahier des rémunérations",
                    },
                    create: {
                        label: "Cahier des rémunérations",
                        status: "actif",
                        slug: "brut",
                        createdBy: "system",
                        description: "Cahier des rémunérations",
                    },
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des rémunérations",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Salaire de base",
                        bookLabel: "Cahier des rémunérations",
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        slug: "1-0-0-salaire-de-base",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des rémunérations",
                            level_1: 1,
                            level_2: 1,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Eléments variables",
                        bookLabel: "Cahier des rémunérations",
                        level_1: 1,
                        level_2: 1,
                        level_3: 0,
                        slug: "1-1-0-elements-variables",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des rémunérations",
                            level_1: 1,
                            level_2: 2,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Eléments fixes",
                        bookLabel: "Cahier des rémunérations",
                        level_1: 1,
                        level_2: 2,
                        level_3: 0,
                        slug: "1-2-0-elements-fixes",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des rémunérations",
                            level_1: 2,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Primes",
                        bookLabel: "Cahier des rémunérations",
                        level_1: 2,
                        level_2: 0,
                        level_3: 0,
                        slug: "2-0-0-primes",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des rémunérations",
                            level_1: 2,
                            level_2: 1,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Prime d'ancienneté",
                        bookLabel: "Cahier des rémunérations",
                        level_1: 2,
                        level_2: 1,
                        level_3: 0,
                        slug: "2-1-0-prime-d-anciennete",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des rémunérations",
                            level_1: 2,
                            level_2: 2,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Prime liée à l'activité",
                        bookLabel: "Cahier des rémunérations",
                        level_1: 2,
                        level_2: 2,
                        level_3: 0,
                        slug: "2-2-0-prime-liee-a-l-activite",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des rémunérations",
                            level_1: 2,
                            level_2: 3,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Prime non liée à l'activité",
                        bookLabel: "Cahier des rémunérations",
                        level_1: 2,
                        level_2: 3,
                        level_3: 0,
                        slug: "2-3-0-prime-non-liee-a-l-activite",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des rémunérations",
                            level_1: 3,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Rémunération bas de bulletin",
                        bookLabel: "Cahier des rémunérations",
                        level_1: 3,
                        level_2: 0,
                        level_3: 0,
                        slug: "3-0-0-remuneration-bas-de-bulletin",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des rémunérations",
                            level_1: 3,
                            level_2: 1,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Rémunération bas de bulletin gain",
                        bookLabel: "Cahier des rémunérations",
                        level_1: 3,
                        level_2: 1,
                        level_3: 0,
                        slug: "3-2-0-remuneration-bas-de-bulletin-gain",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des rémunérations",
                            level_1: 3,
                            level_2: 2,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Rémunération bas de bulletin retenue",
                        bookLabel: "Cahier des rémunérations",
                        level_1: 3,
                        level_2: 2,
                        level_3: 0,
                        slug: "3-2-0-remuneration-bas-de-bulletin-retenue",
                        createdBy: "system"
                    }
                })

                //Cotisations


                //Create book
                await prisma.book.upsert({
                    where: {
                        slug: "cotisation",
                    },
                    update: {
                        label: "Cahier des cotisations",
                        status: "actif",
                        slug: "cotisation",
                        description: "Cahier des cotisations",
                    },
                    create: {
                        label: "Cahier des cotisations",
                        status: "actif",
                        slug: "cotisation",
                        createdBy: "system",
                        description: "Cahier des cotisations",
                    },
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "URSSAF",
                        bookLabel: "Cahier des cotisations",
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        slug: "1-0-0-cotisation-urssaf",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 2,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "MSA",
                        bookLabel: "Cahier des cotisations",
                        level_1: 2,
                        level_2: 0,
                        level_3: 0,
                        slug: "2-0-0-cotisation-msa",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 3,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Retraite",
                        bookLabel: "Cahier des cotisations",
                        level_1: 3,
                        level_2: 0,
                        level_3: 0,
                        slug: "3-0-0-cotisation-retraite",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 3,
                            level_2: 1,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "IRCANTEC",
                        bookLabel: "Cahier des cotisations",
                        level_1: 3,
                        level_2: 1,
                        level_3: 0,
                        slug: "3-1-0-cotisation-ircantec",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 4,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Prévoyance",
                        bookLabel: "Cahier des cotisations",
                        level_1: 4,
                        level_2: 0,
                        level_3: 0,
                        slug: "4-0-0-cotisation-prevoyance",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 4,
                            level_2: 1,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Prévoyance non cadre",
                        bookLabel: "Cahier des cotisations",
                        level_1: 4,
                        level_2: 1,
                        level_3: 0,
                        slug: "4-1-0-cotisation-prevoyance-non-cadre",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 4,
                            level_2: 1,
                            level_3: 1
                        }
                    },
                    update: {},
                    create: {
                        label: "Prévoyance non cadre supplémentaire",
                        bookLabel: "Cahier des cotisations",
                        level_1: 4,
                        level_2: 1,
                        level_3: 1,
                        slug: "4-1-1-cotisation-prevoyance-supplementaire-non-cadre",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 4,
                            level_2: 2,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Prévoyance cadre",
                        bookLabel: "Cahier des cotisations",
                        level_1: 4,
                        level_2: 2,
                        level_3: 0,
                        slug: "4-2-0-cotisation-prevoyance-cadre",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 4,
                            level_2: 2,
                            level_3: 1
                        }
                    },
                    update: {},
                    create: {
                        label: "Prévoyance cadre supplémentaire",
                        bookLabel: "Cahier des cotisations",
                        level_1: 4,
                        level_2: 2,
                        level_3: 1,
                        slug: "4-2-1-cotisation-prevoyance-cadre-supplementaire",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 5,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Mutuelle",
                        bookLabel: "Cahier des cotisations",
                        level_1: 5,
                        level_2: 0,
                        level_3: 0,
                        slug: "5-0-0-cotisation-mutuelle",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 5,
                            level_2: 1,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Mutuelle non cadre",
                        bookLabel: "Cahier des cotisations",
                        level_1: 5,
                        level_2: 1,
                        level_3: 0,
                        slug: "5-1-0-cotisation-mutuelle-non-cadre",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 5,
                            level_2: 1,
                            level_3: 1
                        }
                    },
                    update: {},
                    create: {
                        label: "Mutuelle non cadre supplémentaire",
                        bookLabel: "Cahier des cotisations",
                        level_1: 5,
                        level_2: 1,
                        level_3: 1,
                        slug: "5-1-1-cotisation-mutuelle-non-cadre-supplementaire",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 5,
                            level_2: 2,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Mutuelle cadre",
                        bookLabel: "Cahier des cotisations",
                        level_1: 5,
                        level_2: 2,
                        level_3: 0,
                        slug: "5-2-0-cotisation-mutuelle-cadre",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 5,
                            level_2: 2,
                            level_3: 1
                        }
                    },
                    update: {},
                    create: {
                        label: "Mutuelle cadre supplémentaire",
                        bookLabel: "Cahier des cotisations",
                        level_1: 5,
                        level_2: 2,
                        level_3: 1,
                        slug: "5-2-1-cotisation-mutuelle-cadre-supplementaire",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 6,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Retraitre supplémentaire",
                        bookLabel: "Cahier des cotisations",
                        level_1: 6,
                        level_2: 0,
                        level_3: 0,
                        slug: "6-0-0-cotisation-retraire-supplementaire",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 6,
                            level_2: 1,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Retraitre supplémentaire non cadre",
                        bookLabel: "Cahier des cotisations",
                        level_1: 6,
                        level_2: 1,
                        level_3: 0,
                        slug: "6-1-0-cotisation-retraire-supplementaire-non-cadre",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 6,
                            level_2: 2,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Retraitre supplémentaire cadre",
                        bookLabel: "Cahier des cotisations",
                        level_1: 6,
                        level_2: 2,
                        level_3: 0,
                        slug: "6-2-0-cotisation-retraire-supplementaire-cadre",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des cotisations",
                            level_1: 7,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Caisse de congés payés",
                        bookLabel: "Cahier des cotisations",
                        level_1: 7,
                        level_2: 0,
                        level_3: 0,
                        slug: "7-0-0-cotisation-caisse-de-conges-payes",
                        createdBy: "system"
                    }
                })
                //DSN contrat
                await prisma.book.upsert({
                    where: {
                        slug: "contrat-dsn",
                    },
                    update: {
                        label: "Cahier des contrats DSN",
                        status: "actif",
                        slug: "contrat-dsn",
                        description: "Cahier des contrats DSN prévoyance, mutuelle, retraite supplémentaire",
                    },
                    create: {
                        label: "Cahier des contrats DSN",
                        status: "actif",
                        slug: "contrat-dsn",
                        createdBy: "system",
                        description: "Cahier des contrats DSN prévoyance, mutuelle, retraite supplémentaire",
                    },
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des contrats DSN",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Liste des contrats",
                        bookLabel: "Cahier des contrats DSN",
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        slug: "1-0-0-contrats-dsn",
                        createdBy: "system"
                    }
                })
                //absences
                await prisma.book.upsert({
                    where: {
                        slug: "absences",
                    },
                    update: {
                        label: "Cahier des absences",
                        status: "actif",
                        slug: "absences",
                        description: "Cahier des absences",
                    },
                    create: {
                        label: "Cahier des absences",
                        status: "actif",
                        slug: "absences",
                        createdBy: "system",
                        description: "Cahier des absences",
                    },
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Absences sécurité sociale",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Absences sécurité sociale",
                        bookLabel: "Cahier des absences",
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        slug: "1-0-0-absences-securite-sociale",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Absences sécurité sociale",
                            level_1: 2,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Absences hors sécurité sociale",
                        bookLabel: "Cahier des absences",
                        level_1: 2,
                        level_2: 0,
                        level_3: 0,
                        slug: "2-0-0-absences-hors-securite-sociale",
                        createdBy: "system"
                    }
                })
                //maintien des salaires
                await prisma.book.upsert({
                    where: {
                        slug: "maintien-des-salaires",
                    },
                    update: {
                        label: "Cahier des maintiens des salaires",
                        status: "actif",
                        slug: "maintien-des-salaires",
                        description: "Cahier des maintiens des salaires",
                    },
                    create: {
                        label: "Cahier des maintiens des salaires",
                        status: "actif",
                        slug: "maintien-des-salaires",
                        createdBy: "system",
                        description: "Cahier des maintiens des salaires",
                    },
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des maintiens des salaires",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Maladie",
                        bookLabel: "Cahier des maintiens des salaires",
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        slug: "1-0-0-maladie",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des maintiens des salaires",
                            level_1: 2,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Maladie professionnel",
                        bookLabel: "Cahier des maintiens des salaires",
                        level_1: 2,
                        level_2: 0,
                        level_3: 0,
                        slug: "2-0-0-maladie-professionnel",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des maintiens des salaires",
                            level_1: 3,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Accident du travail",
                        bookLabel: "Cahier des maintiens des salaires",
                        level_1: 3,
                        level_2: 0,
                        level_3: 0,
                        slug: "3-0-0-accident-du-travail",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des maintiens des salaires",
                            level_1: 4,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Accident de trajet",
                        bookLabel: "Cahier des maintiens des salaires",
                        level_1: 4,
                        level_2: 0,
                        level_3: 0,
                        slug: "4-0-0-accident-de-trajet",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des maintiens des salaires",
                            level_1: 5,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Maternité",
                        bookLabel: "Cahier des maintiens des salaires",
                        level_1: 5,
                        level_2: 0,
                        level_3: 0,
                        slug: "5-0-0-maternite",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des maintiens des salaires",
                            level_1: 6,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Paternité",
                        bookLabel: "Cahier des maintiens des salaires",
                        level_1: 6,
                        level_2: 0,
                        level_3: 0,
                        slug: "6-0-0-paternite",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des maintiens des salaires",
                            level_1: 7,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Adoption",
                        bookLabel: "Cahier des maintiens des salaires",
                        level_1: 7,
                        level_2: 0,
                        level_3: 0,
                        slug: "7-0-0-adoption",
                        createdBy: "system"
                    }
                })
                //Congés payés
                await prisma.book.upsert({
                    where: {
                        slug: "conges-payes",
                    },
                    update: {
                        label: "Cahier des congés payés",
                        status: "actif",
                        slug: "conges-payes",
                        description: "Cahier du paramétrage des congés payés",
                    },
                    create: {
                        label: "Cahier des congés payés",
                        status: "actif",
                        slug: "conges-payes",
                        createdBy: "system",
                        description: "Cahier du paramétrage des congés payés",
                    },
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des congés payés",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Congés payés",
                        bookLabel: "Cahier des congés payés",
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        slug: "1-0-0-conges-payes",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des congés payés",
                            level_1: 1,
                            level_2: 1,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Mode de calcul",
                        bookLabel: "Cahier des congés payés",
                        level_1: 1,
                        level_2: 1,
                        level_3: 0,
                        slug: "1-1-0-mode-de-calcul",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des congés payés",
                            level_1: 1,
                            level_2: 2,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Date de cloture",
                        bookLabel: "Cahier des congés payés",
                        level_1: 1,
                        level_2: 2,
                        level_3: 0,
                        slug: "1-2-0-date-de-cloture",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des congés payés",
                            level_1: 1,
                            level_2: 3,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Solde de tout compte",
                        bookLabel: "Cahier des congés payés",
                        level_1: 1,
                        level_2: 3,
                        level_3: 0,
                        slug: "1-3-0-soldes-de-tout-compte",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des congés payés",
                            level_1: 1,
                            level_2: 3,
                            level_3: 1
                        }
                    },
                    update: {},
                    create: {
                        label: "Méthode d'arrondi",
                        bookLabel: "Cahier des congés payés",
                        level_1: 1,
                        level_2: 3,
                        level_3: 1,
                        slug: "1-3-1-methode-d-arrondi",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des congés payés",
                            level_1: 1,
                            level_2: 3,
                            level_3: 2
                        }
                    },
                    update: {},
                    create: {
                        label: "Valorisation",
                        bookLabel: "Cahier des congés payés",
                        level_1: 1,
                        level_2: 3,
                        level_3: 2,
                        slug: "1-3-2-methode-de-valorisation",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des congés payés",
                            level_1: 1,
                            level_2: 4,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Cloture de la période",
                        bookLabel: "Cahier des congés payés",
                        level_1: 1,
                        level_2: 4,
                        level_3: 0,
                        slug: "1-4-0-conges-payes-cloture-de-la-periode",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des congés payés",
                            level_1: 1,
                            level_2: 4,
                            level_3: 1
                        }
                    },
                    update: {},
                    create: {
                        label: "Méthode d'arrondi",
                        bookLabel: "Cahier des congés payés",
                        level_1: 1,
                        level_2: 4,
                        level_3: 1,
                        slug: "1-4-1-methode-d-arrondi",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des congés payés",
                            level_1: 1,
                            level_2: 4,
                            level_3: 0
                        }
                    },
                    update: {},
                    create: {
                        label: "Congés payés ancienneté",
                        bookLabel: "Cahier des congés payés",
                        level_1: 1,
                        level_2: 3,
                        level_3: 0,
                        slug: "1-3-0-soldes-de-tout-compte",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des congés payés",
                            level_1: 1,
                            level_2: 4,
                            level_3: 2
                        }
                    },
                    update: {},
                    create: {
                        label: "Valorisation",
                        bookLabel: "Cahier des congés payés",
                        level_1: 1,
                        level_2: 4,
                        level_3: 2,
                        slug: "1-4-2-methode-de-valorisation",
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
export const bookV0008Seed = new BookV0008Seed("BOOK_V0008", "Cahiers rémunérations, cotisations,contrat DSN,absences, congés payés, maintien des salaires", 17, "BOOK_V0007")