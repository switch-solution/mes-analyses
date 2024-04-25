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

class FORM_V0028 extends Seed {
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

                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_Creation_Cotisation',
                        label: 'Création des cotisations',
                        isCreate: true,
                        isEdit: false,
                        slug: 'Standard_Formulaire_0050',
                        description: 'Création des cotisations',
                        processusId: 'Standard_0025',
                        processusVersion: 1,
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'text',
                                    label: 'Code',
                                    zodLabel: 'id',
                                    required: true,
                                    order: 1,
                                    slug: 'Standard_Champ_0283',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    label: 'Libellé',
                                    zodLabel: 'label',
                                    required: true,
                                    order: 2,
                                    slug: 'Standard_Champ_0284',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    label: 'Description',
                                    zodLabel: 'description',
                                    order: 3,
                                    required: true,
                                    slug: 'Standard_Champ_0285',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'text',
                                    label: 'Type de base',
                                    zodLabel: 'baseType',
                                    order: 4,
                                    slug: 'Standard_Champ_0286',
                                },
                                {
                                    id: 'Standard_Champ_0005',
                                    type: 'text',
                                    label: 'Base',
                                    zodLabel: 'base',
                                    order: 5,
                                    slug: 'Standard_Champ_0287',
                                },
                                {
                                    id: 'Standard_Champ_0006',
                                    type: 'text',
                                    label: 'Type de taux part salariale',
                                    zodLabel: 'rateTypeEmployee',
                                    order: 6,
                                    slug: 'Standard_Champ_0288',
                                },
                                {
                                    id: 'Standard_Champ_0007',
                                    type: 'text',
                                    label: 'Type de taux part employeur',
                                    zodLabel: 'rateTypeEmployer',
                                    order: 7,
                                    slug: 'Standard_Champ_0289',
                                },
                                {
                                    id: 'Standard_Champ_0008',
                                    type: 'text',
                                    label: 'Taux salarié',
                                    zodLabel: 'rateEmployee',
                                    order: 8,
                                    slug: 'Standard_Champ_0290',
                                },
                                {
                                    id: 'Standard_Champ_0009',
                                    type: 'text',
                                    label: 'Taux employeur',
                                    zodLabel: 'rateEmployer',
                                    order: 9,
                                    slug: 'Standard_Champ_0291',
                                },
                            ]
                        }

                    }

                })

                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_Edition_Cotisation',
                        label: 'Edition des cotisations',
                        isCreate: false,
                        isEdit: true,
                        slug: 'Standard_Formulaire_0051',
                        description: 'Edition des cotisations',
                        processusId: 'Standard_0025',
                        processusVersion: 1,
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'text',
                                    label: 'Code',
                                    zodLabel: 'id',
                                    required: true,
                                    disabled: true,
                                    readOnly: true,
                                    order: 1,
                                    slug: 'Standard_Champ_0292',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    label: 'Libellé',
                                    zodLabel: 'label',
                                    order: 2,
                                    slug: 'Standard_Champ_0293',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    label: 'Description',
                                    zodLabel: 'description',
                                    order: 3,
                                    slug: 'Standard_Champ_0294',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'text',
                                    label: 'Type de base',
                                    zodLabel: 'baseType',
                                    order: 4,
                                    slug: 'Standard_Champ_0295',
                                },
                                {
                                    id: 'Standard_Champ_0005',
                                    type: 'text',
                                    label: 'Base',
                                    zodLabel: 'base',
                                    order: 5,
                                    slug: 'Standard_Champ_0296',
                                },
                                {
                                    id: 'Standard_Champ_0006',
                                    type: 'text',
                                    label: 'Type de taux part salariale',
                                    zodLabel: 'rateTypeEmployee',
                                    order: 6,
                                    slug: 'Standard_Champ_0297',
                                },
                                {
                                    id: 'Standard_Champ_0007',
                                    type: 'text',
                                    label: 'Type de taux part employeur',
                                    zodLabel: 'rateTypeEmployer',
                                    order: 7,
                                    slug: 'Standard_Champ_0298',
                                },
                                {
                                    id: 'Standard_Champ_0008',
                                    type: 'text',
                                    label: 'Taux salarié',
                                    zodLabel: 'rateEmployee',
                                    order: 8,
                                    slug: 'Standard_Champ_0299',
                                },
                                {
                                    id: 'Standard_Champ_0009',
                                    type: 'text',
                                    label: 'Taux employeur',
                                    zodLabel: 'rateEmployer',
                                    order: 9,
                                    slug: 'Standard_Champ_0300',
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

export const formV0028 = new FORM_V0028("FormV0028", "Formulaire des absences", 48, "FormV0027")

