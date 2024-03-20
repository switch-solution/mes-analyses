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

class AbsenceV0002 extends Seed {
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
                await prisma.absence.update({
                    where: {
                        label: "Maladie",
                    },
                    data: {
                        dsnCode: "01",
                        dsnLabel: "Maladie",
                    },

                })
                await prisma.absence.update({
                    where: {
                        label: "Maladie professionnelle",
                    },
                    data: {
                        dsnCode: "05",
                        dsnLabel: "Maladie professionnelle",
                    },

                })
                await prisma.absence.update({
                    where: {
                        label: "Accident du travail",
                    },
                    data: {
                        dsnCode: "06",
                        dsnLabel: "Accident du travail",
                    },

                })
                await prisma.absence.update({
                    where: {
                        label: "Maternité",
                    },
                    data: {
                        dsnCode: "02",
                        dsnLabel: "Maternité",
                    },

                })
                await prisma.absence.update({
                    where: {
                        label: "Paternité",
                    },
                    data: {
                        dsnCode: "03",
                        dsnLabel: "Paternité",
                    },

                })
                await prisma.absence.update({
                    where: {
                        label: "Adoption",
                    },
                    data: {
                        dsnCode: "09",
                        dsnLabel: "Paternité",
                    },

                })
                await prisma.absence.update({
                    where: {
                        label: "Congé sans solde",
                    },
                    data: {
                        dsnCode: "501",
                        dsnLabel: "Congé divers non rémunéré",
                    },

                })
                await prisma.absence.update({
                    where: {
                        label: "Congé sabbatique",
                    },
                    data: {
                        dsnCode: "639",
                        dsnLabel: "Congé sabbatique",
                    },

                })
                await prisma.absence.update({
                    where: {
                        label: "Congé payé",
                    },
                    data: {
                        dsnCode: "200",
                        dsnLabel: "COP (Congés payés)",
                    },

                })
                await prisma.absence.update({
                    where: {
                        label: "Congé parental",
                    },
                    data: {
                        dsnCode: "632",
                        dsnLabel: "Congé parental d'éducation",
                    },

                })
                await prisma.absence.update({
                    where: {
                        label: "Congé de formation",
                    },
                    data: {
                        dsnCode: "301",
                        dsnLabel: "Congé de Formation Professionnelle",
                    },

                })
                await prisma.absence.update({
                    where: {
                        label: "Congé de formation",
                    },
                    data: {
                        dsnCode: "609",
                        dsnLabel: "CIF (Congé Individuel de Formation)",
                    },

                })


                await this.seedUpdateStatus("completed")
            }

        } catch (err) {
            console.error(err)
            await this.seedUpdateStatus("error")
        }


    }




}

export const absenceV0002 = new AbsenceV0002("ABSENCE_V0002", "Absence mise à jour des codes absences DSN", 38, "SETTING_V0003")

