
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

class ProcessusV0002 extends Seed {
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
                            id: 'Standard_0020',
                            label: 'Banque',
                            slug: 'Standard_Processus_Bank',
                            theme: 'Banque',
                            version: 1,
                            order: 20
                        },
                        {
                            id: 'Standard_0021',
                            label: 'Etablissement banque',
                            slug: 'Standard_Processus_Establisment_Bank',
                            theme: 'Banque',
                            version: 1,
                            order: 21
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

export const processusV0002 = new ProcessusV0002("PROCESUS_V0002", "Création processus banque", 20, "LEGAL_V0001")
