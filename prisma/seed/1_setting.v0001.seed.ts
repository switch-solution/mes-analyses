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

class SettingV0001 extends Seed {
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
                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "MODE",
                            label: "Environnement",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {
                        id: "MODE",
                        label: "Environnement",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Environnement de l'application",
                        value: process.env.MODE ? process.env.MODE : "development",
                        createdBy: "system",
                        system: true
                    },
                    create: {
                        id: "MODE",
                        label: "Environnement",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Environnement de l'application",
                        value: process.env.MODE ? process.env.MODE : "development",
                        createdBy: "system",
                        system: true

                    }
                })

                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "PRICING",
                            label: "Prix",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {
                        id: "PRICING",
                        label: "Prix",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Prix par default pour un utilisateur par mois",
                        value: "10",
                        createdBy: "system",
                        system: true
                    },
                    create: {
                        id: "PRICING",
                        label: "Prix",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Prix par default pour un utilisateur par mois",
                        value: "10",
                        createdBy: "system",
                        system: true
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

export const settingV0001 = new SettingV0001("SETTING_V0001", "Paramétrage de base de l'application", 1, "")

