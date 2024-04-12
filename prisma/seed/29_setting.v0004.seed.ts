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

class SettingV0004 extends Seed {
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
                        id: 'Forme_Juridique',
                        label: 'Entreprise individuelle',
                        value: 'Entreprise individuelle'
                    },
                    {
                        id: 'Forme_Juridique',
                        label: 'SARL',
                        value: 'Société à responsabilité limitée'
                    },
                    {
                        id: 'Forme_Juridique',
                        label: 'SAS',
                        value: 'Société par actions simplifiée'
                    },
                    {
                        id: 'Forme_Juridique',
                        label: 'SA',
                        value: 'Société anonyme'
                    },
                    {
                        id: 'Forme_Juridique',
                        label: 'SNC',
                        value: 'Société en nom collectif'
                    },
                    {
                        id: 'Forme_Juridique',
                        label: 'SELARL',
                        value: 'Société d\'exercice libéral à responsabilité limitée'
                    },
                    {
                        id: 'Forme_Juridique',
                        label: 'SELAFA',
                        value: 'Société d\'exercice libéral à forme anonyme'
                    },
                    {
                        id: 'Forme_Juridique',
                        label: 'SELAS',
                        value: 'Société d\'exercice libéral par actions simplifiée'
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

export const settingV0004 = new SettingV0004("SETTING_V0004", "Forme juridique", 29, "SETTING_V0003")

