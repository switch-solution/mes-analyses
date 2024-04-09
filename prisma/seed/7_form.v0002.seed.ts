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

class FormV0002 extends Seed {
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
                        id: 'Standard_Formulaire_URSSAF',
                        label: 'Création de l\'organisme URSSAF',
                        slug: 'Standard_Formulaire_0011',
                        isCreate: true,
                        isEdit: false,
                        description: 'Création URSSAF',
                        processusId: 'Standard_0004',
                        processusVersion: 1,
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'text',
                                    label: 'Code interne',
                                    zodLabel: 'id',
                                    placeholder: '0001',
                                    required: true,
                                    order: 1,
                                    slug: 'Standard_Champ_0058',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'select',
                                    selectTableSource: 'DSN_OPS',
                                    selectFieldSource: 'URSSAF',
                                    label: 'Importer votre URSSAF',
                                    zodLabel: 'ops',
                                    required: true,
                                    order: 2,
                                    slug: 'Standard_Champ_0059',
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

export const formV0002 = new FormV0002("FORM_V0002", "Création de processus structure juridique", 7, "RATE_AT_V0001")

