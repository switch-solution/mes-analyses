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
                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "METHODE_CALCUL_ABSENCE",
                            label: "Methode 1",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {
                    },
                    create: {
                        id: "METHODE_CALCUL_ABSENCE",
                        label: "Methode 1",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Base horaire * taux horaire du salarié",
                        value: "Base * Taux horaire",
                        createdBy: "system"
                    }
                })
                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "METHODE_CALCUL_ABSENCE",
                            label: "Methode 2",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {

                    },
                    create: {
                        id: "METHODE_CALCUL_ABSENCE",
                        label: "Methode 2",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Base horaire * taux horaire du ouvrés du mois",
                        value: "Base * Taux horaire ouvrés",
                        createdBy: "system"
                    }
                })
                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "METHODE_CALCUL_ABSENCE",
                            label: "Methode 3",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {
                    },
                    create: {
                        id: "METHODE_CALCUL_ABSENCE",
                        label: "Methode 3",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Base horaire * taux horaire du ouvrables du mois",
                        value: "Base * Taux horaire ouvrables",
                        createdBy: "system"
                    }
                })
                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "METHODE_CALCUL_ABSENCE",
                            label: "Methode 4",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {
                    },
                    create: {
                        id: "METHODE_CALCUL_ABSENCE",
                        label: "Methode 4",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Taux journalier * nombre de jours ouvrés du mois",
                        value: "Taux journalier * nombre de jours ouvrés",
                        createdBy: "system"
                    }
                })
                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "METHODE_CALCUL_ABSENCE",
                            label: "Methode 5",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {
                    },
                    create: {
                        id: "METHODE_CALCUL_ABSENCE",
                        label: "Methode 5",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Taux journalier * nombre de jours ouvrables du mois",
                        value: "Taux journalier * nombre de jours ouvrables",
                        createdBy: "system"
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

export const settingV0003 = new SettingV0003("SETTING_V0003", "Paramétrages des calculs des absences", 37, "DSN_ABSENCE_V0001")

