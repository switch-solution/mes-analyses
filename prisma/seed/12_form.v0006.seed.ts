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

class FORM_V0006 extends Seed {
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
                        id: 'Standard_0018',
                        label: 'Rubriques de paie',
                        theme: 'Paie',
                        slug: 'Standard_Processus_Rubriques',
                        order: 18,
                        version: 1
                    }
                })

                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_Rubrique',
                        label: 'Création de formulaire rubrique',
                        slug: 'Standard_Formulaire_0014',
                        description: 'Création des rubriques',
                        isCreate: true,
                        isEdit: false,
                        processusId: 'Standard_0018',
                        processusVersion: 1,
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
                                    slug: 'Standard_Champ_0086',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    label: 'Code rubrique',
                                    zodLabel: 'id',
                                    required: true,
                                    order: 2,
                                    slug: 'Standard_Champ_0087',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    label: 'Description',
                                    zodLabel: 'description',
                                    order: 3,
                                    slug: 'Standard_Champ_0088',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'text',
                                    label: 'type',
                                    zodLabel: 'description',
                                    order: 4,
                                    slug: 'Standard_Champ_0089',
                                },
                                {
                                    id: 'Standard_Champ_0005',
                                    type: 'text',
                                    label: 'type',
                                    zodLabel: 'population',
                                    order: 5,
                                    slug: 'Standard_Champ_0090',
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

export const formV0006 = new FORM_V0006("FORM_V0006", "Formulaire des rubriques", 12, "FORM_V0005")

