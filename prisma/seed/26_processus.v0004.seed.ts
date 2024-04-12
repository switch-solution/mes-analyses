
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

class ProcessusV0004 extends Seed {
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
                            id: 'Standard_0024',
                            label: 'Rubrique de rémunération',
                            slug: 'Standard_Processus_Salary',
                            theme: 'Paie',
                            version: 1,
                            order: 24
                        },
                        {
                            id: 'Standard_0025',
                            label: 'Rubrique de cotisation',
                            slug: 'Standard_Processus_Contribution',
                            theme: 'Paie',
                            version: 1,
                            order: 25
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

export const processusV0004 = new ProcessusV0004("PROCESUS_V0004", "Création processus rubriques", 26, "SETTING_V0002")
