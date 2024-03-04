
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

class FormV0001Seed extends Seed {
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


                console.log("Job label dsn")

                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Etablissement",
                            type: "DSN_ETABLISSEMENT",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Etablissement",
                        type: "DSN_ETABLISSEMENT",
                        status: "actif",
                        buttonLabel: "Créer un étalissement",
                        createdBy: "system",
                        description: 'Formulaire de création des établissements',
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                dsnType: 'DSN_ETABLISSEMENT',
                                label: 'SIRET',
                                isCode: true,
                                maxLength: 5,
                                minLength: 1,
                                placeholder: "12345",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: '',
                                label: 'Raison sociale',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Mon établissement",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                label: 'siren',
                                formSource: 'Etablissement',
                                inputSource: 'SIRET',
                                maxLength: 50,
                                minLength: 1,
                                isDescription: true,
                                placeholder: "Ma société",
                                order: 3,
                                required: true,
                                readonly: true,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Etablissement_Adresse_1',
                                label: 'Adresse',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Rue du test",
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Etablissement_Adresse_2',
                                label: 'Complément adresse',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Batiment A",
                                order: 5,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {

                                type: 'text',
                                dsnType: 'DSN_Etablissement_Adresse_3',
                                label: 'Adresse 3',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Service paie",
                                order: 6,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Etablissement_Code_Postal',
                                label: 'code postal',
                                maxLength: 5,
                                minLength: 1,
                                placeholder: "75000",
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                label: 'Ville',
                                dsnType: 'DSN_Etablissement_Ville',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Paris",
                                order: 8,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },]
                        }

                    },

                })
                console.log('Form établissement created')

                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Emploi",
                            type: "DSN_EMPLOI",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Emploi",
                        type: "DSN_EMPLOI",
                        description: 'Formulaire de création des emplois',
                        status: "actif",
                        version: 1,
                        buttonLabel: "Créer un emploi",
                        createdBy: "system",
                        Form_Input: {
                            create: [
                                {
                                    type: 'text',
                                    label: 'Code emploi',
                                    maxLength: 50,
                                    minLength: 1,
                                    isCode: true,
                                    placeholder: "001",
                                    order: 1,
                                    required: true,
                                    readonly: false,
                                    createdBy: "system"
                                },
                                {
                                    type: 'text',
                                    dsnType: 'DSN_Emploi_Libelle',
                                    label: 'Libellé emploi',
                                    maxLength: 50,
                                    minLength: 1,
                                    isDescription: true,
                                    placeholder: "Consultant",
                                    order: 2,
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

export const formV0001Seed = new FormV0001Seed("FORM_V0001", "Création des formulaires", 3, "IDCC_V0001")

