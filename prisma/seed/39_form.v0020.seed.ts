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

class FormV0020 extends Seed {
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
                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_Edition_Idcc',
                        label: 'Edition Idcc',
                        slug: 'Standard_Formulaire_0042',
                        description: 'Edition idcc',
                        isCreate: false,
                        isEdit: true,
                        processusId: 'Standard_0007',
                        processusVersion: 1,
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'select',
                                    zodLabel: 'idcc',
                                    label: 'Code IDCC',
                                    selectTableSource: 'Project_Idcc',
                                    selectFieldSource: 'idcc',
                                    required: true,
                                    placeholder: '9999',
                                    readOnly: true,
                                    disabled: true,
                                    order: 1,
                                    slug: 'Standard_Champ_0253',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'switch',
                                    zodLabel: 'extended',
                                    label: 'Convention étendue',
                                    required: true,
                                    order: 2,
                                    slug: 'Standard_Champ_0254',
                                }
                            ]
                        }

                    }

                })
            }

        } catch (err) {
            console.error(err)
            await this.seedUpdateStatus("error")
        }

    }


}

export const formV0020 = new FormV0020("FormV0020", "Edition convention collective", 39, "FormV0019")

