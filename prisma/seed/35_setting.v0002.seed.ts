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
                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "NIVEAU_SUPPLEMENTAIRE_CONSTANTE_1",
                            label: "Niveau supplémentaire 1 des constantes",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {

                    },
                    create: {
                        id: "NIVEAU_SUPPLEMENTAIRE_CONSTANTE_1",
                        label: "Niveau supplémentaire 1 des constantes",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Environnement de l'application",
                        value: "Société",
                        createdBy: "system"
                    }
                })

                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "NIVEAU_SUPPLEMENTAIRE_CONSTANTE_2",
                            label: "Niveau supplémentaire 2 des constantes",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {
                    },
                    create: {
                        id: "NIVEAU_SUPPLEMENTAIRE_CONSTANTE_2",
                        label: "Niveau supplémentaire 2 des constantes",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Environnement de l'application",
                        value: "Société",
                        createdBy: "system"
                    }
                })

                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "NIVEAU_SUPPLEMENTAIRE_CONSTANTE_3",
                            label: "Niveau supplémentaire 3 des constantes",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {
                    },
                    create: {
                        id: "NIVEAU_SUPPLEMENTAIRE_CONSTANTE_3",
                        label: "Niveau supplémentaire 3 des constantes",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Environnement de l'application",
                        value: "Etablissement",
                        createdBy: "system"
                    }
                })
                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "NIVEAU_SUPPLEMENTAIRE_CONSTANTE_4",
                            label: "Niveau supplémentaire 4 des constantes",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {
                    },
                    create: {
                        id: "NIVEAU_SUPPLEMENTAIRE_CONSTANTE_4",
                        label: "Niveau supplémentaire 4 des constantes",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Environnement de l'application",
                        value: "Population",
                        createdBy: "system"
                    }
                })

                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "NIVEAU_SUPPLEMENTAIRE_CONSTANTE_5",
                            label: "Niveau supplémentaire 5 des constantes",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {

                    },
                    create: {
                        id: "NIVEAU_SUPPLEMENTAIRE_CONSTANTE_5",
                        label: "Niveau supplémentaire 5 des constantes",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Environnement de l'application",
                        value: "Libre",
                        createdBy: "system"
                    }
                })

                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "NIVEAU_SUPPLEMENTAIRE_CONSTANTE_6",
                            label: "Niveau supplémentaire 6 des constantes",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {

                    },
                    create: {
                        id: "NIVEAU_SUPPLEMENTAIRE_CONSTANTE_6",
                        label: "Niveau supplémentaire 6 des constantes",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Environnement de l'application",
                        value: "Libre",
                        createdBy: "system"
                    }
                })

                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "NIVEAU_SUPPLEMENTAIRE_CONSTANTE_7",
                            label: "Niveau supplémentaire 7 des constantes",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {
                    },
                    create: {
                        id: "NIVEAU_SUPPLEMENTAIRE_CONSTANTE_7",
                        label: "Niveau supplémentaire 7 des constantes",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Environnement de l'application",
                        value: "Libre",
                        createdBy: "system"
                    }
                })

                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "NIVEAU_SUPPLEMENTAIRE_CONSTANTE_8",
                            label: "Niveau supplémentaire 8 des constantes",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {},
                    create: {
                        id: "NIVEAU_SUPPLEMENTAIRE_CONSTANTE_8",
                        label: "Niveau supplémentaire 8 des constantes",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Environnement de l'application",
                        value: "Libre",
                        createdBy: "system"
                    }
                })


                //Type de rubrique

                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "RUBRIQUE_TYPE",
                            label: "Rémunération",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {},
                    create: {
                        id: "RUBRIQUE_TYPE",
                        label: "Rémunération",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Type de rubrique",
                        value: "Rémunération",
                        createdBy: "system"
                    }
                })

                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "RUBRIQUE_TYPE",
                            label: "Rémunération",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {},
                    create: {
                        id: "RUBRIQUE_TYPE",
                        label: "Primes",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Type de rubrique",
                        value: "Primes",
                        createdBy: "system"
                    }
                })
                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "RUBRIQUE_TYPE",
                            label: "URSSAF",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {},
                    create: {
                        id: "RUBRIQUE_TYPE",
                        label: "URSSAF",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Type de rubrique",
                        value: "URSSAF",
                        createdBy: "system"
                    }
                })
                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "RUBRIQUE_TYPE",
                            label: "Retraite",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {},
                    create: {
                        id: "RUBRIQUE_TYPE",
                        label: "Retraite",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Type de rubrique",
                        value: "URSSAF",
                        createdBy: "system"
                    }
                })
                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "RUBRIQUE_TYPE",
                            label: "Prévoyance",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {},
                    create: {
                        id: "RUBRIQUE_TYPE",
                        label: "Prévoyance",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Type de rubrique",
                        value: "URSSAF",
                        createdBy: "system"
                    }
                })
                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "RUBRIQUE_TYPE",
                            label: "Mutuelle",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {},
                    create: {
                        id: "RUBRIQUE_TYPE",
                        label: "Mutuelle",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Type de rubrique",
                        value: "URSSAF",
                        createdBy: "system"
                    }
                })
                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "RUBRIQUE_TYPE",
                            label: "Retraite supplémentaire",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {},
                    create: {
                        id: "RUBRIQUE_TYPE",
                        label: "Retraite supplémentaire",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Type de rubrique",
                        value: "URSSAF",
                        createdBy: "system"
                    }
                })
                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "RUBRIQUE_TYPE",
                            label: "Rubrique de net",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {},
                    create: {
                        id: "RUBRIQUE_TYPE",
                        label: "Rubrique de net",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        description: "Type de rubrique",
                        value: "URSSAF",
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

export const settingV0002 = new SettingV0002("SETTING_V0002", "Paramétrage des niveaux des constantes et des types de rubriques", 35, "TEXTAREA_V0001")

