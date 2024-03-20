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

class AccumulationV0001 extends Seed {
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
                await prisma.accumulation.upsert({
                    where: {
                        id: "Brut",
                    },
                    update: {},
                    create: {
                        id: "Brut",
                        label: "Cumul brut",
                        description: "Cumul du brut avant abbatement",
                    },
                })
                await prisma.accumulation.upsert({
                    where: {
                        id: "Brut abbatu",
                    },
                    update: {},
                    create: {
                        id: "Brut abbatu",
                        label: "Cumul brut après abbatement",
                        description: "Cumul brut après abbatement",
                    },
                })
                await prisma.accumulation.upsert({
                    where: {
                        id: "Part salariale",
                    },
                    update: {},
                    create: {
                        id: "Part salariale",
                        label: "Cumul part salariale",
                        description: "Cumul des cotisations salariales",
                    },
                })
                await prisma.accumulation.upsert({
                    where: {
                        id: "Part patronale",
                    },
                    update: {},
                    create: {
                        id: "Part patronale",
                        label: "Cumul part patronale",
                        description: "Cumul des cotisations patronales",
                    },
                })
                await prisma.accumulation.upsert({
                    where: {
                        id: "Net imposable",
                    },
                    update: {},
                    create: {
                        id: "Net imposable",
                        label: "Cumul net imposable",
                        description: "Cumul du net imposable",
                    },
                })
                await prisma.accumulation.upsert({
                    where: {
                        id: "Net à payer",
                    },
                    update: {},
                    create: {
                        id: "Net à payer",
                        label: "Cumul net à payer",
                        description: "Cumul du net à payer",
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

export const accumulationV0001 = new AccumulationV0001("ACCUMULATION_V0001", "Cumul de paie", 40, "COUNTER_V0001")

