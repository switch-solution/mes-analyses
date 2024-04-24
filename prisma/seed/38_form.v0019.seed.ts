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

class FormV0019 extends Seed {
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
                await prisma.form_Input.create({
                    data: {
                        formId: 'Standard_Formulaire_IDCC',
                        id: 'Standard_Champ_0002',
                        type: 'switch',
                        zodLabel: 'extended',
                        label: 'Convention étendue',
                        required: true,
                        order: 2,
                        slug: 'Standard_Champ_0252',
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

export const formV0019 = new FormV0019("FormV0019", "Ajout champ convention étendu", 38, "LegalV0005")

