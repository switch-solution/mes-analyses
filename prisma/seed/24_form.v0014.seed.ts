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

class FormV0014 extends Seed {
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
                        id: 'Standard_Formulaire_Zone_Libre',
                        label: 'Création des zones libres',
                        slug: 'Standard_Formulaire_0036',
                        description: 'Création des zones libres',
                        isCreate: true,
                        isEdit: false,
                        processusId: 'Standard_0022',
                        processusVersion: 1,
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'select',
                                    label: 'Type de zone libre',
                                    zodLabel: 'type',
                                    required: true,
                                    selectTableSource: 'Software_Setting',
                                    selectFieldSource: 'Zone_Libre',
                                    order: 1,
                                    slug: 'Standard_Champ_0222',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    label: 'Code interne',
                                    zodLabel: 'id',
                                    placeholder: '0001',
                                    required: true,
                                    order: 2,
                                    slug: 'Standard_Champ_0223',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    zodLabel: 'label',
                                    label: 'Libellé',
                                    required: true,
                                    order: 3,
                                    slug: 'Standard_Champ_0224',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'text',
                                    zodLabel: 'description',
                                    label: 'Description',
                                    order: 4,
                                    slug: 'Standard_Champ_0225',
                                },

                            ]
                        }

                    }

                })

                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_Edition_Zone_Libre',
                        label: 'Association des établissements et des zones libres',
                        slug: 'Standard_Formulaire_0037',
                        description: 'Association des établissements et des zones libres',
                        isCreate: true,
                        isEdit: false,
                        processusId: 'Standard_0023',
                        processusVersion: 1,
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'select',
                                    label: 'Type de zone libre',
                                    zodLabel: 'zoneId',
                                    required: true,
                                    selectTableSource: 'Project_Free_Zone',
                                    selectFieldSource: 'id',
                                    order: 1,
                                    slug: 'Standard_Champ_0226',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'select',
                                    label: 'Code société',
                                    selectTableSource: 'Project_Society',
                                    selectFieldSource: 'siren',
                                    zodLabel: 'societyId',
                                    required: true,
                                    order: 2,
                                    slug: 'Standard_Champ_0227',
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

export const formV0014 = new FormV0014("FormV0014", "Création formulaire zones libres", 24, "PROCESUS_V0003")

