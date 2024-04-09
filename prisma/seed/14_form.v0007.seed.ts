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

class FORM_V0007 extends Seed {
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
                        id: 'Standard_0019',
                        label: 'Services',
                        theme: 'Services',
                        slug: 'Standard_Processus_services',
                        order: 19,
                        version: 1,

                    }
                })

                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_Service',
                        label: 'Création des services',
                        slug: 'Standard_Formulaire_0015',
                        isCreate: true,
                        isEdit: false,
                        description: 'Création des services de l\'entreprise',
                        processusId: 'Standard_0019',
                        processusVersion: 1,
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'text',
                                    label: 'Code service',
                                    zodLabel: 'id',
                                    required: true,
                                    order: 1,
                                    slug: 'Standard_Champ_0093',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    label: 'Libellé',
                                    zodLabel: 'label',
                                    order: 2,
                                    slug: 'Standard_Champ_0094',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'number',
                                    label: 'Niveau',
                                    zodLabel: 'level',
                                    order: 3,
                                    slug: 'Standard_Champ_0095',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'text',
                                    label: 'description',
                                    zodLabel: 'description',
                                    order: 4,
                                    slug: 'Standard_Champ_0096',
                                },
                                {
                                    id: 'Standard_Champ_0005',
                                    type: 'select',
                                    label: 'Niveau supérieur',
                                    zodLabel: 'highterLevel',
                                    selectTableSource: 'Project_Service',
                                    selectFieldSource: 'id',
                                    order: 5,
                                    slug: 'Standard_Champ_0097',
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

export const formV0007 = new FORM_V0007("FORM_V0007", "Formulaire des services", 14, "DSN_ABSENCE_V0001")

