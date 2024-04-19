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

class FormV0017 extends Seed {
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
                        id: 'Standard_Formulaire_Table_Anciennete',
                        label: 'Création des tables d\'ancienneté',
                        slug: 'Standard_Formulaire_0040',
                        description: 'Création des tables d\'ancienneté',
                        isCreate: true,
                        isEdit: false,
                        processusId: 'Standard_0026',
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
                                    order: 1,
                                    slug: 'Standard_Champ_0246',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    label: 'Code interne',
                                    zodLabel: 'id',
                                    placeholder: '0001',
                                    required: true,
                                    order: 2,
                                    slug: 'Standard_Champ_0247',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    zodLabel: 'label',
                                    label: 'Libellé',
                                    required: true,
                                    placeholder: 'Table ancienneté des ouvriers',
                                    order: 2,
                                    slug: 'Standard_Champ_0248',
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

export const formV0017 = new FormV0017("FormV0017", "Création table ancienneté", 32, "PROCESUS_V0005")

