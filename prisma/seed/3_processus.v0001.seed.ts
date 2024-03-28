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
                            table: 'Project_DSN'
                        },
                        {
                            id: 'Standard_0002',
                            label: 'Société',
                            slug: 'Standard_Processus_Society',
                            theme: 'Structure juridique',
                            table: 'Project_Society'
                        },
                        {
                            id: 'Standard_0003',
                            label: 'Etablissement',
                            slug: 'Standard_Processus_Establisment',
                            theme: 'Structure juridique',
                            table: 'Project_Establisment'
                        },
                        {
                            id: 'Standard_0004',
                            label: 'Organisme de protection sociale',
                            slug: 'Standard_Processus_ops',
                            theme: 'Structure juridique',
                            table: 'Project_OPS'
                        },
                        {
                            id: 'Standard_0005',
                            label: 'Taux AT',
                            slug: 'Standard_Processus_RateAt',
                            theme: 'Structure juridique',
                            table: 'Project_RateAt'
                        },
                        {
                            id: 'Standard_0006',
                            label: 'Emploi',
                            slug: 'Standard_Processus_job',
                            theme: 'Classification',
                            table: 'Project_Job'
                        },
                        {
                            id: 'Standard_0007',
                            label: 'Convention collective',
                            slug: 'Standard_Processus_ccn',
                            theme: 'Classification',
                            table: 'En attente'
                        },
                        {
                            id: 'Standard_0008',
                            label: 'Coefficient',
                            slug: 'Standard_Processus_coefficient',
                            theme: 'Classification',
                            table: 'En attente'
                        },
                        {
                            id: 'Standard_0009',
                            label: 'Niveau',
                            slug: 'Standard_Processus_niveau',
                            theme: 'Classification',
                            table: 'Project_Classification'
                        },
                        {
                            id: 'Standard_0010',
                            label: 'Echelon',
                            theme: 'Classification',
                            slug: 'Standard_Processus_echelon',
                            table: 'Project_Classification'
                        },
                        {
                            id: 'Standard_0011',
                            label: 'Indice',
                            theme: 'Classification',
                            slug: 'Standard_Processus_indice',
                            table: 'Project_Classification'
                        },
                        {
                            id: 'Standard_0012',
                            label: 'Qualification',
                            theme: 'Classification',
                            slug: 'Standard_Processus_qualification',
                            table: 'Project_Classification'
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

