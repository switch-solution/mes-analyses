
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

class FormV0002Seed extends Seed {
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
                            title: "Convention collective",
                            type: "DSN_CONVENTION_COLLECTIVE",
                            version: 1
                        }
                    },
                    update: {
                        buttonLabel: "Créer une convention collective",
                    },
                    create: {
                        title: "Convention collective",
                        type: "DSN_CONVENTION_COLLECTIVE",
                        buttonLabel: "Créer une convention collective",
                        description: 'Formulaire de création des conventions collectives',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                dsnType: 'dsnCodeIdcc',
                                label: 'Code IDCC',
                                isCode: true,
                                maxLength: 9,
                                minLength: 1,
                                placeholder: "9999",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {

                                type: 'text',
                                otherData: 'ccnLabel',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Convention collective de la SYNTEC",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },

                            ]
                        }
                    }

                })

                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Coefficient",
                            type: "DSN_COEFFICIENT",
                            version: 1
                        }
                    },
                    update: {
                        buttonLabel: "Créer un coefficient",
                    },
                    create: {
                        title: "Coefficient",
                        type: "DSN_COEFFICIENT",
                        description: 'Formulaire de création des coefficients',
                        createdBy: "system",
                        status: "actif",
                        buttonLabel: "Créer un coefficient",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                dsnType: 'dsnCoefficient',
                                label: 'Code coefficient',
                                isCode: true,
                                maxLength: 9,
                                minLength: 1,
                                placeholder: "9999",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                label: 'Libellé coefficient',
                                isLabel: true,
                                maxLength: 9,
                                minLength: 1,
                                placeholder: "M01",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Qualification",
                            type: "STD_QUALIFICATION",
                            version: 1
                        }
                    },
                    update: {
                        buttonLabel: "Créer une qualification",
                    },
                    create: {
                        title: "Qualification",
                        type: "STD_QUALIFICATION",
                        buttonLabel: "Créer une qualification",
                        description: 'Formulaire de création des qualifications',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                label: 'Code qualification',
                                isCode: true,
                                maxLength: 9,
                                minLength: 1,
                                placeholder: "M01",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                label: 'Libellé qualification',
                                isLabel: true,
                                maxLength: 9,
                                minLength: 1,
                                placeholder: "M01",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Niveau",
                            type: "STD_NIVEAU",
                            version: 1
                        }
                    },
                    update: {
                        buttonLabel: "Créer un niveau",
                    },
                    create: {
                        title: "Niveau",
                        type: "STD_NIVEAU",
                        buttonLabel: "Créer un niveau",
                        description: 'Formulaire de création des niveaux',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                label: 'Code niveau',
                                isCode: true,
                                maxLength: 9,
                                minLength: 1,
                                placeholder: "M01",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                label: 'Libellé niveau',
                                isLabel: true,
                                maxLength: 9,
                                minLength: 1,
                                placeholder: "M01",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Indice",
                            type: "STD_INDICE",
                            version: 1
                        }
                    },
                    update: {
                        buttonLabel: "Créer un indice",
                    },
                    create: {
                        title: "Indice",
                        type: "STD_INDICE",
                        buttonLabel: "Créer un indice",
                        description: 'Formulaire de création des indices',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                label: 'Code indice',
                                isCode: true,
                                maxLength: 9,
                                minLength: 1,
                                placeholder: "M01",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                label: 'Libellé indice',
                                isLabel: true,
                                maxLength: 9,
                                minLength: 1,
                                placeholder: "M01",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Echelon",
                            type: "STD_ECHELON",
                            version: 1
                        }
                    },
                    update: {
                        buttonLabel: "Créer un echelon",
                    },
                    create: {
                        title: "Echelon",
                        type: "STD_ECHELON",
                        description: 'Formulaire de création des échelons',
                        createdBy: "system",
                        status: "actif",
                        buttonLabel: "Créer un echelon",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                label: 'Code echelon',
                                isCode: true,
                                maxLength: 9,
                                minLength: 1,
                                placeholder: "M01",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                label: 'Libellé echelon',
                                isLabel: true,
                                maxLength: 9,
                                minLength: 1,
                                placeholder: "M01",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Service",
                            type: "STD_SERVICE",
                            version: 1
                        }
                    },
                    update: {
                        buttonLabel: "Créer un service",
                    },
                    create: {
                        title: "Service",
                        type: "STD_SERVICE",
                        buttonLabel: "Créer un service",
                        description: 'Formulaire de création des services',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                label: 'Code service',
                                isCode: true,
                                maxLength: 9,
                                minLength: 1,
                                placeholder: "M01",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                label: 'Libellé service',
                                isLabel: true,
                                maxLength: 9,
                                minLength: 1,
                                placeholder: "M01",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                label: 'Service supérieur',
                                isLabel: true,
                                maxLength: 9,
                                minLength: 1,
                                placeholder: "M01",
                                order: 3,
                                formSource: "STD_SERVICE",
                                inputSource: "Code service",
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                label: 'Société',
                                isLabel: true,
                                maxLength: 9,
                                minLength: 1,
                                placeholder: "M01",
                                order: 3,
                                formSource: "DSN_SOCIETE",
                                inputSource: "Raison sociale",
                                required: false,
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

export const formV0002Seed = new FormV0002Seed("FORM_V0002", "Création des formulaires", 9, "BOOK_V0002")

