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

class FormV0001 extends Seed {
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
                        id: 'Standard_Formulaire_Société',
                        label: 'Création de société',
                        slug: 'Standard_Formulaire_0001',
                        description: 'Création de société',
                        processusId: 'Standard_0002',
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
                                    slug: 'Standard_Champ_0001',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    zodLabel: 'siren',
                                    label: 'Numéro SIREN',
                                    required: true,
                                    minLenght: 9,
                                    maxLenght: 9,
                                    placeholder: '123456789',
                                    order: 2,
                                    slug: 'Standard_Champ_0002',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    zodLabel: 'nic',
                                    label: 'Numéro NIC',
                                    placeholder: '12345',
                                    required: true,
                                    minLenght: 5,
                                    maxLenght: 5,
                                    order: 3,
                                    slug: 'Standard_Champ_0003',
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
                                    slug: 'Standard_Champ_0004',
                                },
                                {
                                    id: 'Standard_Champ_0005',
                                    type: 'text',
                                    zodLabel: 'socialReason',
                                    required: true,
                                    label: 'Raison sociale de la société',
                                    placeholder: 'Nom de la société',
                                    order: 5,
                                    slug: 'Standard_Champ_0005',
                                },
                                {
                                    id: 'Standard_Champ_0006',
                                    type: 'text',
                                    zodLabel: 'address1',
                                    label: 'Adresse 1',
                                    placeholder: '1 rue de la Paix',
                                    order: 6,
                                    required: true,
                                    slug: 'Standard_Champ_0006',
                                },
                                {
                                    id: 'Standard_Champ_0007',
                                    type: 'text',
                                    zodLabel: 'address2',
                                    label: 'Adresse 2',
                                    placeholder: 'Batiment A',
                                    order: 7,
                                    slug: 'Standard_Champ_0007',
                                },
                                {
                                    id: 'Standard_Champ_0008',
                                    type: 'text',
                                    zodLabel: 'address3',
                                    label: 'Adresse 3',
                                    placeholder: 'Service RH',
                                    order: 8,
                                    slug: 'Standard_Champ_0008',
                                },
                                {
                                    id: 'Standard_Champ_0009',
                                    type: 'text',
                                    zodLabel: 'address4',
                                    label: 'Adresse 4',
                                    placeholder: 'Complémet d\'adresse',
                                    order: 9,
                                    slug: 'Standard_Champ_0009',
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
                                    slug: 'Standard_Champ_0010',
                                },
                                {
                                    id: 'Standard_Champ_0011',
                                    type: 'text',
                                    zodLabel: 'city',
                                    label: 'Ville',
                                    required: true,
                                    placeholder: 'Nantes',
                                    order: 11,
                                    slug: 'Standard_Champ_0011',
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
                                    slug: 'Standard_Champ_0012',
                                },
                            ]
                        }

                    }

                })

                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_établissement',
                        label: 'Création établissement',
                        slug: 'Standard_Formulaire_0002',
                        description: 'Création établissement',
                        processusId: 'Standard_0003',
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
                                    slug: 'Standard_Champ_0013',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'select',
                                    zodLabel: 'societyId',
                                    label: 'Siren de la société',
                                    selectTableSource: 'Project_Society',
                                    selectFieldSource: 'siren',
                                    placeholder: '0001',
                                    required: true,
                                    order: 2,
                                    slug: 'Standard_Champ_0053',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    zodLabel: 'nic',
                                    required: true,
                                    minLenght: 5,
                                    maxLenght: 5,
                                    label: 'Code NIC',
                                    placeholder: '12345',
                                    order: 3,
                                    slug: 'Standard_Champ_0014',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    zodLabel: 'ape',
                                    type: 'text',
                                    required: true,
                                    minLenght: 5,
                                    maxLenght: 5,
                                    label: 'Code APE',
                                    placeholder: '12345',
                                    order: 4,
                                    slug: 'Standard_Champ_0015',
                                },
                                {
                                    id: 'Standard_Champ_0005',
                                    type: 'text',
                                    zodLabel: 'socialReason',
                                    required: true,
                                    label: 'Raison sociale établissement',
                                    placeholder: 'Etablissement MARTIN',
                                    order: 5,
                                    slug: 'Standard_Champ_0016',
                                },
                                {
                                    id: 'Standard_Champ_0006',
                                    type: 'text',
                                    zodLabel: 'address1',
                                    required: true,
                                    label: 'Adresse 1',
                                    placeholder: '1 rue de la Paix',
                                    order: 6,
                                    slug: 'Standard_Champ_0017',
                                },
                                {
                                    id: 'Standard_Champ_0007',
                                    type: 'text',
                                    zodLabel: 'address2',
                                    label: 'Adresse 2',
                                    placeholder: 'Batiment A',
                                    order: 7,
                                    slug: 'Standard_Champ_0018',
                                },
                                {
                                    id: 'Standard_Champ_0008',
                                    type: 'text',
                                    zodLabel: 'address3',
                                    label: 'Adresse 3',
                                    placeholder: 'Service RH',
                                    order: 8,
                                    slug: 'Standard_Champ_0019',
                                },
                                {
                                    id: 'Standard_Champ_0009',
                                    type: 'text',
                                    zodLabel: 'address4',
                                    label: 'Adresse 4',
                                    placeholder: 'Complémet d\'adresse',
                                    order: 9,
                                    slug: 'Standard_Champ_0020',
                                },
                                {
                                    id: 'Standard_Champ_0010',
                                    type: 'text',
                                    label: 'Code postal',
                                    required: true,
                                    minLenght: 5,
                                    maxLenght: 6,
                                    zodLabel: 'postalCode',
                                    placeholder: '44000',
                                    order: 10,
                                    slug: 'Standard_Champ_0021',
                                },
                                {
                                    id: 'Standard_Champ_0011',
                                    type: 'text',
                                    label: 'Ville',
                                    required: true,
                                    placeholder: 'Nantes',
                                    order: 11,
                                    zodLabel: 'city',
                                    slug: 'Standard_Champ_0022',
                                },
                                {
                                    id: 'Standard_Champ_0012',
                                    type: 'text',
                                    label: 'Pays',
                                    required: true,
                                    defaultValue: 'France',
                                    placeholder: 'France',
                                    order: 12,
                                    zodLabel: 'country',
                                    slug: 'Standard_Champ_0023',
                                },
                            ]
                        }

                    }

                })

                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_emploi',
                        label: 'Création emploi',
                        slug: 'Standard_Formulaire_0003',
                        description: 'Création des emplois',
                        processusId: 'Standard_0006',
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'text',
                                    label: 'Code',
                                    zodLabel: 'id',
                                    placeholder: '0001',
                                    order: 1,
                                    slug: 'Standard_Champ_0024',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    label: 'Libellé',
                                    required: true,
                                    zodLabel: 'label',
                                    placeholder: 'Consultant déploiement',
                                    order: 2,
                                    slug: 'Standard_Champ_0025',
                                },
                            ]
                        }
                    }

                })
                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_taux_at',
                        label: 'Création taux AT',
                        slug: 'Standard_Formulaire_0004',
                        description: 'Création des taux AT',
                        processusId: 'Standard_0005',
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
                                    slug: 'Standard_Champ_0026',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    label: 'Libellé',
                                    required: true,
                                    zodLabel: 'label',
                                    placeholder: 'Consultant déploiement',
                                    order: 2,
                                    slug: 'Standard_Champ_0027',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'switch',
                                    zodLabel: 'office',
                                    label: 'Code bureau',
                                    order: 3,
                                    slug: 'Standard_Champ_0028',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'date',
                                    zodLabel: 'startDate',
                                    label: 'Date de début',
                                    placeholder: '01/01/2024',
                                    order: 4,
                                    slug: 'Standard_Champ_0029',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'date',
                                    zodLabel: 'endDate',
                                    label: 'Date de fin',
                                    placeholder: '01/01/2024',
                                    order: 5,
                                    slug: 'Standard_Champ_0030',
                                },
                            ]
                        }
                    }
                })
                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_convention_collective',
                        label: 'Création convention collective',
                        slug: 'Standard_Formulaire_0005',
                        description: 'Création des conventions collectives',
                        processusId: 'Standard_0007',
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'text',
                                    zodLabel: 'id',
                                    label: 'Code IDCC',
                                    required: true,
                                    placeholder: '9999',
                                    order: 1,
                                    slug: 'Standard_Champ_0031',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    zodLabel: 'label',
                                    label: 'Libellé',
                                    placeholder: 'Droit du travail  ',
                                    order: 2,
                                    slug: 'Standard_Champ_0032',
                                },
                            ]
                        }
                    }
                })
                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_coefficient',
                        label: 'Création des coefficients',
                        slug: 'Standard_Formulaire_0006',
                        description: 'Création des coefficients',
                        processusId: 'Standard_0008',
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'text',
                                    zodLabel: 'type',
                                    label: 'Type de classification',
                                    readOnly: true,
                                    required: true,
                                    defaultValue: "Coefficient",
                                    order: 1,
                                    slug: 'Standard_Champ_0033',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'select',
                                    zodLabel: 'idcc',
                                    label: 'Code IDCC',
                                    selectTableSource: 'IDCC',
                                    selectFieldSource: 'idcc',
                                    required: true,
                                    placeholder: '9999',
                                    order: 2,
                                    slug: 'Standard_Champ_0034',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    zodLabel: 'id',
                                    label: 'Code du coefficient',
                                    placeholder: '100',
                                    order: 3,
                                    slug: 'Standard_Champ_0035',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'text',
                                    zodLabel: 'value',
                                    label: 'Valeur du coefficient',
                                    placeholder: '100',
                                    order: 4,
                                    slug: 'Standard_Champ_0036',
                                },
                            ]
                        }
                    }
                })
                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_niveau',
                        label: 'Création des niveau',
                        slug: 'Standard_Formulaire_0007',
                        description: 'Création des niveaux',
                        processusId: 'Standard_0009',
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'text',
                                    zodLabel: 'type',
                                    label: 'Type de classification',
                                    readOnly: true,
                                    required: true,
                                    defaultValue: "Niveau",
                                    order: 1,
                                    slug: 'Standard_Champ_0037',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'select',
                                    zodLabel: 'idcc',
                                    label: 'Code IDCC',
                                    selectTableSource: 'IDCC',
                                    selectFieldSource: 'idcc',
                                    required: true,
                                    placeholder: '9999',
                                    order: 2,
                                    slug: 'Standard_Champ_0038',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    zodLabel: 'id',
                                    label: 'Code du niveau',
                                    placeholder: '1',
                                    order: 3,
                                    slug: 'Standard_Champ_0039',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'text',
                                    zodLabel: 'value',
                                    label: 'Valeur du niveau',
                                    placeholder: '1',
                                    order: 4,
                                    slug: 'Standard_Champ_0040',
                                },
                            ]
                        }
                    }
                })
                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_indice',
                        label: 'Création des indices',
                        slug: 'Standard_Formulaire_0008',
                        description: 'Création des indices',
                        processusId: 'Standard_0011',
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'text',
                                    zodLabel: 'type',
                                    label: 'Type de classification',
                                    readOnly: true,
                                    required: true,
                                    defaultValue: "Indice",
                                    order: 1,
                                    slug: 'Standard_Champ_0041',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'select',
                                    zodLabel: 'idcc',
                                    label: 'Code IDCC',
                                    selectTableSource: 'IDCC',
                                    selectFieldSource: 'idcc',
                                    required: true,
                                    placeholder: '9999',
                                    order: 2,
                                    slug: 'Standard_Champ_0042',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    zodLabel: 'id',
                                    label: 'Code indice',
                                    placeholder: '100',
                                    order: 3,
                                    slug: 'Standard_Champ_0043',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    zodLabel: 'value',
                                    label: 'Valeur indice',
                                    placeholder: '100',
                                    order: 4,
                                    slug: 'Standard_Champ_0044',
                                },
                            ]
                        }
                    }
                })
                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_echelon',
                        label: 'Création des échelons',
                        slug: 'Standard_Formulaire_0009',
                        description: 'Création des échelons',
                        processusId: 'Standard_0010',
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'text',
                                    zodLabel: 'type',
                                    label: 'Type de classification',
                                    readOnly: true,
                                    required: true,
                                    defaultValue: "Echelon",
                                    order: 1,
                                    slug: 'Standard_Champ_0045',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'select',
                                    zodLabel: 'idcc',
                                    label: 'Code IDCC',
                                    selectTableSource: 'IDCC',
                                    selectFieldSource: 'IDCC',
                                    required: true,
                                    placeholder: '9999',
                                    order: 2,
                                    slug: 'Standard_Champ_0046',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    zodLabel: 'id',
                                    label: 'Code échelon',
                                    placeholder: '100',
                                    order: 3,
                                    slug: 'Standard_Champ_0047',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'text',
                                    zodLabel: 'value',
                                    label: 'Valeur échelon',
                                    placeholder: '100',
                                    order: 4,
                                    slug: 'Standard_Champ_0048',
                                },
                            ]
                        }
                    }
                })
                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_qualification',
                        label: 'Création des qualifications',
                        slug: 'Standard_Formulaire_0010',
                        description: 'Création des qualifications',
                        processusId: 'Standard_0012',
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'text',
                                    zodLabel: 'type',
                                    label: 'Type de classification',
                                    readOnly: true,
                                    required: true,
                                    defaultValue: "Qualification",
                                    order: 1,
                                    slug: 'Standard_Champ_0049',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'select',
                                    zodLabel: 'idcc',
                                    label: 'Code IDCC',
                                    selectTableSource: 'IDCC',
                                    selectFieldSource: 'IDCC',
                                    required: true,
                                    placeholder: '9999',
                                    order: 2,
                                    slug: 'Standard_Champ_0050',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    zodLabel: 'id',
                                    label: 'Code qualification',
                                    placeholder: '100',
                                    order: 3,
                                    slug: 'Standard_Champ_0051',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'text',
                                    zodLabel: 'value',
                                    label: 'Valeur qualificaton',
                                    placeholder: '100',
                                    order: 4,
                                    slug: 'Standard_Champ_0052',
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

export const formV0001 = new FormV0001("FORM_V0001", "Création de processus structure juridique", 4, "PROCESUS_V0001")

