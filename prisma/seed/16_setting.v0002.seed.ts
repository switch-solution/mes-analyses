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

class SettingV0002 extends Seed {
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

                await prisma.default_Setting.createMany({
                    data: [
                        {
                            id: 'TYPE_Rubrique',
                            label: 'Type de rubrique',
                        },
                        {
                            id: 'ALIMENTATION_Rubrique',
                            label: 'Alimentation  rubrique',
                        },

                    ]

                })

                await prisma.default_Setting_Value.createMany({
                    data: [
                        {
                            id: 'STD_010',
                            defaultSettingId: 'TYPE_Rubrique',
                            label: 'Rémunération',
                            value: 'Rémunération',
                        },
                        {
                            id: 'STD_011',
                            defaultSettingId: 'TYPE_Rubrique',
                            label: 'Base de cotisation',
                            value: 'Base de cotisation',
                        },
                        {
                            id: 'STD_012',
                            defaultSettingId: 'TYPE_Rubrique',
                            label: 'Cotisation',
                            value: 'Cotisation',
                        },
                        {
                            id: 'STD_013',
                            defaultSettingId: 'ALIMENTATION_Rubrique',
                            label: 'Elément à saisir',
                            value: 'Elément à saisir',
                        },
                        {
                            id: 'STD_014',
                            defaultSettingId: 'ALIMENTATION_Rubrique',
                            label: 'Elément fixe',
                            value: 'Elément fixe',
                        },
                        {
                            id: 'STD_015',
                            defaultSettingId: 'ALIMENTATION_Rubrique',
                            label: 'Base rubrique',
                            value: 'Base rubrique',
                        },
                        {
                            id: 'STD_016',
                            defaultSettingId: 'ALIMENTATION_Rubrique',
                            label: 'Montant rubrique',
                            value: 'Montant rubrique',
                        },
                        {
                            id: 'STD_017',
                            defaultSettingId: 'ALIMENTATION_Rubrique',
                            label: 'Calcul',
                            value: 'Calcul',
                        },

                    ]
                })
                await this.seedUpdateStatus("completed")
            }

        } catch (err) {
            console.error(err)
            await this.seedUpdateStatus("error")
        }


    }




}

export const settingV0002 = new SettingV0002("SETTING_V0002", "Paramétrage des rubriques", 16, "PAGE_V0003")

