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

class FormV0003 extends Seed {
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
                        id: 'Standard_Formulaire_IDCC',
                        label: 'Création de formulaire IDCC',
                        slug: 'Standard_Formulaire_0005',
                        isCreate: true,
                        isEdit: false,
                        description: 'Création IDCC',
                        processusId: 'Standard_0007',
                        processusVersion: 1,
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'select',
                                    selectTableSource: 'Idcc',
                                    selectFieldSource: 'idcc',
                                    label: 'Code idcc',
                                    zodLabel: 'idcc',
                                    placeholder: '0001',
                                    required: true,
                                    order: 1,
                                    slug: 'Standard_Champ_0069',
                                }
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

export const formV0003 = new FormV0003("FORM_V0003", "Formulaire IDCC", 9, "OPS_V0001")

