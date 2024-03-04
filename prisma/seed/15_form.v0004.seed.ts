
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

class FormV0004Seed extends Seed {
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
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Taux AT",
                            type: "DSN_TAUX_AT",
                            version: 1
                        }
                    },
                    update: {
                        buttonLabel: "Créer un organisme social",
                    },
                    create: {
                        title: "Taux AT",
                        type: "DSN_TAUX_AT",
                        buttonLabel: "Créer un taux AT",
                        description: 'Formulaire de création des taux AT',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                dsnType: 'DSN_TAUX_AT',
                                label: 'Code taux AT',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "GRPB",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: 'Taux_AT_Libelle',
                                label: 'Libellé taux AT',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Taux AT ",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'number',
                                dsnType: 'DSN_Taux_AT',
                                label: 'Taux AT',
                                minValue: 0,
                                maxValue: 100,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "5",
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'switch',
                                label: 'Taux AT bureau',
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },

                            ]
                        }
                    }

                })

                await this.seedUpdateStatus("completed")

            }
        } catch (err) {
            console.log(err)
            await this.seedUpdateStatus("error")
            await this.updateError(JSON.stringify(err))
        }

    }
}

export const formV0004Seed = new FormV0004Seed("FORM_V0004", "Création de formulaire taux AT", 15, "BOOK_V0006")

