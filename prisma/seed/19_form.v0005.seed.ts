
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

class FormV0005Seed extends Seed {
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
                            title: "Absence sécurité sociale",
                            type: "STD_ABSENCE_SECURITE_SOCIALE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Absence sécurité sociale",
                        type: "STD_ABSENCE_SECURITE_SOCIALE",
                        buttonLabel: "Créer une nouvelle absence de sécurité sociale",
                        description: 'Formulaire de création des absences de sécurité sociale',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: 'STD_Absence_Sécurité_Sociale_Code',
                                label: 'Code absence sécurité sociale',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "MAL",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: 'STD_Absence_Sécurité_Sociale_Libelle',
                                label: 'Libellé absence sécurité sociale',
                                isLabel: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Maladie",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                //Catégorie de salarié
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Catégorie de salarié",
                            type: "STD_CATEGORIE_SALARIE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Catégorie de salarié",
                        type: "STD_CATEGORIE_SALARIE",
                        buttonLabel: "Créer une nouvelle catégorie de salarié",
                        description: 'Formulaire de création des catégories de salarié',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                label: 'Code catégorie de salarié',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "OUV",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                label: 'Libellé catégorie de salarié',
                                isLabel: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Ouvrier",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                //abs hors SS
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Absence hors sécurité sociale",
                            type: "STD_ABSENCE_HORS_SECURITE_SOCIALE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Absence hors sécurité sociale",
                        type: "STD_ABSENCE_HORS_SECURITE_SOCIALE",
                        buttonLabel: "Créer une nouvelle absence",
                        description: 'Formulaire de création des absences',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: 'STD_Absence_Hors_Sécurité_Sociale_Code',
                                label: 'Code absence sécurité sociale',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "CPA",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: 'STD_Absence_Hors_Sécurité_Sociale_Libelle',
                                label: 'Libellé absence',
                                isLabel: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Congé parental",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                //Contrat DSN
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Contrat DSN",
                            type: "DSN_CONTRAT",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Contrat DSN",
                        type: "DSN_CONTRAT",
                        buttonLabel: "Créer un nouveau contrat DSN",
                        description: 'Formulaire de création des contrats prévoyance,mutuelle et retraite supplémentaire DSN',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                dsnType: 'DSN_Contrat_ID',
                                label: 'Code contrat DSN',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "156890NJNKL",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Contrat_Organime',
                                label: 'Libellé de organisme',
                                isLabel: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Humanis",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Contrat_Deleguataire',
                                label: 'Libellé du délégataire',
                                isLabel: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "DVER01",
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Population_Contrat',
                                label: 'Libellé population',
                                isLabel: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "01",
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Contrat_ID',
                                label: 'Numéro ordre dans la DSN',
                                isLabel: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1",
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                //Maintien des salaires
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Maintien des salaires",
                            type: "STD_MAINTIEN_SALAIRE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Maintien des salaires",
                        type: "STD_MAINTIEN_SALAIRE",
                        buttonLabel: "Créer un nouveau maintien des salaires",
                        description: 'Formulaire de création des maintiens des salaires',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'select',
                                formSource: 'Absence sécurité sociale',
                                inputSource: 'Code absence sécurité sociale',
                                label: 'Code absence sécurité sociale',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Maladie",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                formSource: 'Absence sécurité sociale',
                                inputSource: 'Libelle absence sécurité sociale',
                                label: 'Libellé absebce sécurité sociale',
                                isLabel: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Maintien de salaire maladie",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé de la convention collective',
                                isDescription: true,
                                order: 3,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Catégorie de salarié',
                                inputSource: 'Libellé catégorie de salarié',
                                label: 'Catégorie de salarié',
                                isDescription: true,
                                order: 4,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'number',
                                label: 'Nombre de jours de carence',
                                maxValue: 99999,
                                minValue: 0,
                                placeholder: "30",
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'number',
                                label: 'Nombre de jours de maintien',
                                maxValue: 99999,
                                minValue: 0,
                                placeholder: "30",
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                label: 'Pourcentage de maintien',
                                maxValue: 99999,
                                minValue: 0,
                                placeholder: "30",
                                order: 7,
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

export const formV0005Seed = new FormV0005Seed("FORM_V0005", "Création des formulaires absences, des catégories salariés, contrat DSN,maintien des salaires,absences", 19, "ABSENCE_V0001")

