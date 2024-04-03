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

class FORM_V0005 extends Seed {
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
                await prisma.processus.create({
                    data: {
                        id: 'Standard_0014',
                        label: 'Absences',
                        theme: 'Absence',
                        slug: 'Standard_Processus_Absences',
                        table: 'Project_Absence',
                        orderId: 'Processus_0004'
                    }
                })

                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_Absence',
                        label: 'Création de formulaire absence',
                        slug: 'Standard_Formulaire_0013',
                        description: 'Création des absences',
                        processusId: 'Standard_0014',
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'select',
                                    selectTableSource: 'Project_Society',
                                    selectFieldSource: 'siren',
                                    label: 'Société',
                                    zodLabel: 'siren',
                                    order: 1,
                                    slug: 'Standard_Champ_0080',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    label: 'Code absence',
                                    zodLabel: 'id',
                                    required: true,
                                    order: 2,
                                    slug: 'Standard_Champ_0081',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    label: 'Description',
                                    zodLabel: 'description',
                                    order: 3,
                                    slug: 'Standard_Champ_0082',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'switch',
                                    label: 'Absence sécurité sociale',
                                    zodLabel: 'isSocialSecurity',
                                    order: 4,
                                    slug: 'Standard_Champ_0083',
                                },
                                {
                                    id: 'Standard_Champ_0005',
                                    type: 'select',
                                    label: 'Méthode de calcul',
                                    zodLabel: 'method',
                                    selectTableSource: 'Software_Setting',
                                    selectFieldSource: 'ABS_Méthode',
                                    order: 5,
                                    slug: 'Standard_Champ_0084',
                                },
                                {
                                    id: 'Standard_Champ_0006',
                                    type: 'select',
                                    label: 'Décompte',
                                    zodLabel: 'settlement',
                                    selectTableSource: 'Software_Setting',
                                    selectFieldSource: 'ABS_Décompte',
                                    order: 6,
                                    slug: 'Standard_Champ_0085',
                                },
                                {
                                    id: 'Standard_Champ_0007',
                                    type: 'select',
                                    label: 'Code absence DSN',
                                    zodLabel: 'dsnId',
                                    selectTableSource: 'Dsn_Absence',
                                    selectFieldSource: 'id',
                                    order: 7,
                                    slug: 'Standard_Champ_0091',
                                },


                            ]
                        }

                    }

                })


                await this.seedUpdateStatus("completed")
            }

        } catch (err) {
            console.error(err)
            await this.seedUpdateStatus("error")
        }


    }




}

export const formV0005 = new FORM_V0005("FORM_V0005", "Formulaire des absences", 11, "FORM_V0004")

