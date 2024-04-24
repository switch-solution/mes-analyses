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

class FORM_V0022 extends Seed {
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
                        id: 'Standard_Formulaire_Edition_CP',
                        label: 'Edition de formulaire CP',
                        slug: 'Standard_Formulaire_0043',
                        isCreate: false,
                        isEdit: true,
                        description: 'Création des CP',
                        processusId: 'Standard_0016',
                        processusVersion: 1,
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'text',
                                    zodLabel: 'id',
                                    label: 'Code interne',
                                    required: true,
                                    placeholder: '9999',
                                    disabled: true,
                                    readOnly: true,
                                    order: 1,
                                    slug: 'Standard_Champ_0257',
                                },
                                {
                                    id: 'Standard_Champ_0008',
                                    type: 'text',
                                    zodLabel: 'label',
                                    label: 'Libellé',
                                    required: true,
                                    placeholder: '9999',
                                    order: 2,
                                    slug: 'Standard_Champ_0258',
                                },
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'select',
                                    label: 'Méthode',
                                    selectTableSource: 'Software_Setting',
                                    selectFieldSource: 'CP_Méthode',
                                    zodLabel: 'method',
                                    required: true,
                                    order: 3,
                                    slug: 'Standard_Champ_0259',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'select',
                                    label: 'Valorisation',
                                    selectTableSource: 'Software_Setting',
                                    selectFieldSource: 'CP_Valorisation',
                                    zodLabel: 'valuation',
                                    required: true,
                                    order: 4,
                                    slug: 'Standard_Champ_0260',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'select',
                                    label: 'Méthode d\'arrondi',
                                    selectTableSource: 'Software_Setting',
                                    selectFieldSource: 'CP_arrondi',
                                    zodLabel: 'roudingMethod',
                                    required: true,
                                    order: 5,
                                    slug: 'Standard_Champ_0261',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'select',
                                    label: 'Valorisation en cas de départ',
                                    selectTableSource: 'Software_Setting',
                                    selectFieldSource: 'CP_Valorisation',
                                    zodLabel: 'roudingMethodLeave',
                                    required: true,
                                    order: 6,
                                    slug: 'Standard_Champ_0262',
                                },
                                {
                                    id: 'Standard_Champ_0005',
                                    type: 'select',
                                    selectTableSource: 'Project_Table_Seniority',
                                    selectFieldSource: 'id',
                                    label: 'Table ancienneté',
                                    zodLabel: 'tableSeniority',
                                    required: true,
                                    order: 7,
                                    slug: 'Standard_Champ_0263',
                                },
                                {
                                    id: 'Standard_Champ_0006',
                                    type: 'select',
                                    label: 'Mois de cloture',
                                    zodLabel: 'periodEndDate',
                                    required: true,
                                    selectOption: 'Janvier;Février;Mars;Avril;Mai;Juin;Juillet;Août;Septembre;Octobre;Novembre;Décembre',
                                    defaultValue: 'Juin',
                                    order: 8,
                                    slug: 'Standard_Champ_0264',
                                },
                                {
                                    id: 'Standard_Champ_0007',
                                    type: 'select',
                                    label: 'Valorisation en cas de départ',
                                    selectOption: '10ème;maintien',
                                    zodLabel: 'valuationLeave',
                                    required: true,
                                    order: 9,
                                    slug: 'Standard_Champ_0265',
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

export const formV0022 = new FORM_V0022("FormV0022", "Formulaire édition congés payés", 42, "FormV0021")

