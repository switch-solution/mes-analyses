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

class SettingV0001 extends Seed {
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
                        id: 'ABS_Décompte',
                        label: 'Décompte des absences',
                        value: 'Heures ouvrés'
                    },
                    {
                        id: 'ABS_Décompte',
                        label: 'Décompte des absences',
                        value: 'Heures ouvrables'
                    },
                    {
                        id: 'CP_Méthode',
                        label: 'Méthode de calcul des CP',
                        value: 'Jour ouvré'
                    },
                    {
                        id: 'CP_Méthode',
                        label: 'Méthode de calcul des CP',
                        value: 'Jour ouvrable'
                    },
                    {
                        id: 'CP_Valorisation',
                        label: 'Valorisation des CP',
                        value: 'Maintien de salaire'
                    },
                    {
                        id: 'CP_Valorisation',
                        label: 'Valorisation des CP',
                        value: '10ème'
                    },
                    {
                        id: 'CP_arrondi',
                        label: 'Méthode d\'arrondi des CP',
                        value: 'Entier supérieur'
                    },
                    {
                        id: 'CP_arrondi',
                        label: 'Méthode d\'arrondi des CP',
                        value: 'Entier inférieur'
                    },
                    {
                        id: 'ABS_Méthode',
                        label: 'Méthode valorisation des absences',
                        value: 'Base*Taux'
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

export const settingV0001 = new SettingV0001("SETTING_V0001", "Paramétrage de base de l'application", 1, "")

