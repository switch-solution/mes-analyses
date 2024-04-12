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

class FormV0015 extends Seed {
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
                        id: 'Standard_Formulaire_Remuneration',
                        label: 'Création des rubrique de rémunération',
                        slug: 'Standard_Formulaire_0038',
                        description: 'Création des rubriques de rémunération',
                        isCreate: true,
                        isEdit: false,
                        processusId: 'Standard_0024',
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
                                    slug: 'Standard_Champ_0228',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    zodLabel: 'label',
                                    label: 'Libellé',
                                    required: true,
                                    placeholder: 'Salaire de base',
                                    order: 2,
                                    slug: 'Standard_Champ_0229',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    zodLabel: 'description',
                                    label: 'Libellé',
                                    placeholder: 'Rubrique de salaire de base des ouvriers',
                                    order: 3,
                                    slug: 'Standard_Champ_0230',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'select',
                                    selectTableSource: 'Software_Setting',
                                    selectFieldSource: 'Rubrique_Remuneration_Type',
                                    zodLabel: 'baseType',
                                    label: 'Méthode alimentation de la base',
                                    order: 4,
                                    slug: 'Standard_Champ_0231',
                                },
                                {
                                    id: 'Standard_Champ_0005',
                                    type: 'text',
                                    zodLabel: 'base',
                                    label: 'Alimentation de la base',
                                    order: 5,
                                    slug: 'Standard_Champ_0232',
                                },
                                {
                                    id: 'Standard_Champ_0006',
                                    type: 'select',
                                    selectTableSource: 'Software_Setting',
                                    selectFieldSource: 'Rubrique_Remuneration_Type',
                                    zodLabel: 'rateType',
                                    label: 'Méthode alimentation du taux',
                                    order: 6,
                                    slug: 'Standard_Champ_0233',
                                },
                                {
                                    id: 'Standard_Champ_0007',
                                    type: 'text',
                                    zodLabel: 'rate',
                                    label: 'Alimentation du taux',
                                    order: 7,
                                    slug: 'Standard_Champ_0234',
                                },
                                {
                                    id: 'Standard_Champ_0008',
                                    type: 'select',
                                    selectTableSource: 'Software_Setting',
                                    selectFieldSource: 'Rubrique_Remuneration_Type',
                                    zodLabel: 'amoutType',
                                    label: 'Méthode alimentation du montant',
                                    order: 8,
                                    slug: 'Standard_Champ_0235',
                                },
                                {
                                    id: 'Standard_Champ_0009',
                                    type: 'text',
                                    zodLabel: 'amount',
                                    label: 'Alimentation du taux',
                                    order: 9,
                                    slug: 'Standard_Champ_0236',
                                },

                            ]
                        }

                    }

                })
                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_Edition_Remuneration',
                        label: 'Edition des rubrique de rémunération',
                        slug: 'Standard_Formulaire_0039',
                        description: 'Edition des rubriques de rémunération',
                        isCreate: false,
                        isEdit: true,
                        processusId: 'Standard_0024',
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
                                    slug: 'Standard_Champ_0237',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    zodLabel: 'label',
                                    label: 'Libellé',
                                    required: true,
                                    placeholder: 'Salaire de base',
                                    order: 2,
                                    slug: 'Standard_Champ_0238',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    zodLabel: 'description',
                                    label: 'Description',
                                    placeholder: 'Rubrique de salaire de base des ouvriers',
                                    order: 3,
                                    slug: 'Standard_Champ_0239',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'select',
                                    selectTableSource: 'Software_Setting',
                                    selectFieldSource: 'Rubrique_Remuneration_Type',
                                    zodLabel: 'baseType',
                                    label: 'Méthode alimentation de la base',
                                    order: 4,
                                    slug: 'Standard_Champ_0240',
                                },
                                {
                                    id: 'Standard_Champ_0005',
                                    type: 'text',
                                    zodLabel: 'base',
                                    label: 'Alimentation de la base',
                                    order: 5,
                                    slug: 'Standard_Champ_0241',
                                },
                                {
                                    id: 'Standard_Champ_0006',
                                    type: 'select',
                                    selectTableSource: 'Software_Setting',
                                    selectFieldSource: 'Rubrique_Remuneration_Type',
                                    zodLabel: 'rateType',
                                    label: 'Méthode alimentation du taux',
                                    order: 6,
                                    slug: 'Standard_Champ_0242',
                                },
                                {
                                    id: 'Standard_Champ_0007',
                                    type: 'text',
                                    zodLabel: 'rate',
                                    label: 'Alimentation du taux',
                                    order: 7,
                                    slug: 'Standard_Champ_0243',
                                },
                                {
                                    id: 'Standard_Champ_0008',
                                    type: 'select',
                                    selectTableSource: 'Software_Setting',
                                    selectFieldSource: 'Rubrique_Remuneration_Type',
                                    zodLabel: 'amoutType',
                                    label: 'Méthode alimentation du montant',
                                    order: 8,
                                    slug: 'Standard_Champ_0244',
                                },
                                {
                                    id: 'Standard_Champ_0009',
                                    type: 'text',
                                    zodLabel: 'amount',
                                    label: 'Alimentation du taux',
                                    order: 9,
                                    slug: 'Standard_Champ_0245',
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

export const formV0015 = new FormV0015("FormV0015", "Création formulaire rubriques rémunérations", 27, "PROCESUS_V0004")

