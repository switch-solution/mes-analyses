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
export async function settingSeed() {
    try {
        const SEED_NAME = "settingSeed"
        const seedExist = await prisma.prisma_Seed.findFirst({
            where: {
                name: SEED_NAME,
                status: "completed"
            }
        })
        if (!seedExist) {
            await prisma.prisma_Seed.upsert({
                where: {
                    name: SEED_NAME
                },
                update: {
                    name: SEED_NAME,
                    createdBy: "system",
                    status: "pending"
                },
                create: {
                    name: SEED_NAME,
                    createdBy: "system",
                    status: "pending"
                }
            })
            await prisma.setting.upsert({
                where: {
                    code_dateStart_dateEnd: {
                        code: "MODE",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01")
                    }
                },
                update: {
                    code: "MODE",
                    label: "Environnement",
                    dateStart: new Date("2024-01-01"),
                    dateEnd: new Date("4000-01-01"),
                    description: "Environnement de l'application",
                    value: process.env.MODE ? process.env.MODE : "development",
                    createdBy: "system"
                },
                create: {
                    code: "MODE",
                    label: "Environnement",
                    dateStart: new Date("2024-01-01"),
                    dateEnd: new Date("4000-01-01"),
                    description: "Environnement de l'application",
                    value: process.env.MODE ? process.env.MODE : "development",
                    createdBy: "system"
                }
            })

            await prisma.setting.upsert({
                where: {
                    code_dateStart_dateEnd: {
                        code: "PRICING",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01")
                    }
                },
                update: {
                    code: "PRICING",
                    label: "Prix",
                    dateStart: new Date("2024-01-01"),
                    dateEnd: new Date("4000-01-01"),
                    description: "Prix par default pour un utilisateur par mois",
                    value: "10",
                    createdBy: "system"
                },
                create: {
                    code: "PRICING",
                    label: "Prix",
                    dateStart: new Date("2024-01-01"),
                    dateEnd: new Date("4000-01-01"),
                    description: "Prix par default pour un utilisateur par mois",
                    value: "10",
                    createdBy: "system"
                }


            })

            await prisma.prisma_Seed.update({
                where: {
                    name: SEED_NAME
                },
                data: {

                    status: "completed"
                }
            })
        }
    } catch (e) {
        const SEED_NAME = "settingSeed"

        await prisma.prisma_Seed.update({
            where: {
                name: SEED_NAME
            },
            data: {

                status: "error"
            }
        })
        console.error(e)

    }

}