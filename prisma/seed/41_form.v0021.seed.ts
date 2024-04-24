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

class FormV0021 extends Seed {
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
                await prisma.form_Input.createMany({
                    data: [
                        {
                            formId: 'Standard_Formulaire_CP',
                            id: 'Standard_Champ_0008',
                            type: 'text',
                            zodLabel: 'id',
                            label: 'Code interne',
                            required: true,
                            placeholder: '9999',
                            order: 1,
                            slug: 'Standard_Champ_0255',
                        },
                        {
                            formId: 'Standard_Formulaire_CP',
                            id: 'Standard_Champ_0009',
                            type: 'text',
                            zodLabel: 'label',
                            label: 'Libellé',
                            required: true,
                            placeholder: '9999',
                            order: 2,
                            slug: 'Standard_Champ_0256',
                        },


                    ]
                })
                //Update order
                await prisma.form_Input.update({
                    where: {
                        slug: 'Standard_Champ_0072'
                    },
                    data: {
                        order: 3
                    }
                })
                await prisma.form_Input.update({
                    where: {
                        slug: 'Standard_Champ_0073'
                    },
                    data: {
                        order: 4
                    }
                })
                await prisma.form_Input.update({
                    where: {
                        slug: 'Standard_Champ_0074'
                    },
                    data: {
                        order: 4
                    }
                })
                await prisma.form_Input.update({
                    where: {
                        slug: 'Standard_Champ_0075'
                    },
                    data: {
                        order: 5
                    }
                })
                await prisma.form_Input.update({
                    where: {
                        slug: 'Standard_Champ_0076'
                    },
                    data: {
                        order: 6
                    }
                })
                await prisma.form_Input.update({
                    where: {
                        slug: 'Standard_Champ_0077'
                    },
                    data: {
                        order: 7
                    }
                })
            }

        } catch (err) {
            console.error(err)
            await this.seedUpdateStatus("error")
        }

    }


}

export const formV0021 = new FormV0021("FormV0021", "Formulaire CP ajout Id et label", 41, "OPS_V0002")

