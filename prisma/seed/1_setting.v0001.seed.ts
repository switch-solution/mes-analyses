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
                await prisma.default_Setting.createMany({
                    data: [
                        {
                            id: 'ABS_Décompte',
                            label: 'Décompte des absences',
                        },
                        {
                            id: 'CP_Méthode',
                            label: 'Méthode de calcul des CP',
                        },
                        {
                            id: 'CP_Valorisation',
                            label: 'Valorisation des CP',
                        },
                        {
                            id: 'CP_arrondi',
                            label: 'Méthode d\'arrondi des CP',
                        },
                        {
                            id: 'ABS_Méthode',
                            label: 'Méthode de calcul des absences',
                        },

                    ]
                })
                await prisma.default_Setting_Value.createMany({
                    data: [
                        {
                            id: 'STD_001',
                            defaultSettingId: 'ABS_Décompte',
                            label: 'Heures ouvrés',
                            value: 'Heures ouvrés'
                        },
                        {
                            id: 'STD_002',
                            defaultSettingId: 'ABS_Décompte',
                            label: 'Heures ouvrables',
                            value: 'Heures ouvrables'
                        },
                        {
                            id: 'STD_003',
                            defaultSettingId: 'CP_Méthode',
                            label: 'Jour ouvré',
                            value: 'Jour ouvré'
                        },
                        {
                            id: 'STD_004',
                            defaultSettingId: 'CP_Méthode',
                            label: 'Jour ouvrable',
                            value: 'Jour ouvrable'
                        },
                        {
                            id: 'STD_005',
                            defaultSettingId: 'CP_Valorisation',
                            label: 'Maintien de salaire',
                            value: 'Maintien de salaire'
                        },
                        {
                            id: 'STD_006',
                            defaultSettingId: 'CP_Valorisation',
                            label: '10ème',
                            value: '10ème'
                        },
                        {
                            id: 'STD_007',
                            defaultSettingId: 'CP_arrondi',
                            label: 'Entier supérieur',
                            value: 'Entier supérieur'
                        },
                        {
                            id: 'STD_008',
                            defaultSettingId: 'CP_arrondi',
                            label: 'Entier inférieur',
                            value: 'Entier inférieur'
                        },
                        {
                            id: 'STD_009',
                            defaultSettingId: 'ABS_Méthode',
                            label: 'Base*Taux',
                            value: 'Base*Taux'
                        },

                    ],

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

