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

class FORM_V0024 extends Seed {
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
                        id: 'Standard_Formulaire_Edition_Service',
                        label: 'Editoon des services',
                        slug: 'Standard_Formulaire_0045',
                        isCreate: false,
                        isEdit: true,
                        description: 'Edition des services de l\'entreprise',
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
                                    disabled: true,
                                    readOnly: true,
                                    order: 1,
                                    slug: 'Standard_Champ_00272',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    label: 'Libellé',
                                    zodLabel: 'label',
                                    order: 2,
                                    slug: 'Standard_Champ_00273',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'number',
                                    label: 'Niveau',
                                    zodLabel: 'level',
                                    order: 3,
                                    slug: 'Standard_Champ_0274',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'text',
                                    label: 'description',
                                    zodLabel: 'description',
                                    order: 4,
                                    slug: 'Standard_Champ_0275',
                                },
                                {
                                    id: 'Standard_Champ_0005',
                                    type: 'select',
                                    label: 'Niveau supérieur',
                                    zodLabel: 'highterLevel',
                                    selectTableSource: 'Project_Service',
                                    selectFieldSource: 'id',
                                    order: 5,
                                    slug: 'Standard_Champ_0276',
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

export const formV0024 = new FORM_V0024("FormV0024", "Formulaire édition services", 44, "FormV0023")

