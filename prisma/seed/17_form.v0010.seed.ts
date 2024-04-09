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

class FormV0010 extends Seed {
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
                        id: 'Standard_Formulaire_Edition_URSSAF',
                        label: 'Edition de société',
                        slug: 'Standard_Formulaire_0028',
                        description: 'Edition URSSAF',
                        isCreate: false,
                        isEdit: true,
                        processusId: 'Standard_0004',
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
                                    slug: 'Standard_Champ_0166',
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
                                    slug: 'Standard_Champ_0167',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    zodLabel: 'address1',
                                    label: 'Adresse',
                                    required: true,
                                    order: 3,
                                    slug: 'Standard_Champ_0168',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'text',
                                    zodLabel: 'address2',
                                    label: 'Complément d\'adresse',
                                    order: 4,
                                    slug: 'Standard_Champ_0169',
                                },
                                {
                                    id: 'Standard_Champ_0005',
                                    type: 'text',
                                    zodLabel: 'address3',
                                    label: 'Complément d\'adresse',
                                    order: 5,
                                    slug: 'Standard_Champ_0170',
                                },
                                {
                                    id: 'Standard_Champ_0006',
                                    type: 'text',
                                    zodLabel: 'address4',
                                    label: 'Complément d\'adresse',
                                    order: 6,
                                    slug: 'Standard_Champ_0171',
                                },
                                {
                                    id: 'Standard_Champ_0007',
                                    type: 'text',
                                    zodLabel: 'postalCode',
                                    label: 'Code postal',
                                    order: 7,
                                    required: true,
                                    slug: 'Standard_Champ_0172',
                                },
                                {
                                    id: 'Standard_Champ_0008',
                                    type: 'text',
                                    zodLabel: 'city',
                                    label: 'Ville',
                                    order: 8,
                                    required: true,
                                    slug: 'Standard_Champ_0173',
                                },
                                {
                                    id: 'Standard_Champ_0009',
                                    type: 'text',
                                    zodLabel: 'country',
                                    label: 'Pays',
                                    order: 9,
                                    required: true,
                                    slug: 'Standard_Champ_0174',
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

export const formV0010 = new FormV0010("FormV0010", "Création formulaire d'édition URSSAF", 17, "FormV0009")

