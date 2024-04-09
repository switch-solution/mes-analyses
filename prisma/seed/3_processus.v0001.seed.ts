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

class ProcessusV0001 extends Seed {
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
                            id: 'Standard_0001',
                            label: 'DSN',
                            slug: 'Standard_Processus_DSN',
                            theme: 'Import de fichier',
                            version: 1,
                            order: 1
                        },
                        {
                            id: 'Standard_0002',
                            label: 'Société',
                            slug: 'Standard_Processus_Society',
                            theme: 'Structure juridique',
                            version: 1,
                            order: 2
                        },
                        {
                            id: 'Standard_0003',
                            label: 'Etablissement',
                            slug: 'Standard_Processus_Establishment',
                            theme: 'Structure juridique',
                            version: 1,
                            order: 3
                        },
                        {
                            id: 'Standard_0004',
                            label: 'Organisme de protection sociale URSSAF',
                            slug: 'Standard_Processus_URSSAF',
                            theme: 'Structure juridique',
                            version: 1,
                            order: 4
                        },
                        {
                            id: 'Standard_0005',
                            label: 'Taux AT',
                            slug: 'Standard_Processus_RateAt',
                            theme: 'Structure juridique',
                            version: 1,
                            order: 5
                        },
                        {
                            id: 'Standard_0006',
                            label: 'Emploi',
                            slug: 'Standard_Processus_job',
                            theme: 'Classification',
                            version: 1,
                            order: 6

                        },
                        {
                            id: 'Standard_0007',
                            label: 'Convention collective',
                            slug: 'Standard_Processus_ccn',
                            theme: 'Classification',
                            version: 1,
                            order: 7
                        },
                        {
                            id: 'Standard_0008',
                            label: 'Coefficient',
                            slug: 'Standard_Processus_coefficient',
                            theme: 'Classification',
                            version: 1,
                            order: 8
                        },
                        {
                            id: 'Standard_0009',
                            label: 'Niveau',
                            slug: 'Standard_Processus_niveau',
                            theme: 'Classification',
                            version: 1,
                            order: 9
                        },
                        {
                            id: 'Standard_0010',
                            label: 'Echelon',
                            theme: 'Classification',
                            slug: 'Standard_Processus_echelon',
                            version: 1,
                            order: 10
                        },
                        {
                            id: 'Standard_0011',
                            label: 'Indice',
                            theme: 'Classification',
                            slug: 'Standard_Processus_indice',
                            version: 1,
                            order: 11
                        },
                        {
                            id: 'Standard_0012',
                            label: 'Qualification',
                            theme: 'Classification',
                            slug: 'Standard_Processus_qualification',
                            version: 1,
                            order: 12
                        },
                        {
                            id: 'Standard_0013',
                            label: 'Organisme de protection sociale AGIRC-ARRCO',
                            slug: 'Standard_Processus_AGIRC-ARRCO',
                            theme: 'Structure juridique',
                            version: 1,
                            order: 13
                        },
                        {
                            id: 'Standard_0014',
                            label: 'Organisme de protection sociale Prévoyance',
                            slug: 'Standard_Processus_Prevoyance',
                            theme: 'Structure juridique',
                            version: 1,
                            order: 14
                        },
                        {
                            id: 'Standard_0015',
                            label: 'Organisme de protection sociale mutuelle',
                            slug: 'Standard_Processus_Mutuelle',
                            theme: 'Structure juridique',
                            version: 1,
                            order: 15
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

export const processusV0001 = new ProcessusV0001("PROCESUS_V0001", "Création de processus structure juridique", 3, "IDCC_V0001")
