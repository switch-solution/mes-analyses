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
                            formUrl: '/Standard_DSN',
                            theme: 'Import de fichier',
                            descriptionUrl: '/Standard_DSN',
                            formId: 'Standard_Formulaire_Société',
                        },
                        {
                            id: 'Standard_0002',
                            label: 'Société',
                            slug: 'Standard_Processus_Society',
                            formUrl: '/Standard_society',
                            theme: 'Structure juridique',
                            descriptionUrl: '/Standard_society',
                            formId: 'Standard_Formulaire_Société',
                        },
                        {
                            id: 'Standard_0003',
                            label: 'Etablissement',
                            slug: 'Standard_Processus_Establisment',
                            theme: 'Structure juridique',
                            formId: 'Standard_Formulaire_établissement',
                            formUrl: '/Standard_establishment',
                            descriptionUrl: '/Standard_0002_establishment',
                        },
                        {
                            id: 'Standard_0004',
                            label: 'Organisme de protection sociale',
                            slug: 'Standard_Processus_ops',
                            theme: 'Structure juridique',
                            formId: 'Standard_0001',
                            formUrl: '/Standard_ops',
                            descriptionUrl: '/Standard_ops',
                        },
                        {
                            id: 'Standard_0005',
                            label: 'Taux AT',
                            formId: 'Standard_Formulaire_taux_at',
                            slug: 'Standard_Processus_RateAt',
                            theme: 'Structure juridique',
                            formUrl: '/form/Standard_rateAt',
                            descriptionUrl: '/description/Standard_0004_rateAt',
                        },
                        {
                            id: 'Standard_0006',
                            label: 'Emploi',
                            formId: 'Standard_Formulaire_emploi',
                            slug: 'Standard_Processus_job',
                            theme: 'Classification',
                            formUrl: '/form/Standard_0006_job',
                            descriptionUrl: '/description/Standard_0006_job',
                        },
                        {
                            id: 'Standard_0007',
                            label: 'Convention collective',
                            formId: 'Standard_Formulaire_convention_collective',
                            slug: 'Standard_Processus_ccn',
                            theme: 'Classification',
                            formUrl: '/form/Standard_0007_ccn',
                            descriptionUrl: '/description/Standard_0007_ccn',
                        },
                        {
                            id: 'Standard_0008',
                            label: 'Coefficient',
                            formId: 'Standard_Formulaire_coefficient',
                            slug: 'Standard_Processus_coefficient',
                            theme: 'Classification',
                            formUrl: '/form/Standard_0008_coefficient',
                            descriptionUrl: '/description/Standard_0008_coefficient',
                        },
                        {
                            id: 'Standard_0009',
                            label: 'Niveau',
                            formId: 'Standard_Formulaire_niveau',
                            slug: 'Standard_Processus_niveau',
                            theme: 'Classification',
                            formUrl: '/form/Standard_0009_niveau',
                            descriptionUrl: '/description/Standard_0009_niveau',
                        },
                        {
                            id: 'Standard_0010',
                            label: 'Niveau',
                            formId: 'Standard_Formulaire_indice',
                            slug: 'Standard_Processus_indice',
                            theme: 'Classification',
                            formUrl: '/form/Standard_0010_indice',
                            descriptionUrl: '/description/Standard_0010_indice',
                        },
                        {
                            id: 'Standard_0011',
                            label: 'Echelon',
                            formId: 'Standard_Formulaire_echelon',
                            slug: 'Standard_Processus_echelon',
                            theme: 'Classification',
                            formUrl: '/form/Standard_0011_echelon',
                            descriptionUrl: '/description/Standard_0011_echelon',
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

export const processusV0001 = new ProcessusV0001("PROCESUS_V0001", "Création de processus structure juridique", 4, "FORM_V0001")

