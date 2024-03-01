
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

class FormV0003Seed extends Seed {
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
                            title: "Caisse de cotisation",
                            type: "DSN_ORGANISME_SOCIAUX",
                            version: 1
                        }
                    },
                    update: {
                        buttonLabel: "Créer un organisme social",
                    },
                    create: {
                        title: "Caisse de cotisation",
                        type: "DSN_ORGANISME_SOCIAUX",
                        buttonLabel: "Créer un organisme social",
                        description: 'Formulaire de création des caisses de cotisations',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                dsnType: 'dsnCodeOrganisme',
                                label: 'Code organisme sociaux',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "53510475600015",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'dsnLibelleOrganisme',
                                label: 'Organisme',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "5",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                formSource: 'DSN_ETABLISSEMENT',
                                inputSource: 'Raison sociale',
                                label: 'Raion sociale',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "5",
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'dsnAdresse',
                                label: 'Adresse 1',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Rue victor Hugo",
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'dsnAdresse2',
                                label: 'Adresse 2',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Complément d'adresse",
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'dsnAdresse3',
                                label: 'Adresse 3',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Complément d'adresse",
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'dsnCity',
                                label: 'Ville',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Nantes",
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'dsnCodePostal',
                                label: 'Code postal',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Nantes",
                                order: 8,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            }
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

export const formV0003Seed = new FormV0003Seed("FORM_V0003", "Création de formulaire caisse de cotisation", 13, "BOOK_V0005")

