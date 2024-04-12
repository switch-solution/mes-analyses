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
                const defaultSetting = [
                    {
                        id: 'Zone_Libre',
                        label: 'Texte',
                        value: 'Texte'
                    },
                    {
                        id: 'Zone_Libre',
                        label: 'Numérique',
                        value: 'Numérique'
                    },
                    {
                        id: 'Zone_Libre',
                        label: 'Date',
                        value: 'Date'
                    },
                    {
                        id: 'Zone_Libre',
                        label: 'Liste déroulante',
                        value: 'Liste déroulante'
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

export const settingV0002 = new SettingV0002("SETTING_V0002", "Paramétrage zone libre", 25, "FormV0014")

