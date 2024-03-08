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

class AbsenceV0001 extends Seed {
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
                await this.seedUpdateStatus("pending")
                await prisma.absence.upsert({
                    where: {
                        label: "Maladie",
                    },
                    update: {},
                    create: {
                        label: "Maladie",
                        code: "MAL",
                        isSocialSecurity: true,
                        description: "Absence pour maladie",
                        createdBy: "system",
                    }
                })
                await prisma.absence.upsert({
                    where: {
                        label: "Maladie professionnelle",
                    },
                    update: {},
                    create: {
                        label: "Maladie professionnelle",
                        code: "MAL_PRO",
                        isSocialSecurity: true,
                        description: "Absence pour maladie professionnelle",
                        createdBy: "system",
                    }
                })
                await prisma.absence.upsert({
                    where: {
                        label: "Accident du travail",
                    },
                    update: {},
                    create: {
                        label: "Accident du travail",
                        code: "AT",
                        isSocialSecurity: true,
                        description: "Absence pour accident du travail",
                        createdBy: "system",
                    }
                })
                await prisma.absence.upsert({
                    where: {
                        label: "Accident de trajet",
                    },
                    update: {},
                    create: {
                        label: "Accident de trajet",
                        code: "ATJ",
                        isSocialSecurity: true,
                        description: "Absence pour accident de trajet",
                        createdBy: "system",
                    }
                })
                await prisma.absence.upsert({
                    where: {
                        label: "Maternité",
                    },
                    update: {},
                    create: {
                        label: "Maternité",
                        code: "MAT",
                        isSocialSecurity: true,
                        description: "Absence pour maternité",
                        createdBy: "system",
                    }
                })
                await prisma.absence.upsert({
                    where: {
                        label: "Paternité",
                    },
                    update: {},
                    create: {
                        label: "Paternité",
                        code: "PAT",
                        isSocialSecurity: true,
                        description: "Absence pour paternité",
                        createdBy: "system",
                    }
                })
                await prisma.absence.upsert({
                    where: {
                        label: "Adoption",
                    },
                    update: {},
                    create: {
                        label: "Adoption",
                        code: "ADO",
                        isSocialSecurity: true,
                        description: "Absence pour adoption",
                        createdBy: "system",
                    }
                })
                await prisma.absence.upsert({
                    where: {
                        label: "Congé sans solde",
                    },
                    update: {},
                    create: {
                        label: "Congé sans solde",
                        code: "CSS",
                        isSocialSecurity: false,
                        description: "Absence pour congé sans solde",
                        createdBy: "system",
                    }
                })
                await prisma.absence.upsert({
                    where: {
                        label: "Congé sabbatique",
                    },
                    update: {},
                    create: {
                        label: "Congé sabbatique",
                        code: "CSB",
                        isSocialSecurity: false,
                        description: "Absence pour congé sabbatique",
                        createdBy: "system",
                    }
                })
                await prisma.absence.upsert({
                    where: {
                        label: "Congé payé",
                    },
                    update: {},
                    create: {
                        label: "Congé payé",
                        code: "CP",
                        isSocialSecurity: false,
                        description: "Absence pour congé payé",
                        createdBy: "system",
                    }
                })
                await prisma.absence.upsert({
                    where: {
                        label: "Congé parental",
                    },
                    update: {},
                    create: {
                        label: "Congé parental",
                        code: "CPA",
                        isSocialSecurity: false,
                        description: "Absence pour congé parental",
                        createdBy: "system",
                    }
                })
                await prisma.absence.upsert({
                    where: {
                        label: "Congé de formation",
                    },
                    update: {},
                    create: {
                        label: "Congé de formation",
                        code: "CFO",
                        isSocialSecurity: false,
                        description: "Absence pour congé formation",
                        createdBy: "system",
                    }
                })
                await prisma.absence.upsert({
                    where: {
                        label: "Activité parielle",
                    },
                    update: {},
                    create: {
                        label: "Activité parielle",
                        code: "ACP",
                        isSocialSecurity: false,
                        description: "Absence pour activité partielle",
                        createdBy: "system",
                    }
                })
                await prisma.absence.upsert({
                    where: {
                        label: "RTT",
                    },
                    update: {},
                    create: {
                        label: "RTT",
                        code: "RTT",
                        isSocialSecurity: false,
                        description: "Absence pour RTT",
                        createdBy: "system",
                    }
                })
                await prisma.absence.upsert({
                    where: {
                        label: "Repos compensateur",
                    },
                    update: {},
                    create: {
                        label: "Repos compensateur",
                        code: "RC",
                        isSocialSecurity: false,
                        description: "Absence pour repos compensateur",
                        createdBy: "system",
                    }
                })
                await prisma.absence.upsert({
                    where: {
                        label: "Compte epargne temps",
                    },
                    update: {},
                    create: {
                        label: "Compte epargne temps",
                        code: "CET",
                        isSocialSecurity: false,
                        description: "Absence pour CET",
                        createdBy: "system",
                    }
                })



                await this.seedUpdateStatus("completed")
            }

        } catch (err) {
            console.error(err)
            await this.seedUpdateStatus("error")
        }


    }




}

export const absenceV0001 = new AbsenceV0001("ABSENCE_V0001", "Absence", 18, "BOOK_V0008")

