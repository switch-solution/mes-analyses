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

class SettingV0003 extends Seed {
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
                const defaultSetting = [
                    {
                        id: 'Rubrique_Remuneration_Type',
                        label: 'Elément à saisir',
                        value: 'Elément à saisir'
                    },
                    {
                        id: 'Rubrique_Remuneration_Type',
                        label: 'Elément fixe',
                        value: 'Elément fixe'
                    },
                    {
                        id: 'Rubrique_Remuneration_Type',
                        label: 'Base rubrique',
                        value: 'Base rubrique'
                    },
                    {
                        id: 'Rubrique_Remuneration_Type',
                        label: 'Taux rubrique',
                        value: 'Taux rubrique'
                    },
                    {
                        id: 'Rubrique_Remuneration_Type',
                        label: 'Montant rubrique',
                        value: 'Montant rubrique'
                    },
                    {
                        id: 'Rubrique_Remuneration_Type',
                        label: 'Calcul de paie',
                        value: 'Calcul de paie'
                    },


                ]
                await prisma.default_Setting.createMany({
                    data: defaultSetting
                })
                await this.seedUpdateStatus("completed")
            }

        } catch (err) {
            console.error(err)
            await this.seedUpdateStatus("error")
        }


    }




}

export const settingV0003 = new SettingV0003("SETTING_V0003", "Paramétrage alimentation rubrique", 28, "FormV0015")

