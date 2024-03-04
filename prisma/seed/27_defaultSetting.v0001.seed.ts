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

class DefaultSettingV0001 extends Seed {
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
                await prisma.default_Setting.upsert({
                    where: {
                        id_label: {
                            id: "Nature_Rubrique",
                            label: "Rémunération"
                        }
                    },
                    update: {},
                    create: {
                        id: "Nature_Rubrique",
                        label: "Rémunération",
                        description: "Nature de la rubrique de rémunération",
                        value: "Rémunération",
                        createdBy: "system"
                    }

                })
                await prisma.default_Setting.upsert({
                    where: {
                        id_label: {
                            id: "Nature_Rubrique",
                            label: "Cotisation"
                        }
                    },
                    update: {},
                    create: {
                        id: "Nature_Rubrique",
                        label: "Cotisation",
                        description: "Nature de la rubrique de cotisation",
                        value: "Cotisation",
                        createdBy: "system"
                    }

                })
                await prisma.default_Setting.upsert({
                    where: {
                        id_label: {
                            id: "Nature_Rubrique",
                            label: "Base_cotisation"
                        }
                    },
                    update: {},
                    create: {
                        id: "Nature_Rubrique",
                        label: "Base_cotisation",
                        description: "Nature de la rubrique de cotisation",
                        value: "Base cotisation",
                        createdBy: "system"
                    }

                })
                await prisma.default_Setting.upsert({
                    where: {
                        id_label: {
                            id: "Nature_Rubrique",
                            label: "Base cotisation"
                        }
                    },
                    update: {},
                    create: {
                        id: "Nature_Rubrique",
                        label: "Base cotisation",
                        description: "Nature de la rubrique de cotisation",
                        value: "Base cotisation",
                        createdBy: "system"
                    }

                })
                await prisma.default_Setting.upsert({
                    where: {
                        id_label: {
                            id: "Type_Rubrique",
                            label: "Salaire de base"
                        }
                    },
                    update: {},
                    create: {
                        id: "Type_Rubrique",
                        label: "Salaire de base",
                        description: "Type de la rubrique",
                        value: "Rémunération",
                        createdBy: "system"
                    }

                })
                await prisma.default_Setting.upsert({
                    where: {
                        id_label: {
                            id: "Type_Rubrique",
                            label: "Primes"
                        }
                    },
                    update: {},
                    create: {
                        id: "Type_Rubrique",
                        label: "Primes",
                        description: "Type de la rubrique",
                        value: "Primes",
                        createdBy: "system"
                    }

                })
                await prisma.default_Setting.upsert({
                    where: {
                        id_label: {
                            id: "Type_Rubrique",
                            label: "URSSAF"
                        }
                    },
                    update: {},
                    create: {
                        id: "Type_Rubrique",
                        label: "URSSAF",
                        description: "Type de la rubrique",
                        value: "URSSAF",
                        createdBy: "system"
                    }

                })
                await prisma.default_Setting.upsert({
                    where: {
                        id_label: {
                            id: "Type_Rubrique",
                            label: "URSSAF"
                        }
                    },
                    update: {},
                    create: {
                        id: "Type_Rubrique",
                        label: "URSSAF",
                        description: "Type de la rubrique",
                        value: "URSSAF",
                        createdBy: "system"
                    }

                })
                await prisma.default_Setting.upsert({
                    where: {
                        id_label: {
                            id: "Type_Rubrique",
                            label: "Retraite"
                        }
                    },
                    update: {},
                    create: {
                        id: "Type_Rubrique",
                        label: "Retraite",
                        description: "Type de la rubrique",
                        value: "Retraite",
                        createdBy: "system"
                    }

                })
                await prisma.default_Setting.upsert({
                    where: {
                        id_label: {
                            id: "Type_Rubrique",
                            label: "Prévoyance"
                        }
                    },
                    update: {},
                    create: {
                        id: "Type_Rubrique",
                        label: "Prévoyance",
                        description: "Type de la rubrique",
                        value: "Prévoyance",
                        createdBy: "system"
                    }

                })
                await prisma.default_Setting.upsert({
                    where: {
                        id_label: {
                            id: "Type_Rubrique",
                            label: "Mutuelle"
                        }
                    },
                    update: {},
                    create: {
                        id: "Type_Rubrique",
                        label: "Mutuelle",
                        description: "Type de la rubrique",
                        value: "Mutuelle",
                        createdBy: "system"
                    }

                })
                await prisma.default_Setting.upsert({
                    where: {
                        id_label: {
                            id: "Type_Champ_Rubrique",
                            label: "Element de la fiche salarié"
                        }
                    },
                    update: {},
                    create: {
                        id: "Type_Champ_Rubrique",
                        label: "Element de la fiche salarié",
                        description: "Type de champ de la rubrique",
                        value: "Element de la fiche salarié",
                        createdBy: "system"
                    }

                })
                await prisma.default_Setting.upsert({
                    where: {
                        id_label: {
                            id: "Type_Champ_Rubrique",
                            label: "Element à saisir"
                        }
                    },
                    update: {},
                    create: {
                        id: "Type_Champ_Rubrique",
                        label: "Element à saisir",
                        description: "Type de champ de la rubrique",
                        value: "Element à saisir",
                        createdBy: "system"
                    }

                })
                await prisma.default_Setting.upsert({
                    where: {
                        id_label: {
                            id: "Type_Champ_Rubrique",
                            label: "Formule"
                        }
                    },
                    update: {},
                    create: {
                        id: "Type_Champ_Rubrique",
                        label: "Formule",
                        description: "Type de champ de la rubrique",
                        value: "Formule",
                        createdBy: "system"
                    }

                })
                await prisma.default_Setting.upsert({
                    where: {
                        id_label: {
                            id: "Type_Champ_Rubrique",
                            label: "Constante"
                        }
                    },
                    update: {},
                    create: {
                        id: "Type_Champ_Rubrique",
                        label: "Constante",
                        description: "Type de champ de la rubrique",
                        value: "Constante",
                        createdBy: "system"
                    }

                })
                await prisma.default_Setting.upsert({
                    where: {
                        id_label: {
                            id: "Type_Champ_Rubrique",
                            label: "Table"
                        }
                    },
                    update: {},
                    create: {
                        id: "Type_Champ_Rubrique",
                        label: "Table",
                        description: "Type de champ de la rubrique",
                        value: "Table",
                        createdBy: "system"
                    }

                })
                await prisma.default_Setting.upsert({
                    where: {
                        id_label: {
                            id: "Type_Champ_Rubrique",
                            label: "Base rubrique"
                        }
                    },
                    update: {},
                    create: {
                        id: "Type_Champ_Rubrique",
                        label: "Base rubrique",
                        description: "Type de champ de la rubrique",
                        value: "Table",
                        createdBy: "system"
                    }

                })
                await prisma.default_Setting.upsert({
                    where: {
                        id_label: {
                            id: "Type_Champ_Rubrique",
                            label: "Taux rubrique"
                        }
                    },
                    update: {},
                    create: {
                        id: "Type_Champ_Rubrique",
                        label: "Taux rubrique",
                        description: "Type de champ de la rubrique",
                        value: "Table",
                        createdBy: "system"
                    }

                })
                await prisma.default_Setting.upsert({
                    where: {
                        id_label: {
                            id: "Type_Champ_Rubrique",
                            label: "Montant rubrique"
                        }
                    },
                    update: {},
                    create: {
                        id: "Type_Champ_Rubrique",
                        label: "Montant rubrique",
                        description: "Type de champ de la rubrique",
                        value: "Table",
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

export const defaultSettingV0001 = new DefaultSettingV0001("DEFAULT_SETTING_V0001", "Paramétrage par default d'un nouveau logiciel", 27, "INPUT_V0001")

