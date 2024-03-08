
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

class FormV0006Seed extends Seed {
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
                //Form remuneration
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Salaire de base",
                            type: "STD_SALAIRE_DE_BASE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Salaire de base",
                        type: "STD_SALAIRE_DE_BASE",
                        buttonLabel: "Créer un nouveau salaire de base",
                        description: 'Formulaire de création des salaires de base',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Rémunération_Salaire_De_Base",
                                label: 'Code rubriques',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "00001",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Rémunération_Salaire_De_Base",
                                label: 'Libellé rubriques',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Salaire de base",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Rémunération_Salaire_De_Base",
                                label: 'Base de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Taux_Rubrique_Rémunération_Salaire_De_Base",
                                label: 'Taux de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Coeff_Rubrique_Rémunération_Salaire_De_Base",
                                label: 'Coefficient de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Montant_Rubrique_Rémunération_Salaire_De_Base",
                                label: 'Montant de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Condition_Rubrique_Rémunération_Salaire_De_Base",
                                label: 'Condition de validité',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'textarea',
                                label: 'Commentaire',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'textarea',
                                label: 'Exemple',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_DSN_Rubrique_Rémunération_Salaire_De_Base",
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Raison sociale',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 11,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },

                            ]
                        }
                    }

                })
                //Form remuneration éléments variables
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Rémunération éléments variables",
                            type: "STD_REMUNERATION_ELEMENTS_VARIABLES",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Rémunération éléments variables",
                        type: "STD_REMUNERATION_ELEMENTS_VARIABLES",
                        buttonLabel: "Créer une nouvelle rémunération d'éléments variables",
                        description: 'Formulaire de création des rémunérations des éléments variables',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Rémunération_Éléments_Variables",
                                label: 'Code rubriques',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Rémunération_Éléments_Variables",
                                label: 'Libellé rubriques',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Acompte",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Rémunération_Éléments_Variables",
                                label: 'Base de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Taux_Rubrique_Rémunération_Éléments_Variables",
                                label: 'Taux de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Coeff_Rubrique_Rémunération_Éléments_Variables",
                                label: 'Coefficient de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Montant_Rubrique_Rémunération_Éléments_Variables",
                                label: 'Montant de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Condition_Rubrique_Rémunération_Éléments_Variables",
                                label: 'Condition de validité',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'textarea',
                                label: 'Commentaire',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'textarea',
                                label: 'Exemple',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 11,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },

                            ]
                        }
                    }

                })
                //Form remuneration éléments fixes
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Rémunération éléments fixes",
                            type: "STD_REMUNERATION_ELEMENTS_FIXES",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Rémunération éléments fixes",
                        type: "STD_REMUNERATION_ELEMENTS_FIXES",
                        buttonLabel: "Créer une nouvelle rémunération d'éléments variables",
                        description: 'Formulaire de création des rémunérations des éléments variables',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Rémunération_Éléments_Fixes",
                                label: 'Code rubriques',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Rémunération_Éléments_Fixes",
                                label: 'Libellé rubriques',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Acompte",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Rémunération_Éléments_Fixes",
                                label: 'Base de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Taux_Rubrique_Rémunération_Éléments_Fixes",
                                label: 'Taux de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Coeff_Rubrique_Rémunération_Éléments_Fixes",
                                label: 'Coefficient de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Montant_Rubrique_Rémunération_Éléments_Fixes",
                                label: 'Montant de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Condition_Rubrique_Rémunération_Éléments_Fixes",
                                label: 'Condition de validité',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'textarea',
                                label: 'Commentaire',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'textarea',
                                label: 'Exemple',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 11,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },

                            ]
                        }
                    }

                })
                //Form primes
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Rémunération primes",
                            type: "STD_REMUNERATION_PRIMES",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Rémunération primes",
                        type: "STD_REMUNERATION_PRIMES",
                        buttonLabel: "Créer une nouvelle primes",
                        description: 'Formulaire de création des primes',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Rémunération_Primes",
                                label: 'Code rubriques',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Rémunération_Primes",
                                label: 'Libellé rubriques',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Acompte",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Rémunération_Primes",
                                label: 'Base de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Taux_Rubrique_Rémunération_Éléments_Primes",
                                label: 'Taux de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Coeff_Rubrique_Rémunération_Éléments_Primes",
                                label: 'Coefficient de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Montant_Rubrique_Rémunération_Éléments_Primes",
                                label: 'Montant de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Condition_Rubrique_Rémunération_Éléments_Primes",
                                label: 'Condition de validité',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'textarea',
                                label: 'Commentaire',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'textarea',
                                label: 'Exemple',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 11,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },

                            ]
                        }
                    }

                })
                //Form primes d'anicienneté
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Rémunération primes ancienneté",
                            type: "STD_REMUNERATION_PRIMES_ANCIENNETE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Rémunération primes ancienneté",
                        type: "STD_REMUNERATION_PRIMES_ANCIENNETE",
                        buttonLabel: "Créer une nouvelle primes d'ancienneté",
                        description: 'Formulaire de création des primes d ancienneté',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Rémunération_Prime_Ancienneté",
                                label: 'Code rubriques',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Rémunération_Prime_Ancienneté",
                                label: 'Libellé rubriques',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Acompte",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Rémunération_Prime_Ancienneté",
                                label: 'Base de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Taux_Rubrique_Rémunération_Prime_Ancienneté",
                                label: 'Taux de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Coeff_Rubrique_Rémunération_Prime_Ancienneté",
                                label: 'Coefficient de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Montant_Rubrique_Rémunération_Prime_Ancienneté",
                                label: 'Montant de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Condition_Rubrique_Rémunération_Prime_Ancienneté",
                                label: 'Condition de validité',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'textarea',
                                label: 'Commentaire',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'textarea',
                                label: 'Exemple',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 11,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },

                            ]
                        }
                    }

                })
                //Form primes
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Rémunération primes liées à l'activité",
                            type: "STD_REMUNERATION_PRIMES_LIEES_ACTIVITE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Rémunération primes liées à l'activité",
                        type: "STD_REMUNERATION_PRIMES_LIEES_ACTIVITE",
                        buttonLabel: "Créer une nouvelle primes liées à l'activité",
                        description: 'Formulaire de création des primes liées à l\'activité',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Rémunération_Primes_Liées_Activité",
                                label: 'Code rubriques',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Rémunération_Primes_Liées_Activité",
                                label: 'Libellé rubriques',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Acompte",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Rémunération_Primes_Liées_Activité",
                                label: 'Base de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Taux_Rubrique_Rémunération_Primes_Liées_Activité",
                                label: 'Taux de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Coeff_Rubrique_Rémunération_Primes_Liées_Activité",
                                label: 'Coefficient de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Montant_Rubrique_Rémunération_Primes_Liées_Activité",
                                label: 'Montant de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Condition_Rubrique_Rémunération_Primes_Liées_Activité",
                                label: 'Condition de validité',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'textarea',
                                label: 'Commentaire',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'textarea',
                                label: 'Exemple',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 11,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },

                            ]
                        }
                    }

                })
                //Form primes non liées à l'activité
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Rémunération primes non liées à l'activité",
                            type: "STD_REMUNERATION_PRIMES_NON_LIEES_ACTIVITE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Rémunération primes non liées à l'activité",
                        type: "STD_REMUNERATION_PRIMES_NON_LIEES_ACTIVITE",
                        buttonLabel: "Créer une nouvelle primes non liées à l'activité",
                        description: 'Formulaire de création des primes non liées à l\'activité',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Rémunération_Non_Primes_Liées_Activité",
                                label: 'Code rubriques',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Rémunération_Non_Primes_Liées_Activité",
                                label: 'Libellé rubriques',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Acompte",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Rémunération_Non_Primes_Liées_Activité",
                                label: 'Base de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Taux_Rubrique_Rémunération_Non_Primes_Liées_Activité",
                                label: 'Taux de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Coeff_Rubrique_Rémunération_Non_Primes_Liées_Activité",
                                label: 'Coefficient de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Montant_Rubrique_Rémunération_Non_Primes_Liées_Activité",
                                label: 'Montant de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Condition_Rubrique_Rémunération_Non_Primes_Liées_Activité",
                                label: 'Condition de validité',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'textarea',
                                label: 'Commentaire',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'textarea',
                                label: 'Exemple',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 11,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },

                            ]
                        }
                    }

                })
                //Form rémunération bas de bulletin
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Rémunération bas de bulletin",
                            type: "STD_REMUNERATION_BAS_BULLETIN",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Rémunération bas de bulletin",
                        type: "STD_REMUNERATION_BAS_BULLETIN",
                        buttonLabel: "Créer une nouvelle rubriques de bas de bulletin",
                        description: 'Formulaire de création des rubriques de bas de bulletin',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Rémunération_Bas_Bulletin",
                                label: 'Code rubriques',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Rémunération_Bas_Bulletin",
                                label: 'Libellé rubriques',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Acompte",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Rémunération_Bas_Bulletin",
                                label: 'Base de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Taux_Rubrique_Rémunération_Bas_Bulletin",
                                label: 'Taux de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Coeff_Rubrique_Rémunération_Bas_Bulletin",
                                label: 'Coefficient de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Montant_Rubrique_Rémunération_Bas_Bulletin",
                                label: 'Montant de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Condition_Rubrique_Rémunération_Bas_Bulletin",
                                label: 'Condition de validité',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'textarea',
                                label: 'Commentaire',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'textarea',
                                label: 'Exemple',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 11,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },

                            ]
                        }
                    }

                })
                //Form rémunération bas de bulletin gain
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Rémunération bas de bulletin gain",
                            type: "STD_REMUNERATION_BAS_BULLETIN_GAIN",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Rémunération bas de bulletin gain",
                        type: "STD_REMUNERATION_BAS_BULLETIN_GAIN",
                        buttonLabel: "Créer une nouvelle rubriques de bas de bulletin de type gain",
                        description: 'Formulaire de création des rubriques de bas de bulletin de gain',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Rémunération_Bas_Bulletin_Gain",
                                label: 'Code rubriques',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Rémunération_Bas_Bulletin_Gain",
                                label: 'Libellé rubriques',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Acompte",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Rémunération_Bas_Bulletin_Gain",
                                label: 'Base de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Taux_Rubrique_Rémunération_Bas_Bulletin_Gain",
                                label: 'Taux de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Coeff_Rubrique_Rémunération_Bas_Bulletin_Gain",
                                label: 'Coefficient de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Montant_Rubrique_Rémunération_Bas_Bulletin_Gain",
                                label: 'Montant de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Condition_Rubrique_Rémunération_Bas_Bulletin_Gain",
                                label: 'Condition de validité',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'textarea',
                                label: 'Commentaire',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'textarea',
                                label: 'Exemple',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 11,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },

                            ]
                        }
                    }

                })
                //Form rémunération bas de bulletin retenue
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Rémunération bas de bulletin retenue",
                            type: "STD_REMUNERATION_BAS_BULLETIN_RETENUE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Rémunération bas de bulletin retenue",
                        type: "STD_REMUNERATION_BAS_BULLETIN_RETENUE",
                        buttonLabel: "Créer une nouvelle rubriques de bas de bulletin de type retenue",
                        description: 'Formulaire de création des rubriques de bas de bulletin de retenue',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Rémunération_Bas_Bulletin_Retenue",
                                label: 'Code rubriques',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Rémunération_Bas_Bulletin_Retenue",
                                label: 'Libellé rubriques',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Acompte",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Rémunération_Bas_Bulletin_Retenue",
                                label: 'Base de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Taux_Rubrique_Rémunération_Bas_Bulletin_Retenue",
                                label: 'Taux de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Coeff_Rubrique_Rémunération_Bas_Bulletin_Retenue",
                                label: 'Coefficient de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Montant_Rubrique_Rémunération_Bas_Bulletin_Retenue",
                                label: 'Montant de rémunération',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Condition_Rubrique_Rémunération_Bas_Bulletin_Retenue",
                                label: 'Condition de validité',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'textarea',
                                label: 'Commentaire',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'textarea',
                                label: 'Exemple',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 11,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },

                            ]
                        }
                    }

                })
                //Form cotisation URSSAF
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Cotisations Urssaf",
                            type: "STD_COTISATION_URSSAF",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Cotisations Urssaf",
                        type: "STD_COTISATION_URSSAF",
                        buttonLabel: "Créer une nouvelle cotisation URSSAF",
                        description: 'Formulaire de création des cotisations URSSAF',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Cotisation_URSSAF",
                                label: 'Code rubrique',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Cotisation_URSSAF",
                                label: 'Libellé',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Maladie",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Cotisation_URSSAF",
                                label: 'Base de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Salarié_Rubrique_Cotisation_URSSAF",
                                label: 'Part sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Patronal_Rubrique_Cotisation_URSSAF",
                                label: 'Part patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Salarié_Rubrique_Cotisation_URSSAF",
                                label: 'Forfait sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Patronal_Rubrique_Cotisation_URSSAF",
                                label: 'Forfait patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_DSN_Rubrique_Cotisation_URSSAF",
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Raison sociale',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                //Form cotisation Retraite
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Cotisation retraite",
                            type: "STD_COTISATION_RETRAITE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Cotisation retraite",
                        type: "STD_COTISATION_RETRAITE",
                        buttonLabel: "Créer une nouvelle cotisation retraite complémentaire",
                        description: 'Formulaire de création des cotisations complémentaires retraite',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Cotisation_Retraite",
                                label: 'Code rubrique',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Cotisation_Retraite",
                                label: 'Libellé',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Maladie",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Cotisation_Retraite",
                                label: 'Base de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Salarié_Rubrique_Cotisation_Retraite",
                                label: 'Part sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Patronal_Rubrique_Cotisation_Retraite",
                                label: 'Part patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Salarié_Rubrique_Cotisation_Retraite",
                                label: 'Forfait sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Patronal_Rubrique_Cotisation_Retraite",
                                label: 'Forfait patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_DSN_Rubrique_Cotisation_Retraite",
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Raison sociale',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                //Form cotisation MSA
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Cotisation MSA",
                            type: "STD_COTISATION_MSA",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Cotisation MSA",
                        type: "STD_COTISATION_MSA",
                        buttonLabel: "Créer une nouvelle cotisation MSA",
                        description: 'Formulaire de création des cotisations MSA',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Cotisation_MSA",
                                label: 'Code rubrique',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Cotisation_MSA",
                                label: 'Libellé',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Maladie",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Cotisation_MSA",
                                label: 'Base de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Salarié_Rubrique_Cotisation_MSA",
                                label: 'Part sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Patronal_Rubrique_Cotisation_MSA",
                                label: 'Part patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Salarié_Rubrique_Cotisation_MSA",
                                label: 'Forfait sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Patronal_Rubrique_Cotisation_MSA",
                                label: 'Forfait patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_DSN_Rubrique_Cotisation_MSA",
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Raison sociale',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                //Form cotisation IRCANTEC
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Cotisation IRCANTEC",
                            type: "STD_COTISATION_IRCANTEC",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Cotisation IRCANTEC",
                        type: "STD_COTISATION_IRCANTEC",
                        buttonLabel: "Créer une nouvelle cotisation IRCANTEC",
                        description: 'Formulaire de création des cotisations IRCANTEC',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Cotisation_IRCANTEC",
                                label: 'Code rubrique',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Cotisation_IRCANTEC",
                                label: 'Libellé',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Maladie",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Cotisation_IRCANTEC",
                                label: 'Base de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Salarié_Rubrique_Cotisation_IRCANTEC",
                                label: 'Part sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Patronal_Rubrique_Cotisation_IRCANTEC",
                                label: 'Part patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Salarié_Rubrique_Cotisation_IRCANTEC",
                                label: 'Forfait sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Patronal_Rubrique_Cotisation_IRCANTEC",
                                label: 'Forfait patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_DSN_Rubrique_Cotisation_IRCANTEC",
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Raison sociale',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                //Form cotisation Prévoyance
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Cotisation Prévoyance",
                            type: "STD_COTISATION_PREVOYANCE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Cotisation Prévoyance",
                        type: "STD_COTISATION_PREVOYANCE",
                        buttonLabel: "Créer une nouvelle cotisation prévoyance",
                        description: 'Formulaire de création des cotisations prévoyance',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Cotisation_Prevoyance",
                                label: 'Code rubrique',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Cotisation_Prevoyance",
                                label: 'Libellé',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Maladie",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Cotisation_Prevoyance",
                                label: 'Base de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Salarié_Rubrique_Cotisation_Prevoyance",
                                label: 'Part sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Patronal_Rubrique_Cotisation_Prevoyance",
                                label: 'Part patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Salarié_Rubrique_Cotisation_Prevoyance",
                                label: 'Forfait sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Patronal_Rubrique_Cotisation_Prevoyance",
                                label: 'Forfait patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_DSN_Rubrique_Cotisation_Prevoyance",
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Raison sociale',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                //Form cotisation Prévoyance non cadre
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Cotisation Prévoyance non cadre",
                            type: "STD_COTISATION_PREVOYANCE_NON_CADRE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Cotisation Prévoyance non cadre",
                        type: "STD_COTISATION_PREVOYANCE_NON_CADRE",
                        buttonLabel: "Créer une nouvelle cotisation prévoyance non cadre",
                        description: 'Formulaire de création des cotisations prévoyance non cadre',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Cotisation_Prevoyance_Non_Cadre",
                                label: 'Code rubrique',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Cotisation_Prevoyance_Non_Cadre",
                                label: 'Libellé',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Maladie",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Cotisation_Prevoyance_Non_Cadre",
                                label: 'Base de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Salarié_Rubrique_Cotisation_Prevoyance_Non_Cadre",
                                label: 'Part sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Patronal_Rubrique_Cotisation_Prevoyance_Non_Cadre",
                                label: 'Part patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Salarié_Rubrique_Cotisation_Prevoyance_Non_Cadre",
                                label: 'Forfait sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Patronal_Rubrique_Cotisation_Prevoyance_Non_Cadre",
                                label: 'Forfait patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_DSN_Rubrique_Cotisation_Prevoyance_Non_Cadre",
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Raison sociale',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                //Form cotisation Prévoyance non cadre supplémentaires
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Cotisation Prévoyance non cadre supplémentaire",
                            type: "STD_COTISATION_PREVOYANCE_NON_CADRE_SUPPLEMENTAIRE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Cotisation Prévoyance non cadre supplémentaire",
                        type: "STD_COTISATION_PREVOYANCE_NON_CADRE_SUPPLEMENTAIRE",
                        buttonLabel: "Créer une nouvelle cotisation prévoyance non cadre supplémentaire",
                        description: 'Formulaire de création des cotisations prévoyance non cadre supplémentaires',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Cotisation_Prevoyance_Non_Cadre_Supplémentaire",
                                label: 'Code rubrique',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Cotisation_Prevoyance_Non_Cadre_Supplémentaire",
                                label: 'Libellé',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Maladie",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Cotisation_Prevoyance_Non_Cadre_Supplémentaire",
                                label: 'Base de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Salarié_Rubrique_Cotisation_Prevoyance_Non_Cadre_Supplémentaire",
                                label: 'Part sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Patronal_Rubrique_Cotisation_Prevoyance_Non_Cadre_Supplémentaire",
                                label: 'Part patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Salarié_Rubrique_Cotisation_Prevoyance_Non_Cadre_Supplémentaire",
                                label: 'Forfait sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Patronal_Rubrique_Cotisation_Prevoyance_Non_Cadre_Supplémentaire",
                                label: 'Forfait patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_DSN_Rubrique_Cotisation_Prevoyance_Non_Cadre_Supplémentaire",
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Raison sociale',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                //Form cotisation Prévoyance cadre
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Cotisation Prévoyance cadre",
                            type: "STD_COTISATION_PREVOYANCE_CADRE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Cotisation Prévoyance cadre",
                        type: "STD_COTISATION_PREVOYANCE_CADRE",
                        buttonLabel: "Créer une nouvelle cotisation prévoyance cadre",
                        description: 'Formulaire de création des cotisations prévoyance non cadre',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Cotisation_Prevoyance_Cadre",
                                label: 'Code rubrique',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Cotisation_Prevoyance_Cadre",
                                label: 'Libellé',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Maladie",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Cotisation_Prevoyance_Cadre",
                                label: 'Base de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Salarié_Rubrique_Cotisation_Prevoyance_Cadre",
                                label: 'Part sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Patronal_Rubrique_Cotisation_Prevoyance_Cadre",
                                label: 'Part patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Salarié_Rubrique_Cotisation_Prevoyance_Cadre",
                                label: 'Forfait sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Patronal_Rubrique_Cotisation_Prevoyance_Cadre",
                                label: 'Forfait patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_DSN_Rubrique_Cotisation_Prevoyance_Cadre",
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Raison sociale',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                //Form cotisation Prévoyance cadre supplémentaire
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Cotisation Prévoyance cadre supplémentaire",
                            type: "STD_COTISATION_PREVOYANCE_CADRE_SUPPLEMENTAIRE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Cotisation Prévoyance cadre supplémentaire",
                        type: "STD_COTISATION_PREVOYANCE_CADRE_SUPPLEMENTAIRE",
                        buttonLabel: "Créer une nouvelle cotisation prévoyance cadre supplémentaire",
                        description: 'Formulaire de création des cotisations prévoyance non cadre supplémentaire',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Cotisation_Prevoyance_Cadre_Supplémentaire",
                                label: 'Code rubrique',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Cotisation_Prevoyance_Cadre_Supplémentaire",
                                label: 'Libellé',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Maladie",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Cotisation_Prevoyance_Cadre_Supplémentaire",
                                label: 'Base de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Salarié_Rubrique_Cotisation_Prevoyance_Cadre_Supplémentaire",
                                label: 'Part sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Patronal_Rubrique_Cotisation_Prevoyance_Cadre_Supplémentaire",
                                label: 'Part patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Salarié_Rubrique_Cotisation_Prevoyance_Cadre_Supplémentaire",
                                label: 'Forfait sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Patronal_Rubrique_Cotisation_Prevoyance_Cadre_Supplémentaire",
                                label: 'Forfait patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_DSN_Rubrique_Cotisation_Prevoyance_Cadre_Supplémentaire",
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Raison sociale',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                //Form cotisation Mutuelle 
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Cotisation Mutuelle",
                            type: "STD_COTISATION_MUTUELLE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Cotisation Mutuelle",
                        type: "STD_COTISATION_MUTUELLE",
                        buttonLabel: "Créer une nouvelle cotisation mutuelle",
                        description: 'Formulaire de création des cotisations mutuelle',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Cotisation_Mutuelle",
                                label: 'Code rubrique',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Cotisation_Mutuelle",
                                label: 'Libellé',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Maladie",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Cotisation_Mutuelle",
                                label: 'Base de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Salarié_Rubrique_Cotisation_Mutuelle",
                                label: 'Part sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Patronal_Rubrique_Cotisation_Mutuelle",
                                label: 'Part patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Salarié_Rubrique_Cotisation_Mutuelle",
                                label: 'Forfait sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Patronal_Rubrique_Cotisation_Mutuelle",
                                label: 'Forfait patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_DSN_Rubrique_Cotisation_Mutuelle",
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Raison sociale',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                //Form cotisation Mutuelle non cadre
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Cotisation Mutuelle non cadre",
                            type: "STD_COTISATION_MUTUELLE_NON_CADRE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Cotisation Mutuelle non cadre",
                        type: "STD_COTISATION_MUTUELLE_NON_CADRE",
                        buttonLabel: "Créer une nouvelle cotisation mutuelle non cadre",
                        description: 'Formulaire de création des cotisations mutuelle non cadre',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Cotisation_Mutuelle_Non_Cadre",
                                label: 'Code rubrique',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Cotisation_Mutuelle_Non_Cadre",
                                label: 'Libellé',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Maladie",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Cotisation_Mutuelle_Non_Cadre",
                                label: 'Base de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Salarié_Rubrique_Cotisation_Mutuelle_Non_Cadre",
                                label: 'Part sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Patronal_Rubrique_Cotisation_Mutuelle_Non_Cadre",
                                label: 'Part patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Salarié_Rubrique_Cotisation_Mutuelle_Non_Cadre",
                                label: 'Forfait sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Patronal_Rubrique_Cotisation_Mutuelle_Non_Cadre",
                                label: 'Forfait patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_DSN_Rubrique_Cotisation_Mutuelle_Non_Cadre",
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Raison sociale',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                //Form cotisation Mutuelle non cadre supplémentaire
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Cotisation Mutuelle non cadre supplémentaire",
                            type: "STD_COTISATION_MUTUELLE_NON_CADRE_SUPPLEMENTAIRE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Cotisation Mutuelle non cadre supplémentaire",
                        type: "STD_COTISATION_MUTUELLE_NON_CADRE_SUPPLEMENTAIRE",
                        buttonLabel: "Créer une nouvelle cotisation mutuelle non cadre supplémentaire",
                        description: 'Formulaire de création des cotisations mutuelle non cadre supplémentaire',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Cotisation_Mutuelle_Non_Cadre_Supplémentaire",
                                label: 'Code rubrique',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Cotisation_Mutuelle_Non_Cadre_Supplémentaire",
                                label: 'Libellé',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Maladie",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Cotisation_Mutuelle_Non_Cadre_Supplémentaire",
                                label: 'Base de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Salarié_Rubrique_Cotisation_Mutuelle_Non_Cadre_Supplémentaire",
                                label: 'Part sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Patronal_Rubrique_Cotisation_Mutuelle_Non_Cadre_Supplémentaire",
                                label: 'Part patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Salarié_Rubrique_Cotisation_Mutuelle_Non_Cadre_Supplémentaire",
                                label: 'Forfait sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Patronal_Rubrique_Cotisation_Mutuelle_Non_Cadre_Supplémentaire",
                                label: 'Forfait patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_DSN_Rubrique_Cotisation_Mutuelle_Non_Cadre_Supplémentaire",
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Raison sociale',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                //Form cotisation Mutuelle cadre
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Cotisation Mutuelle cadre",
                            type: "STD_COTISATION_MUTUELLE_CADRE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Cotisation Mutuelle cadre",
                        type: "STD_COTISATION_MUTUELLE_CADRE",
                        buttonLabel: "Créer une nouvelle cotisation mutuelle cadre",
                        description: 'Formulaire de création des cotisations mutuelle cadre',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Cotisation_Mutuelle_Cadre",
                                label: 'Code rubrique',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Cotisation_Mutuelle_Cadre",
                                label: 'Libellé',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Maladie",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Cotisation_Mutuelle_Cadre",
                                label: 'Base de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Salarié_Rubrique_Cotisation_Mutuelle_Cadre",
                                label: 'Part sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Patronal_Rubrique_Cotisation_Mutuelle_Cadre",
                                label: 'Part patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Salarié_Rubrique_Cotisation_Mutuelle_Cadre",
                                label: 'Forfait sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Patronal_Rubrique_Cotisation_Mutuelle_Cadre",
                                label: 'Forfait patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_DSN_Rubrique_Cotisation_Mutuelle_Cadre",
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Raison sociale',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                //Form cotisation Mutuelle cadre supplémentaire
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Cotisation Mutuelle cadre supplémentaire",
                            type: "STD_COTISATION_MUTUELLE_CADRE_SUPPLEMENTAIRE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Cotisation Mutuelle cadre supplémentaire",
                        type: "STD_COTISATION_MUTUELLE_CADRE_SUPPLEMENTAIRE",
                        buttonLabel: "Créer une nouvelle cotisation mutuelle cadre supplémentaire",
                        description: 'Formulaire de création des cotisations mutuelle cadre supplémentaire',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Cotisation_Mutuelle_Cadre_Supplementaire",
                                label: 'Code rubrique',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Cotisation_Mutuelle_Cadre_Supplementaire",
                                label: 'Libellé',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Maladie",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Cotisation_Mutuelle_Cadre_Supplementaire",
                                label: 'Base de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Salarié_Rubrique_Cotisation_Mutuelle_Cadre_Supplementaire",
                                label: 'Part sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Patronal_Rubrique_Cotisation_Mutuelle_Cadre_Supplementaire",
                                label: 'Part patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Salarié_Rubrique_Cotisation_Mutuelle_Cadre_Supplementaire",
                                label: 'Forfait sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Patronal_Rubrique_Cotisation_Mutuelle_Cadre_Supplementaire",
                                label: 'Forfait patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_DSN_Rubrique_Cotisation_Mutuelle_Cadre_Supplementaire",
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Raison sociale',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                //Form cotisation retraite supplémentaires
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Cotisation retraite supplémentaires",
                            type: "STD_COTISATION_RETRAITE_SUPPLEMENTAIRE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Cotisation retraite supplémentaires",
                        type: "STD_COTISATION_RETRAITE_SUPPLEMENTAIRE",
                        buttonLabel: "Créer une nouvelle cotisation retraite supplémentaires",
                        description: 'Formulaire de création des cotisations retraite supplémentaires',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Cotisation_Retraite_Supplementaire",
                                label: 'Code rubrique',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Cotisation_Retraite_Supplementaire",
                                label: 'Libellé',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Maladie",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Cotisation_Retraite_Supplementaire",
                                label: 'Base de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Salarié_Rubrique_Cotisation_Retraite_Supplementaire",
                                label: 'Part sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Patronal_Rubrique_Cotisation_Retraite_Supplementaire",
                                label: 'Part patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Salarié_Rubrique_Cotisation_Retraite_Supplementaire",
                                label: 'Forfait sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Patronal_Rubrique_Cotisation_Retraite_Supplementaire",
                                label: 'Forfait patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_DSN_Rubrique_Cotisation_Retraite_Supplementaire",
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Raison sociale',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                //Form cotisation retraite supplémentaires non cadre
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Cotisation retraite supplémentaires non cadre",
                            type: "STD_COTISATION_RETRAITE_SUPPLEMENTAIRE_NON_CADRE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Cotisation retraite supplémentaires non cadre",
                        type: "STD_COTISATION_RETRAITE_SUPPLEMENTAIRE_NON_CADRE",
                        buttonLabel: "Créer une nouvelle cotisation retraite supplémentaires non cadre",
                        description: 'Formulaire de création des cotisations retraite supplémentaires non cadre',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Cotisation_Retraite_Supplementaire_Non_Cadre",
                                label: 'Code rubrique',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Cotisation_Retraite_Supplementaire_Non_Cadre",
                                label: 'Libellé',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Maladie",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Cotisation_Retraite_Supplementaire_Non_Cadre",
                                label: 'Base de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Salarié_Rubrique_Cotisation_Retraite_Supplementaire_Non_Cadre",
                                label: 'Part sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Patronal_Rubrique_Cotisation_Retraite_Supplementaire_Non_Cadre",
                                label: 'Part patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Salarié_Rubrique_Cotisation_Retraite_Supplementaire_Non_Cadre",
                                label: 'Forfait sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Patronal_Rubrique_Cotisation_Retraite_Supplementaire_Non_Cadre",
                                label: 'Forfait patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_DSN_Rubrique_Cotisation_Retraite_Supplementaire_Non_Cadre",
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Raison sociale',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                //Form cotisation retraite supplémentaires cadre
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Cotisation retraite supplémentaires cadre",
                            type: "STD_COTISATION_RETRAITE_SUPPLEMENTAIRE_CADRE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Cotisation retraite supplémentaires cadre",
                        type: "STD_COTISATION_RETRAITE_SUPPLEMENTAIRE_CADRE",
                        buttonLabel: "Créer une nouvelle cotisation retraite supplémentaires cadre",
                        description: 'Formulaire de création des cotisations retraite supplémentaires cadre',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Cotisation_Retraite_Supplementaire_Cadre",
                                label: 'Code rubrique',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Cotisation_Retraite_Supplementaire_Cadre",
                                label: 'Libellé',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Maladie",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Cotisation_Retraite_Supplementaire_Cadre",
                                label: 'Base de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Salarié_Rubrique_Cotisation_Retraite_Supplementaire_Cadre",
                                label: 'Part sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Patronal_Rubrique_Cotisation_Retraite_Supplementaire_Cadre",
                                label: 'Part patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Salarié_Rubrique_Cotisation_Retraite_Supplementaire_Cadre",
                                label: 'Forfait sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Patronal_Rubrique_Cotisation_Retraite_Supplementaire_Cadre",
                                label: 'Forfait patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_DSN_Rubrique_Cotisation_Retraite_Supplementaire_Cadre",
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Raison sociale',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            ]
                        }
                    }

                })
                //Form caisse CP
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Cotisation caisse de congés payés",
                            type: "STD_COTISATION_CAISSE_CONGES_PAYES",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Cotisation caisse de congés payés",
                        type: "STD_COTISATION_CAISSE_CONGES_PAYES",
                        buttonLabel: "Créer une nouvelle cotisation de caisse de congés payés",
                        description: 'Formulaire de création des cotisations de la caisse de congés payés',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                otherData: "Logiciel_Code_Rubrique_Cotisation_Caisse_Conges_Payes",
                                label: 'Code rubrique',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "1000",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Libelle_Rubrique_Cotisation_Caisse_Conges_Payes",
                                label: 'Libellé',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                placeholder: "Maladie",
                                order: 2,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_Base_Rubrique_Cotisation_Caisse_Conges_Payes",
                                label: 'Base de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Salarié_Rubrique_Cotisation_Caisse_Conges_Payes",
                                label: 'Part sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Taux_Patronal_Rubrique_Cotisation_Caisse_Conges_Payes",
                                label: 'Part patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Salarié_Rubrique_Cotisation_Caisse_Conges_Payes",
                                label: 'Forfait sariale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: "Logiciel_Forfait_Patronal_Rubrique_Cotisation_Caisse_Conges_Payes",
                                label: 'Forfait patronale de cotisation',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                otherData: "Logiciel_DSN_Rubrique_Cotisation_Caisse_Conges_Payes",
                                label: 'Type DSN',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 8,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Etablissement',
                                inputSource: 'Raison sociale',
                                label: 'Raison sociale',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 9,
                                required: false,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'select',
                                formSource: 'Convention collective',
                                inputSource: 'Libellé convention collective',
                                label: 'Libellé convention collective',
                                maxLength: 50,
                                isLabel: true,
                                minLength: 1,
                                order: 10,
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

export const formV0006Seed = new FormV0006Seed("FORM_V0006", "Création des formulaires rémunérations,cotisations", 22, "BOOK_V0010")

