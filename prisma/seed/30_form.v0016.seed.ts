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

class FormV0016 extends Seed {
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

                await prisma.form_Input.update({
                    where: {
                        slug: 'Standard_Champ_0003'
                    },
                    data: {
                        type: 'select',
                        selectTableSource: 'Software_Setting',
                        selectFieldSource: 'Forme_Juridique',
                    }
                })
                await prisma.form_Input.update({
                    where: {
                        slug: 'Standard_Champ_0132'
                    },
                    data: {
                        type: 'select',
                        selectTableSource: 'Software_Setting',
                        selectFieldSource: 'Forme_Juridique',
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

export const formV0016 = new FormV0016("FormV0016", "Mise à jour des champs forme juridique", 30, "SETTING_V0004")

