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

class FormV0008 extends Seed {
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
                        id: 'Standard_Formulaire_AGIRC_ARRCO',
                        label: 'Création de l\'organisme AGIRC ARRCO',
                        slug: 'Standard_Formulaire_0016',
                        description: 'Création AGIRC ARRCO',
                        isCreate: true,
                        isEdit: false,
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
                                    order: 1,
                                    slug: 'Standard_Champ_0098',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'select',
                                    selectTableSource: 'DSN_OPS',
                                    selectFieldSource: 'AGIRC_ARRCO',
                                    label: 'Importer votre caisse AGIRC ARRCO',
                                    zodLabel: 'ops',
                                    required: true,
                                    order: 2,
                                    slug: 'Standard_Champ_0099',
                                },
                            ]
                        }

                    }

                })
                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_Prevoyance',
                        label: 'Création de l\'organisme prévoyance',
                        slug: 'Standard_Formulaire_0017',
                        description: 'Création prévoyance',
                        isCreate: true,
                        isEdit: false,
                        processusVersion: 1,
                        processusId: 'Standard_0014',
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
                                    slug: 'Standard_Champ_0108',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'select',
                                    selectTableSource: 'DSN_OPS',
                                    selectFieldSource: 'Prévoyance',
                                    label: 'Importer votre prévoyance',
                                    zodLabel: 'ops',
                                    required: true,
                                    order: 2,
                                    slug: 'Standard_Champ_0109',
                                },
                            ]
                        }

                    }

                })
                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_Mutuelle',
                        label: 'Création de l\'organisme mutuelle',
                        slug: 'Standard_Formulaire_0018',
                        description: 'Création mutuelle',
                        isCreate: true,
                        isEdit: false,
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
                                    order: 1,
                                    slug: 'Standard_Champ_0118',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'select',
                                    selectTableSource: 'DSN_OPS',
                                    selectFieldSource: 'Mutuelle',
                                    label: 'Importer votre mutuelle',
                                    zodLabel: 'ops',
                                    required: true,
                                    order: 2,
                                    slug: 'Standard_Champ_0119',
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

export const formV0008 = new FormV0008("FormV0008", "Création formulaire caisses", 15, "FORM_V0007")

