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

class FormV0009 extends Seed {
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
                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_Edition_Société',
                        label: 'Edition de société',
                        slug: 'Standard_Formulaire_0019',
                        description: 'Edition société',
                        isCreate: false,
                        isEdit: true,
                        processusId: 'Standard_0002',
                        processusVersion: 1,
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'text',
                                    label: 'Code interne',
                                    zodLabel: 'id',
                                    placeholder: '0001',
                                    required: true,
                                    order: 1,
                                    slug: 'Standard_Champ_0120',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    zodLabel: 'siren',
                                    label: 'Numéro SIREN',
                                    required: true,
                                    minLenght: 9,
                                    maxLenght: 9,
                                    readOnly: true,
                                    disabled: true,
                                    placeholder: '123456789',
                                    order: 2,
                                    slug: 'Standard_Champ_0121',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'text',
                                    zodLabel: 'ape',
                                    label: 'Code APE',
                                    required: true,
                                    minLenght: 5,
                                    maxLenght: 5,
                                    placeholder: '12345',
                                    order: 4,
                                    slug: 'Standard_Champ_0122',
                                },
                                {
                                    id: 'Standard_Champ_0005',
                                    type: 'text',
                                    zodLabel: 'socialReason',
                                    required: true,
                                    label: 'Raison sociale de la société',
                                    placeholder: 'Nom de la société',
                                    order: 5,
                                    slug: 'Standard_Champ_0123',
                                },
                                {
                                    id: 'Standard_Champ_0006',
                                    type: 'text',
                                    zodLabel: 'address1',
                                    label: 'Adresse 1',
                                    placeholder: '1 rue de la Paix',
                                    order: 6,
                                    required: true,
                                    slug: 'Standard_Champ_0124',
                                },
                                {
                                    id: 'Standard_Champ_0007',
                                    type: 'text',
                                    zodLabel: 'address2',
                                    label: 'Adresse 2',
                                    placeholder: 'Batiment A',
                                    order: 7,
                                    slug: 'Standard_Champ_0125',
                                },
                                {
                                    id: 'Standard_Champ_0008',
                                    type: 'text',
                                    zodLabel: 'address3',
                                    label: 'Adresse 3',
                                    placeholder: 'Service RH',
                                    order: 8,
                                    slug: 'Standard_Champ_0126',
                                },
                                {
                                    id: 'Standard_Champ_0009',
                                    type: 'text',
                                    zodLabel: 'address4',
                                    label: 'Adresse 4',
                                    placeholder: 'Complémet d\'adresse',
                                    order: 9,
                                    slug: 'Standard_Champ_0127',
                                },
                                {
                                    id: 'Standard_Champ_0010',
                                    type: 'text',
                                    zodLabel: 'postalCode',
                                    label: 'Code postal',
                                    placeholder: '44000',
                                    minLenght: 5,
                                    maxLenght: 6,
                                    required: true,
                                    order: 10,
                                    slug: 'Standard_Champ_0128',
                                },
                                {
                                    id: 'Standard_Champ_0011',
                                    type: 'text',
                                    zodLabel: 'city',
                                    label: 'Ville',
                                    required: true,
                                    placeholder: 'Nantes',
                                    order: 11,
                                    slug: 'Standard_Champ_0129',
                                },
                                {
                                    id: 'Standard_Champ_0012',
                                    type: 'text',
                                    zodLabel: 'country',
                                    required: true,
                                    label: 'Pays',
                                    placeholder: 'France',
                                    order: 12,
                                    defaultValue: 'France',
                                    slug: 'Standard_Champ_0130',
                                },
                            ]
                        }

                    }

                })

                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_Edition_Etablissement',
                        label: 'Edition établissement',
                        slug: 'Standard_Formulaire_0020',
                        isCreate: false,
                        isEdit: true,
                        description: 'Edition établissement',
                        processusId: 'Standard_0003',
                        processusVersion: 1,

                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'text',
                                    zodLabel: 'id',
                                    label: 'Code interne',
                                    placeholder: '0001',
                                    required: true,
                                    order: 1,
                                    slug: 'Standard_Champ_0131',
                                },
                                {
                                    id: 'Standard_Champ_00002',
                                    type: 'text',
                                    zodLabel: 'legalStatus',
                                    label: 'Forme juridique',
                                    placeholder: '0001',
                                    required: true,
                                    order: 2,
                                    slug: 'Standard_Champ_0132',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'select',
                                    zodLabel: 'societyId',
                                    label: 'Siren de la société',
                                    selectTableSource: 'Project_Society',
                                    selectFieldSource: 'siren',
                                    placeholder: '0001',
                                    readOnly: true,
                                    required: true,
                                    disabled: true,
                                    order: 3,
                                    slug: 'Standard_Champ_0133',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'text',
                                    zodLabel: 'nic',
                                    required: true,
                                    minLenght: 5,
                                    maxLenght: 5,
                                    label: 'Code NIC',
                                    placeholder: '12345',
                                    order: 4,
                                    slug: 'Standard_Champ_0134',
                                },
                                {
                                    id: 'Standard_Champ_0005',
                                    zodLabel: 'ape',
                                    type: 'text',
                                    required: true,
                                    minLenght: 5,
                                    maxLenght: 5,
                                    label: 'Code APE',
                                    placeholder: '12345',
                                    order: 5,
                                    slug: 'Standard_Champ_0135',
                                },
                                {
                                    id: 'Standard_Champ_0006',
                                    type: 'text',
                                    zodLabel: 'socialReason',
                                    required: true,
                                    label: 'Raison sociale établissement',
                                    placeholder: 'Etablissement MARTIN',
                                    order: 6,
                                    slug: 'Standard_Champ_0136',
                                },
                                {
                                    id: 'Standard_Champ_0007',
                                    type: 'text',
                                    zodLabel: 'address1',
                                    required: true,
                                    label: 'Adresse 1',
                                    placeholder: '1 rue de la Paix',
                                    order: 7,
                                    slug: 'Standard_Champ_0137',
                                },
                                {
                                    id: 'Standard_Champ_0008',
                                    type: 'text',
                                    zodLabel: 'address2',
                                    label: 'Adresse 2',
                                    placeholder: 'Batiment A',
                                    order: 8,
                                    slug: 'Standard_Champ_0138',
                                },
                                {
                                    id: 'Standard_Champ_0009',
                                    type: 'text',
                                    zodLabel: 'address3',
                                    label: 'Adresse 3',
                                    placeholder: 'Service RH',
                                    order: 9,
                                    slug: 'Standard_Champ_0139',
                                },
                                {
                                    id: 'Standard_Champ_0010',
                                    type: 'text',
                                    zodLabel: 'address4',
                                    label: 'Adresse 4',
                                    placeholder: 'Complémet d\'adresse',
                                    order: 10,
                                    slug: 'Standard_Champ_0140',
                                },
                                {
                                    id: 'Standard_Champ_0011',
                                    type: 'text',
                                    label: 'Code postal',
                                    required: true,
                                    minLenght: 5,
                                    maxLenght: 6,
                                    zodLabel: 'postalCode',
                                    placeholder: '44000',
                                    order: 11,
                                    slug: 'Standard_Champ_0141',
                                },
                                {
                                    id: 'Standard_Champ_0012',
                                    type: 'text',
                                    label: 'Ville',
                                    required: true,
                                    placeholder: 'Nantes',
                                    order: 12,
                                    zodLabel: 'city',
                                    slug: 'Standard_Champ_0142',
                                },
                                {
                                    id: 'Standard_Champ_0013',
                                    type: 'text',
                                    label: 'Pays',
                                    required: true,
                                    defaultValue: 'France',
                                    placeholder: 'France',
                                    order: 13,
                                    zodLabel: 'country',
                                    slug: 'Standard_Champ_0143',
                                },
                            ]
                        }

                    }

                })

                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_Edition_Emploi',
                        label: 'Edition emploi',
                        slug: 'Standard_Formulaire_0021',
                        isCreate: false,
                        isEdit: true,
                        description: 'Création des emplois',
                        processusId: 'Standard_0006',
                        processusVersion: 1,
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'text',
                                    label: 'Code',
                                    zodLabel: 'id',
                                    placeholder: '0001',
                                    order: 1,
                                    slug: 'Standard_Champ_0144',
                                    readOnly: true,
                                    disabled: true,
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    label: 'Libellé',
                                    required: true,
                                    zodLabel: 'label',
                                    placeholder: 'Consultant déploiement',
                                    order: 2,
                                    slug: 'Standard_Champ_0145',
                                },
                            ]
                        }
                    }

                })
                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_Edition_Taux_At',
                        label: 'Edition taux AT',
                        slug: 'Standard_Formulaire_0022',
                        isCreate: false,
                        isEdit: true,
                        description: 'Edition des taux AT',
                        processusId: 'Standard_0005',
                        processusVersion: 1,
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'text',
                                    zodLabel: 'id',
                                    required: true,
                                    label: 'Code risque AT',
                                    placeholder: '0001',
                                    order: 1,
                                    readOnly: true,
                                    disabled: true,
                                    slug: 'Standard_Champ_0146',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    label: 'Libellé',
                                    required: true,
                                    zodLabel: 'label',
                                    placeholder: 'Taux AT',
                                    order: 2,
                                    slug: 'Standard_Champ_0147',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    zodLabel: 'rate',
                                    required: true,
                                    label: 'rate',
                                    order: 3,
                                    slug: 'Standard_Champ_0148',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'switch',
                                    zodLabel: 'office',
                                    label: 'Code bureau',
                                    order: 4,
                                    slug: 'Standard_Champ_0149',
                                },
                                {
                                    id: 'Standard_Champ_0006',
                                    type: 'number',
                                    zodLabel: 'order',
                                    required: true,
                                    label: 'order',
                                    order: 6,
                                    slug: 'Standard_Champ_0150',
                                },

                            ]
                        }
                    }
                })
                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_Edition_Coefficient',
                        label: 'Edition des coefficients',
                        slug: 'Standard_Formulaire_0023',
                        isCreate: false,
                        isEdit: true,
                        description: 'Edition des coefficients',
                        processusId: 'Standard_0008',
                        processusVersion: 1,
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'select',
                                    zodLabel: 'idcc',
                                    label: 'Code IDCC',
                                    selectTableSource: 'Project_Idcc',
                                    selectFieldSource: 'idcc',
                                    required: true,
                                    placeholder: '9999',
                                    readOnly: true,
                                    disabled: true,
                                    order: 1,
                                    slug: 'Standard_Champ_0151',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    zodLabel: 'id',
                                    label: 'Code du coefficient',
                                    placeholder: '100',
                                    readOnly: true,
                                    disabled: true,
                                    order: 3,
                                    slug: 'Standard_Champ_0152',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'text',
                                    zodLabel: 'label',
                                    label: 'Valeur du coefficient',
                                    placeholder: '100',
                                    order: 4,
                                    slug: 'Standard_Champ_0153',
                                },
                            ]
                        }
                    }
                })
                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_Edition_Niveau',
                        label: 'Edition des niveau',
                        slug: 'Standard_Formulaire_0024',
                        isCreate: false,
                        isEdit: true,
                        description: 'Edition des niveaux',
                        processusId: 'Standard_0009',
                        processusVersion: 1,
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'select',
                                    zodLabel: 'idcc',
                                    label: 'Code IDCC',
                                    selectTableSource: 'Project_Idcc',
                                    selectFieldSource: 'idcc',
                                    required: true,
                                    placeholder: '9999',
                                    readOnly: true,
                                    disabled: true,
                                    order: 1,
                                    slug: 'Standard_Champ_0154',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    zodLabel: 'id',
                                    label: 'Code du niveau',
                                    placeholder: '1',
                                    readOnly: true,
                                    disabled: true,
                                    order: 3,
                                    slug: 'Standard_Champ_0155',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'text',
                                    zodLabel: 'label',
                                    label: 'Valeur du niveau',
                                    placeholder: '1',
                                    order: 4,
                                    slug: 'Standard_Champ_0156',
                                },
                            ]
                        }
                    }
                })
                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_Edition_Indice',
                        label: 'Edition des indices',
                        slug: 'Standard_Formulaire_0025',
                        isCreate: false,
                        isEdit: true,
                        description: 'Edition des indices',
                        processusId: 'Standard_0011',
                        processusVersion: 1,
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'select',
                                    zodLabel: 'idcc',
                                    label: 'Code IDCC',
                                    selectTableSource: 'Project_Idcc',
                                    selectFieldSource: 'idcc',
                                    readOnly: true,
                                    disabled: true,
                                    required: true,
                                    placeholder: '9999',
                                    order: 1,
                                    slug: 'Standard_Champ_0157',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    zodLabel: 'id',
                                    label: 'Code indice',
                                    readOnly: true,
                                    disabled: true,
                                    placeholder: '100',
                                    order: 2,
                                    slug: 'Standard_Champ_0158',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    zodLabel: 'label',
                                    label: 'Valeur indice',
                                    placeholder: '100',
                                    order: 3,
                                    slug: 'Standard_Champ_0159',
                                },
                            ]
                        }
                    }
                })
                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_Edition_Echelon',
                        label: 'Edition des échelons',
                        slug: 'Standard_Formulaire_0026',
                        isCreate: false,
                        isEdit: true,
                        description: 'Edition des échelons',
                        processusId: 'Standard_0010',
                        processusVersion: 1,
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'select',
                                    zodLabel: 'idcc',
                                    label: 'Code IDCC',
                                    selectTableSource: 'Project_Idcc',
                                    selectFieldSource: 'idcc',
                                    required: true,
                                    placeholder: '9999',
                                    readOnly: true,
                                    disabled: true,
                                    order: 1,
                                    slug: 'Standard_Champ_0160',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    zodLabel: 'id',
                                    label: 'Code échelon',
                                    readOnly: true,
                                    disabled: true,
                                    placeholder: '100',
                                    order: 2,
                                    slug: 'Standard_Champ_0161',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    zodLabel: 'label',
                                    label: 'Valeur échelon',
                                    placeholder: '100',
                                    order: 3,
                                    slug: 'Standard_Champ_0162',
                                },
                            ]
                        }
                    }
                })
                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_Edition_Qualification',
                        label: 'Edition des qualifications',
                        slug: 'Standard_Formulaire_0027',
                        isCreate: false,
                        isEdit: true,
                        description: 'Edition des qualifications',
                        processusId: 'Standard_0012',
                        processusVersion: 1,
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'select',
                                    zodLabel: 'idcc',
                                    label: 'Code IDCC',
                                    selectTableSource: 'Project_Idcc',
                                    selectFieldSource: 'idcc',
                                    required: true,
                                    placeholder: '9999',
                                    readOnly: true,
                                    disabled: true,
                                    order: 1,
                                    slug: 'Standard_Champ_0163',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    zodLabel: 'id',
                                    label: 'Code qualification',
                                    placeholder: '100',
                                    readOnly: true,
                                    disabled: true,
                                    order: 2,
                                    slug: 'Standard_Champ_0164',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'text',
                                    zodLabel: 'label',
                                    label: 'Valeur qualificaton',
                                    placeholder: '100',
                                    order: 3,
                                    slug: 'Standard_Champ_0165',
                                },
                            ]
                        }
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

export const formV0009 = new FormV0009("FormV0009", "Création formulaire d'édition", 16, "FormV0008")

