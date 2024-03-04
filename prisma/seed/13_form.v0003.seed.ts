
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
                            title: "Caisse de cotisation URSSAF",
                            type: "DSN_ORGANISME_SOCIAUX_URSSAF",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Caisse de cotisation URSSAF",
                        type: "DSN_ORGANISME_SOCIAUX_URSSAF",
                        buttonLabel: "Créer un organisme social URSSAF",
                        description: 'Formulaire de création des URSSAF',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                dsnType: 'DSN_URSSAF_Code',
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
                                dsnType: 'URSSAF_Libelle',
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
                                type: 'select',
                                formSource: 'DSN_ETABLISSEMENT',
                                inputSource: 'Raison sociale',
                                label: 'Raion sociale',
                                isDescription: true,
                                minLength: 1,
                                placeholder: "5",
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_URSSAF_Adresse_1',
                                label: 'Adresse 1',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Rue victor Hugo",
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_URSSAF_Adresse_2',
                                label: 'Adresse 2',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Complément d'adresse",
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_URSSAF_Adresse_3',
                                label: 'Adresse 3',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Complément d'adresse",
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_URSSAF_Ville',
                                label: 'Ville',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Nantes",
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_URSSAF_Code_Postal',
                                label: 'Code postal',
                                maxLength: 50,
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
                //MSA
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Caisse de cotisation MSA",
                            type: "DSN_ORGANISME_SOCIAUX_MSA",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Caisse de cotisation MSA",
                        type: "DSN_ORGANISME_SOCIAUX_MSA",
                        buttonLabel: "Créer un organisme social MSA",
                        description: 'Formulaire de création des MSA',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                dsnType: 'DSN_MSA_Code',
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
                                otherData: 'MSA_Libelle',
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
                                type: 'select',
                                formSource: 'DSN_ETABLISSEMENT',
                                inputSource: 'Raison sociale',
                                label: 'Raion sociale',
                                isDescription: true,
                                minLength: 1,
                                placeholder: "5",
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_MSA_Adresse_1',
                                label: 'Adresse 1',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Rue victor Hugo",
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_MSA_Adresse_2',
                                label: 'Adresse 2',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Complément d'adresse",
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_MSA_Adresse_3',
                                label: 'Adresse 3',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Complément d'adresse",
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_MSA_Ville',
                                label: 'Ville',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Nantes",
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_MSA_Code_Postal',
                                label: 'Code postal',
                                maxLength: 50,
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
                //Retraite
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Caisse de cotisation retraite",
                            type: "DSN_ORGANISME_SOCIAUX_RETRAITE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Caisse de cotisation retraite",
                        type: "DSN_ORGANISME_SOCIAUX_RETRAITE",
                        buttonLabel: "Créer un organisme social retraite",
                        description: 'Formulaire de création des retraite',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                dsnType: 'DSN_Caisse_Retraite_Code',
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
                                otherData: 'Retraite_Libelle',
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
                                type: 'select',
                                formSource: 'DSN_ETABLISSEMENT',
                                inputSource: 'Raison sociale',
                                label: 'Raion sociale',
                                isDescription: true,
                                minLength: 1,
                                placeholder: "5",
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Retraite_Adresse_1',
                                label: 'Adresse 1',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Rue victor Hugo",
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Retraite_Adresse_2',
                                label: 'Adresse 2',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Complément d'adresse",
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Retraite_Adresse_3',
                                label: 'Adresse 3',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Complément d'adresse",
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Retraite_Ville',
                                label: 'Ville',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Nantes",
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Retraite_Code_Postal',
                                label: 'Code postal',
                                maxLength: 50,
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

                //Prévoyance
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Caisse de cotisation prévoyance",
                            type: "DSN_ORGANISME_SOCIAUX_PREVOYANCE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Caisse de cotisation prévoyance",
                        type: "DSN_ORGANISME_SOCIAUX_PREVOYANCE",
                        buttonLabel: "Créer un organisme social prévoyance",
                        description: 'Formulaire de création des prévoyance',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                dsnType: 'DSN_Caisse_Prevoyance_Code',
                                label: 'Code organisme sociaux',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: 'Prevoyance_Libelle',
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
                                type: 'select',
                                formSource: 'DSN_ETABLISSEMENT',
                                inputSource: 'Raison sociale',
                                label: 'Raion sociale',
                                isDescription: true,
                                minLength: 1,
                                placeholder: "5",
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Prevoyance_Adresse_1',
                                label: 'Adresse 1',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Rue victor Hugo",
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Prevoyance_Adresse_2',
                                label: 'Adresse 2',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Complément d'adresse",
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Prevoyance_Adresse_3',
                                label: 'Adresse 3',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Complément d'adresse",
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Prevoyance_Ville',
                                label: 'Ville',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Nantes",
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Prevoyance_Code_Postal',
                                label: 'Code postal',
                                maxLength: 50,
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

                //Mutuelle
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Caisse de cotisation mutuelle",
                            type: "DSN_ORGANISME_SOCIAUX_MUTUELLE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Caisse de cotisation mutuelle",
                        type: "DSN_ORGANISME_SOCIAUX_MUTUELLE",
                        buttonLabel: "Créer un organisme social mutuelle",
                        description: 'Formulaire de création des mutuelle',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                dsnType: 'DSN_Caisse_Mutuelle_Code',
                                label: 'Code organisme sociaux',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: 'Mutuelle_Libelle',
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
                                type: 'select',
                                formSource: 'DSN_ETABLISSEMENT',
                                inputSource: 'Raison sociale',
                                label: 'Raion sociale',
                                isDescription: true,
                                minLength: 1,
                                placeholder: "5",
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Mutuelle_Adresse_1',
                                label: 'Adresse 1',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Rue victor Hugo",
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Mutuelle_Adresse_2',
                                label: 'Adresse 2',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Complément d'adresse",
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Mutuelle_Adresse_3',
                                label: 'Adresse 3',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Complément d'adresse",
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Mutuelle_Ville',
                                label: 'Ville',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Nantes",
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Mutuelle_Code_Postal',
                                label: 'Code postal',
                                maxLength: 50,
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

                //Retraite supplémentaire
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Caisse de cotisation retraite supplémentaire",
                            type: "DSN_ORGANISME_SOCIAUX_RETRAITE_SUPPLEMENTAIRE",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Caisse de cotisation retraite supplémentaire",
                        type: "DSN_ORGANISME_SOCIAUX_RETRAITE_SUPPLEMENTAIRE",
                        buttonLabel: "Créer un organisme de retraite supplémentaire",
                        description: 'Formulaire de création des retraite supplémentaire',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                dsnType: 'DSN_Caisse_Retraite_Supplementaire_Code',
                                label: 'Code organisme sociaux',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: 'Retraite_Supplementaire_Libelle',
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
                                type: 'select',
                                formSource: 'DSN_ETABLISSEMENT',
                                inputSource: 'Raison sociale',
                                label: 'Raion sociale',
                                isDescription: true,
                                minLength: 1,
                                placeholder: "5",
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Retraite_Supplementaire_Adresse_1',
                                label: 'Adresse 1',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Rue victor Hugo",
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Retraite_Supplementaire_Adresse_2',
                                label: 'Adresse 2',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Complément d'adresse",
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Retraite_Supplementaire_Adresse_3',
                                label: 'Adresse 3',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Complément d'adresse",
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Retraite_Supplementaire_Ville',
                                label: 'Ville',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Nantes",
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Retraite_Supplementaire_Code_Postal',
                                label: 'Code postal',
                                maxLength: 50,
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

                //Caisse Congés Payés
                await prisma.form.upsert({
                    where: {
                        title_type_version: {
                            title: "Caisse de congé payé",
                            type: "DSN_ORGANISME_SOCIAUX_CAISSE_CP",
                            version: 1
                        }
                    },
                    update: {},
                    create: {
                        title: "Caisse de congé payé",
                        type: "DSN_ORGANISME_SOCIAUX_CAISSE_CP",
                        buttonLabel: "Créer un organisme de caisse de congé payé",
                        description: 'Formulaire de création des caisse de congé payé',
                        createdBy: "system",
                        status: "actif",
                        version: 1,
                        Form_Input: {
                            create: [{
                                type: 'text',
                                dsnType: 'DSN_Caisse_Caisse_Conge_Paye_Code',
                                label: 'Code organisme sociaux',
                                isCode: true,
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "",
                                order: 1,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                otherData: 'Caisse_CP_Libelle',
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
                                type: 'select',
                                formSource: 'DSN_ETABLISSEMENT',
                                inputSource: 'Raison sociale',
                                label: 'Raion sociale',
                                isDescription: true,
                                minLength: 1,
                                placeholder: "5",
                                order: 3,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Caisse_Conge_Paye_Adresse_1',
                                label: 'Adresse 1',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Rue victor Hugo",
                                order: 4,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Caisse_Conge_Paye_Adresse_2',
                                label: 'Adresse 2',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Complément d'adresse",
                                order: 5,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Conge_Paye_Adresse_3',
                                label: 'Adresse 3',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Complément d'adresse",
                                order: 6,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Conge_Paye_Ville',
                                label: 'Ville',
                                maxLength: 50,
                                minLength: 1,
                                placeholder: "Nantes",
                                order: 7,
                                required: true,
                                readonly: false,
                                createdBy: "system"
                            },
                            {
                                type: 'text',
                                dsnType: 'DSN_Caisse_Conge_Paye_Code_Postal',
                                label: 'Code postal',
                                maxLength: 50,
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

