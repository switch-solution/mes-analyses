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

class FORM_V0023 extends Seed {
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
                        id: 'Standard_Formulaire_Edition_Absence',
                        label: 'Edition des absences',
                        isCreate: false,
                        isEdit: true,
                        slug: 'Standard_Formulaire_0044',
                        description: 'Edition des absences',
                        processusId: 'Standard_0017',
                        processusVersion: 1,
                        Form_Input: {
                            create: [
                                {
                                    id: 'Standard_Champ_0001',
                                    type: 'text',
                                    label: 'Code absence',
                                    zodLabel: 'id',
                                    required: true,
                                    disabled: true,
                                    readOnly: true,
                                    order: 1,
                                    slug: 'Standard_Champ_0266',
                                },
                                {
                                    id: 'Standard_Champ_0002',
                                    type: 'text',
                                    label: 'Libellé',
                                    zodLabel: 'label',
                                    order: 2,
                                    slug: 'Standard_Champ_0267',
                                },
                                {
                                    id: 'Standard_Champ_0003',
                                    type: 'switch',
                                    label: 'Absence sécurité sociale',
                                    zodLabel: 'isSocialSecurity',
                                    order: 3,
                                    slug: 'Standard_Champ_0268',
                                },
                                {
                                    id: 'Standard_Champ_0004',
                                    type: 'select',
                                    label: 'Méthode de calcul',
                                    zodLabel: 'method',
                                    selectTableSource: 'Software_Setting',
                                    selectFieldSource: 'ABS_Méthode',
                                    order: 4,
                                    slug: 'Standard_Champ_0269',
                                },
                                {
                                    id: 'Standard_Champ_0005',
                                    type: 'select',
                                    label: 'Décompte',
                                    zodLabel: 'settlement',
                                    selectTableSource: 'Software_Setting',
                                    selectFieldSource: 'ABS_Décompte',
                                    order: 5,
                                    slug: 'Standard_Champ_0270',
                                },
                                {
                                    id: 'Standard_Champ_0006',
                                    type: 'select',
                                    label: 'Code absence DSN',
                                    zodLabel: 'dsnId',
                                    selectTableSource: 'Dsn_Absence',
                                    selectFieldSource: 'id',
                                    order: 6,
                                    slug: 'Standard_Champ_0271',
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

export const formV0023 = new FORM_V0023("FormV0023", "Formulaire édition des absences", 43, "FormV0022")

