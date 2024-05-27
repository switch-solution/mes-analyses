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

                await prisma.default_Setting.createMany({
                    data: [
                        {
                            id: 'REFERENTIEL',
                            label: 'Référentiel',
                        },
                    ]

                })

                await prisma.default_Setting_Value.createMany({
                    data: [
                        {
                            id: 'STD_018',
                            defaultSettingId: 'REFERENTIEL',
                            label: 'Rubrique de paie',
                            value: 'Rubrique de paie',
                        },
                        {
                            id: 'STD_019',
                            defaultSettingId: 'REFERENTIEL',
                            label: 'Profil de paie',
                            value: 'Profil de paie',
                        },
                        {
                            id: 'STD_020',
                            defaultSettingId: 'REFERENTIEL',
                            label: 'Profil de paie',
                            value: 'Profil de paie',
                        },
                        {
                            id: 'STD_021',
                            defaultSettingId: 'REFERENTIEL',
                            label: 'Compteurs',
                            value: 'Compteurs',
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

export const settingV0003 = new SettingV0003("SETTING_V0003", "Référentiel", 18, "FORM_V0001")

