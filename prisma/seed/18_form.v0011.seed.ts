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

class FormV0011 extends Seed {
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
                        id: 'Standard_Formulaire_Edition_AGIRC_ARRCO',
                        label: 'Edition des caisses de retraite',
                        slug: 'Standard_Formulaire_0029',
                        description: 'Edition AGIRC ARRCO',
                        isCreate: false,
                        isEdit: true,
                        processusId: 'Standard_0013',
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
                                    readOnly: true,
                                    disabled: true,
                                    order: 1,
                                    slug: 'Standard_Champ_0175',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    zodLabel: 'label',
                                    label: 'Libellé',
                                    required: true,
                                    minLenght: 9,
                                    maxLenght: 9,
                                    readOnly: true,
                                    disabled: true,
                                    placeholder: '123456789',
                                    order: 2,
                                    slug: 'Standard_Champ_0176',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    zodLabel: 'address1',
                                    label: 'Adresse',
                                    required: true,
                                    order: 3,
                                    slug: 'Standard_Champ_0177',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'text',
                                    zodLabel: 'address2',
                                    label: 'Complément d\'adresse',
                                    order: 4,
                                    slug: 'Standard_Champ_0178',
                                },
                                {
                                    id: 'Standard_Champ_0005',
                                    type: 'text',
                                    zodLabel: 'address3',
                                    label: 'Complément d\'adresse',
                                    order: 5,
                                    slug: 'Standard_Champ_0179',
                                },
                                {
                                    id: 'Standard_Champ_0006',
                                    type: 'text',
                                    zodLabel: 'address4',
                                    label: 'Complément d\'adresse',
                                    order: 6,
                                    slug: 'Standard_Champ_0180',
                                },
                                {
                                    id: 'Standard_Champ_0007',
                                    type: 'text',
                                    zodLabel: 'postalCode',
                                    label: 'Code postal',
                                    order: 7,
                                    required: true,
                                    slug: 'Standard_Champ_0181',
                                },
                                {
                                    id: 'Standard_Champ_0008',
                                    type: 'text',
                                    zodLabel: 'city',
                                    label: 'Ville',
                                    order: 8,
                                    required: true,
                                    slug: 'Standard_Champ_0182',
                                },
                                {
                                    id: 'Standard_Champ_0009',
                                    type: 'text',
                                    zodLabel: 'country',
                                    label: 'Pays',
                                    order: 9,
                                    required: true,
                                    slug: 'Standard_Champ_0183',
                                },
                            ]
                        }

                    }

                })

                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_Edition_Prevoyance',
                        label: 'Edition des caisses de prévoyance',
                        slug: 'Standard_Formulaire_0030',
                        description: 'Edition des caisses de prévoyance',
                        isCreate: false,
                        isEdit: true,
                        processusId: 'Standard_0014',
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
                                    readOnly: true,
                                    disabled: true,
                                    order: 1,
                                    slug: 'Standard_Champ_0184',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    zodLabel: 'label',
                                    label: 'Libellé',
                                    required: true,
                                    minLenght: 9,
                                    maxLenght: 9,
                                    readOnly: true,
                                    disabled: true,
                                    placeholder: '123456789',
                                    order: 2,
                                    slug: 'Standard_Champ_0185',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    zodLabel: 'address1',
                                    label: 'Adresse',
                                    required: true,
                                    order: 3,
                                    slug: 'Standard_Champ_0186',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'text',
                                    zodLabel: 'address2',
                                    label: 'Complément d\'adresse',
                                    order: 4,
                                    slug: 'Standard_Champ_0187',
                                },
                                {
                                    id: 'Standard_Champ_0005',
                                    type: 'text',
                                    zodLabel: 'address3',
                                    label: 'Complément d\'adresse',
                                    order: 5,
                                    slug: 'Standard_Champ_0188',
                                },
                                {
                                    id: 'Standard_Champ_0006',
                                    type: 'text',
                                    zodLabel: 'address4',
                                    label: 'Complément d\'adresse',
                                    order: 6,
                                    slug: 'Standard_Champ_0189',
                                },
                                {
                                    id: 'Standard_Champ_0007',
                                    type: 'text',
                                    zodLabel: 'postalCode',
                                    label: 'Code postal',
                                    order: 7,
                                    required: true,
                                    slug: 'Standard_Champ_0190',
                                },
                                {
                                    id: 'Standard_Champ_0008',
                                    type: 'text',
                                    zodLabel: 'city',
                                    label: 'Ville',
                                    order: 8,
                                    required: true,
                                    slug: 'Standard_Champ_0191',
                                },
                                {
                                    id: 'Standard_Champ_0009',
                                    type: 'text',
                                    zodLabel: 'country',
                                    label: 'Pays',
                                    order: 9,
                                    required: true,
                                    slug: 'Standard_Champ_0192',
                                },
                            ]
                        }

                    }

                })


                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_Edition_Mutuelle',
                        label: 'Edition des caisses de mutuelle',
                        slug: 'Standard_Formulaire_0031',
                        description: 'Edition des caisses de mutuelle',
                        isCreate: false,
                        isEdit: true,
                        processusId: 'Standard_0015',
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
                                    readOnly: true,
                                    disabled: true,
                                    order: 1,
                                    slug: 'Standard_Champ_0193',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    zodLabel: 'label',
                                    label: 'Libellé',
                                    required: true,
                                    minLenght: 9,
                                    maxLenght: 9,
                                    readOnly: true,
                                    disabled: true,
                                    placeholder: '123456789',
                                    order: 2,
                                    slug: 'Standard_Champ_0194',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    zodLabel: 'address1',
                                    label: 'Adresse',
                                    required: true,
                                    order: 3,
                                    slug: 'Standard_Champ_0195',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'text',
                                    zodLabel: 'address2',
                                    label: 'Complément d\'adresse',
                                    order: 4,
                                    slug: 'Standard_Champ_0196',
                                },
                                {
                                    id: 'Standard_Champ_0005',
                                    type: 'text',
                                    zodLabel: 'address3',
                                    label: 'Complément d\'adresse',
                                    order: 5,
                                    slug: 'Standard_Champ_0197',
                                },
                                {
                                    id: 'Standard_Champ_0006',
                                    type: 'text',
                                    zodLabel: 'address4',
                                    label: 'Complément d\'adresse',
                                    order: 6,
                                    slug: 'Standard_Champ_0198',
                                },
                                {
                                    id: 'Standard_Champ_0007',
                                    type: 'text',
                                    zodLabel: 'postalCode',
                                    label: 'Code postal',
                                    order: 7,
                                    required: true,
                                    slug: 'Standard_Champ_0199',
                                },
                                {
                                    id: 'Standard_Champ_0008',
                                    type: 'text',
                                    zodLabel: 'city',
                                    label: 'Ville',
                                    order: 8,
                                    required: true,
                                    slug: 'Standard_Champ_0200',
                                },
                                {
                                    id: 'Standard_Champ_0009',
                                    type: 'text',
                                    zodLabel: 'country',
                                    label: 'Pays',
                                    order: 9,
                                    required: true,
                                    slug: 'Standard_Champ_0201',
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

export const formV0011 = new FormV0011("FormV0011", "Création formulaire caisse cotisation", 18, "FormV0010")

