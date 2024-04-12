
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

class ProcessusV0003 extends Seed {
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

                await prisma.processus.createMany({
                    data: [
                        {
                            id: 'Standard_0022',
                            label: 'Zones libres',
                            slug: 'Standard_Processus_Free_Zones',
                            theme: 'Zones libres',
                            version: 1,
                            order: 22
                        },
                        {
                            id: 'Standard_0023',
                            label: 'Association société zone libre',
                            slug: 'Standard_Processus_Society_Free_Zone',
                            theme: 'Zones libres',
                            version: 1,
                            order: 23
                        },
                    ]
                })
                await this.seedUpdateStatus("completed")
            }

        } catch (err) {
            console.error(err)
            await this.seedUpdateStatus("error")
        }


    }




}

export const processusV0003 = new ProcessusV0003("PROCESUS_V0003", "Création processus zones libres", 23, "FormV0013")
