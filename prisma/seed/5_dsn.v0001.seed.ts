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

class DsnV0001 extends Seed {
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
                await prisma.dsn_Structure.createMany({
                    data: [
                        {
                            id: 'S10.G00.00.001',
                            label: 'Nom du logiciel utilisé',
                            type: 'DSN'
                        },
                        {
                            id: 'S10.G00.00.006',
                            label: 'Numéro de version de la norme utilisée',
                            type: 'DSN'
                        },
                        {
                            id: 'S20.G00.05.003',
                            label: 'Numéro de fraction de déclaration',
                            type: 'DSN'
                        },
                        {
                            id: 'S20.G00.05.004',
                            label: `Numéro d'ordre de la déclaration`,
                            type: 'DSN'
                        },
                        {
                            id: 'S20.G00.05.005',
                            label: `Date du mois principal déclaré`,
                            type: 'DSN'
                        },
                        {
                            id: 'S21.G00.06.001',
                            label: `SIREN`,
                            type: 'Society'
                        },
                        {
                            id: 'S21.G00.06.002',
                            label: `NIC du siège`,
                            type: 'Society'
                        },
                        {
                            id: 'S21.G00.06.003',
                            label: `APEN`,
                            type: 'Society'
                        },
                        {
                            id: 'S21.G00.06.004',
                            label: `Numéro, extension, nature et libellé de la voie`,
                            type: 'Society'
                        },
                        {
                            id: 'S21.G00.06.005',
                            label: `Code postal`,
                            type: 'Society'
                        },
                        {
                            id: 'S21.G00.06.006',
                            label: `Localité`,
                            type: 'Society'
                        },
                        {
                            id: 'S21.G00.06.007',
                            label: `Complément de la localisation de la construction`,
                            type: 'Society'
                        },
                        {
                            id: 'S21.G00.06.008',
                            label: `Service de distribution, complément de localisation de la voie`,
                            type: 'Society'
                        },
                        {
                            id: 'S21.G00.06.010',
                            label: `Code pays`,
                            type: 'Society'
                        },
                        {
                            id: 'S21.G00.06.015',
                            label: `Code convention collective applicable`,
                            type: 'Society'
                        },
                        {
                            id: 'S21.G00.11.001',
                            label: `NIC`,
                            type: 'Establishment'
                        },
                        {
                            id: 'S21.G00.11.002',
                            label: `Code APET`,
                            type: 'Establishment'
                        },
                        {
                            id: 'S21.G00.11.003',
                            label: `Numéro, extension, nature et libellé de la voie`,
                            type: 'Establishment'
                        },
                        {
                            id: 'S21.G00.11.004',
                            label: `Code postal`,
                            type: 'Establishment'
                        },
                        {
                            id: 'S21.G00.11.005',
                            label: `Localité`,
                            type: 'Establishment'
                        },
                        {
                            id: 'S21.G00.11.006',
                            label: `Complément de la localisation de la construction`,
                            type: 'Establishment'
                        },
                        {
                            id: 'S21.G00.11.007',
                            label: `Service de distribution, complément de localisation de la voie`,
                            type: 'Establishment'
                        },
                        {
                            id: 'S21.G00.11.015',
                            label: `Code pays`,
                            type: 'Establishment'
                        },
                        {
                            id: 'S21.G00.11.017',
                            label: `Nature juridique de l'employeur`,
                            type: 'Establishment'
                        },
                        {
                            id: 'S21.G00.11.022',
                            label: `Code convention collective principale`,
                            type: 'Establishment'
                        },
                        {
                            id: 'S21.G00.11.023',
                            label: `Opérateur de compétences (OPCO)`,
                            type: 'Establishment'
                        },
                        {
                            id: 'S21.G00.15.001',
                            label: `Référence du contrat de Prévoyance`,
                            type: 'Mutual'
                        },
                        {
                            id: 'S21.G00.15.002',
                            label: `Code organisme de Prévoyance`,
                            type: 'Mutual'
                        },
                        {
                            id: 'S21.G00.15.003',
                            label: `Code délégataire de gestion`,
                            type: 'Mutual'
                        },
                        {
                            id: 'S21.G00.15.004',
                            label: `Personnel couvert`,
                            type: 'Mutual'
                        },
                        {
                            id: 'S21.G00.15.005',
                            label: `Identifiant technique Adhésion`,
                            type: 'Mutual'
                        },
                        {
                            id: 'S21.G00.20.001',
                            label: `Identifiant Organisme de Protection Sociale`,
                            type: 'Mutual'
                        },
                        {
                            id: 'S21.G00.40.006',
                            label: `Libellé emploi`,
                            type: 'Job'
                        },
                        {
                            id: 'S21.G00.40.007',
                            label: `Nature du contrat`,
                            type: 'Contract'

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

export const dsnV0001 = new DsnV0001("DSN_V0001", "Création des structures DSN", 5, "PROCESUS_V0001")

