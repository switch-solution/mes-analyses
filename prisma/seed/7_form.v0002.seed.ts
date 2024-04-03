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

class FormV0002 extends Seed {
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
                        id: 'Standard_Formulaire_Organisme_Protection_Sociale',
                        label: 'Création de l\'organisme de protection sociale',
                        slug: 'Standard_Formulaire_0011',
                        description: 'Création OPS',
                        processusId: 'Standard_0004',
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
                                    slug: 'Standard_Champ_0058',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'select',
                                    label: 'Type organisme',
                                    selectOption: "URSSAF;Retraite complémentaire;Prévoyance;Mutuelle;",
                                    zodLabel: 'type',
                                    placeholder: 'URSSAF',
                                    required: true,
                                    order: 2,
                                    slug: 'Standard_Champ_0059',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'select',
                                    label: 'Etablissement',
                                    selectTableSource: 'Project_Establishment',
                                    selectFieldSource: 'nic',
                                    zodLabel: 'nic',
                                    required: true,
                                    order: 2,
                                    slug: 'Standard_Champ_0060',
                                },

                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    zodLabel: 'label',
                                    required: true,
                                    label: 'Libellé',
                                    placeholder: 'Nom de la société',
                                    order: 3,
                                    slug: 'Standard_Champ_0061',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'text',
                                    zodLabel: 'address1',
                                    label: 'Adresse 1',
                                    placeholder: '1 rue de la Paix',
                                    order: 4,
                                    required: true,
                                    slug: 'Standard_Champ_0062',
                                },
                                {
                                    id: 'Standard_Champ_0005',
                                    type: 'text',
                                    zodLabel: 'address2',
                                    label: 'Adresse 2',
                                    placeholder: 'Batiment A',
                                    order: 5,
                                    slug: 'Standard_Champ_0063',
                                },
                                {
                                    id: 'Standard_Champ_0006',
                                    type: 'text',
                                    zodLabel: 'address3',
                                    label: 'Adresse 3',
                                    placeholder: 'Service cotisations',
                                    order: 6,
                                    slug: 'Standard_Champ_0064',
                                },
                                {
                                    id: 'Standard_Champ_0007',
                                    type: 'text',
                                    zodLabel: 'address4',
                                    label: 'Adresse 4',
                                    placeholder: 'Complémet d\'adresse',
                                    order: 7,
                                    slug: 'Standard_Champ_0065',
                                },
                                {
                                    id: 'Standard_Champ_0008',
                                    type: 'text',
                                    zodLabel: 'postalCode',
                                    label: 'Code postal',
                                    placeholder: '44000',
                                    minLenght: 5,
                                    maxLenght: 6,
                                    required: true,
                                    order: 8,
                                    slug: 'Standard_Champ_0066',
                                },
                                {
                                    id: 'Standard_Champ_0009',
                                    type: 'text',
                                    zodLabel: 'city',
                                    label: 'Ville',
                                    required: true,
                                    placeholder: 'Nantes',
                                    order: 9,
                                    slug: 'Standard_Champ_0067',
                                },
                                {
                                    id: 'Standard_Champ_0010',
                                    type: 'text',
                                    zodLabel: 'country',
                                    required: true,
                                    label: 'Pays',
                                    placeholder: 'France',
                                    order: 10,
                                    defaultValue: 'France',
                                    slug: 'Standard_Champ_0068',
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

export const formV0002 = new FormV0002("FORM_V0002", "Création de processus structure juridique", 7, "RATE_AT_V0001")

