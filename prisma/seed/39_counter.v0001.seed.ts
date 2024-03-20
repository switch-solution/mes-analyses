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

class CounterV0001 extends Seed {
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
                await prisma.counter.create({
                    data: {
                        id: "CP",
                        label: "Congés payés",
                        description: "Compteur des congés payés",
                        inDays: true,
                    },
                })
                await prisma.counter.create({
                    data: {
                        id: "RTT",
                        label: "RTT",
                        description: "Compteur des RTT",
                        inDays: true,
                    },
                })
                await prisma.counter.create({
                    data: {
                        id: "RC",
                        label: "Repos compensateur",
                        description: "Compteur des repos compensateurs",
                        inDays: true,
                    },
                })
                await prisma.counter.create({
                    data: {
                        id: "CET",
                        label: "Compte éparge temps",
                        description: "Compteur du compte épargne temps",
                        inDays: true,
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

export const counterV0001 = new CounterV0001("COUNTER_V0001", "Création des compteurs", 39, "ABSENCE_V0002")

