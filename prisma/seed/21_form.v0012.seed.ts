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

class FormV0012 extends Seed {
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
                        id: 'Standard_Formulaire_Banque',
                        label: 'Création des banques',
                        slug: 'Standard_Formulaire_0032',
                        description: 'Création des banques',
                        isCreate: true,
                        isEdit: false,
                        processusId: 'Standard_0020',
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
                                    slug: 'Standard_Champ_0202',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    zodLabel: 'label',
                                    label: 'Libellé',
                                    required: true,
                                    order: 2,
                                    slug: 'Standard_Champ_0203',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'text',
                                    zodLabel: 'iban',
                                    label: 'IBAN',
                                    required: true,
                                    order: 3,
                                    slug: 'Standard_Champ_0204',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'text',
                                    zodLabel: 'bic',
                                    label: 'BIC',
                                    order: 4,
                                    slug: 'Standard_Champ_0205',
                                },

                            ]
                        }

                    }

                })

                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_Etablissement_Banque',
                        label: 'Association des établissements et des banques',
                        slug: 'Standard_Formulaire_0033',
                        description: 'Association des établissements et des banques',
                        isCreate: true,
                        isEdit: false,
                        processusId: 'Standard_0021',
                        processusVersion: 1,
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'select',
                                    label: 'Etablissement',
                                    zodLabel: 'nic',
                                    selectTableSource: 'Project_Establishment',
                                    selectFieldSource: 'nic',
                                    required: true,
                                    order: 1,
                                    slug: 'Standard_Champ_0206',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'select',
                                    zodLabel: 'iban',
                                    label: 'Banque',
                                    selectTableSource: 'Project_Bank',
                                    selectFieldSource: 'iban',
                                    placeholder: '123456789',
                                    order: 2,
                                    slug: 'Standard_Champ_0207',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'switch',
                                    zodLabel: 'salary',
                                    label: 'Banque des salaires',
                                    required: true,
                                    order: 3,
                                    slug: 'Standard_Champ_0208',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'switch',
                                    zodLabel: 'contribution',
                                    label: 'Banque des cotisations',
                                    order: 4,
                                    slug: 'Standard_Champ_0209',
                                },
                                {
                                    id: 'Standard_Champ_0005',
                                    type: 'switch',
                                    zodLabel: 'deposit',
                                    label: 'Banque des acomptes',
                                    order: 5,
                                    slug: 'Standard_Champ_0210',
                                },
                                {
                                    id: 'Standard_Champ_0006',
                                    type: 'switch',
                                    zodLabel: 'expense',
                                    label: 'Banque des frais professionnels',
                                    order: 6,
                                    slug: 'Standard_Champ_0211',
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

export const formV0012 = new FormV0012("FormV0012", "Création formulaire des banques", 21, "PROCESUS_V0002")

