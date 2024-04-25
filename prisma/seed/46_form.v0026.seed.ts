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

class FORM_V0026 extends Seed {
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

                await prisma.form.update({
                    where: {
                        id_level: {
                            id: 'Standard_Formulaire_Edition_Etablissement_Banque',
                            level: 'Standard'
                        }
                    },
                    data: {
                        isCreate: false,
                        isEdit: true
                    }
                })

                await prisma.form_Input.update({
                    where: {
                        id_level_formId_label: {
                            id: 'Standard_Champ_0001',
                            level: 'Standard',
                            formId: 'Standard_Formulaire_Edition_Etablissement_Banque',
                            label: 'Etablissement'

                        }
                    },
                    data: {
                        disabled: true
                    }
                })
                await prisma.form_Input.update({
                    where: {
                        id_level_formId_label: {
                            id: 'Standard_Champ_0002',
                            level: 'Standard',
                            formId: 'Standard_Formulaire_Edition_Etablissement_Banque',
                            label: 'Banque'

                        }
                    },
                    data: {
                        disabled: true
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

export const formV0026 = new FORM_V0026("FormV0026", "Correction formulaire édition banque établissement", 46, "FormV0025")

