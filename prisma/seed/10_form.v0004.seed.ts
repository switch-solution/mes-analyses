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

class FORM_V0004 extends Seed {
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
                await prisma.processus.create({
                    data: {
                        id: 'Standard_0016',
                        label: 'Congés payés',
                        theme: 'Congés payés',
                        slug: 'Standard_Processus_CP',
                        order: 16,
                        version: 1
                    }
                })

                await prisma.form.create({
                    data: {
                        id: 'Standard_Formulaire_CP',
                        label: 'Création de formulaire CP',
                        slug: 'Standard_Formulaire_0012',
                        isCreate: true,
                        isEdit: false,
                        description: 'Création des CP',
                        processusId: 'Standard_0016',
                        processusVersion: 1,
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'select',
                                    label: 'Méthode',
                                    selectTableSource: 'Software_Setting',
                                    selectFieldSource: 'CP_Méthode',
                                    zodLabel: 'method',
                                    required: true,
                                    order: 1,
                                    slug: 'Standard_Champ_0072',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'select',
                                    label: 'Valorisation',
                                    selectTableSource: 'Software_Setting',
                                    selectFieldSource: 'CP_Valorisation',
                                    zodLabel: 'valuation',
                                    required: true,
                                    order: 2,
                                    slug: 'Standard_Champ_0073',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'select',
                                    label: 'Méthode d\'arrondi',
                                    selectTableSource: 'Software_Setting',
                                    selectFieldSource: 'CP_arrondi',
                                    zodLabel: 'roudingMethod',
                                    required: true,
                                    order: 3,
                                    slug: 'Standard_Champ_0074',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'select',
                                    label: 'Valorisation en cas de départ',
                                    selectTableSource: 'Software_Setting',
                                    selectFieldSource: 'CP_Valorisation',
                                    zodLabel: 'roudingMethod',
                                    required: true,
                                    order: 4,
                                    slug: 'Standard_Champ_0075',
                                },
                                {
                                    id: 'Standard_Champ_0005',
                                    type: 'select',
                                    selectTableSource: 'Project_Table_Seniority',
                                    selectFieldSource: 'id',
                                    label: 'Table ancienneté',
                                    zodLabel: 'tableSeniority',
                                    required: true,
                                    order: 5,
                                    slug: 'Standard_Champ_0076',
                                },
                                {
                                    id: 'Standard_Champ_0006',
                                    type: 'select',
                                    label: 'Mois de cloture',
                                    zodLabel: 'periodEndDate',
                                    required: true,
                                    selectOption: 'Janvier;Février;Mars;Avril;Mai;Juin;Juillet;Août;Septembre;Octobre;Novembre;Décembre',
                                    defaultValue: 'Juin',
                                    order: 6,
                                    slug: 'Standard_Champ_0077',
                                },
                                {
                                    id: 'Standard_Champ_0007',
                                    type: 'select',
                                    label: 'Valorisation en cas de départ',
                                    selectOption: '10ème;maintien',
                                    zodLabel: 'valuationLeave',
                                    required: true,
                                    order: 7,
                                    slug: 'Standard_Champ_0079',
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

export const formV0004 = new FORM_V0004("FORM_V0004", "Formulaire congés payés", 10, "FORM_V0003")

