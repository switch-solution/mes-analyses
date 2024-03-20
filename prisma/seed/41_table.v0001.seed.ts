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

class TableV0001 extends Seed {
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
                            id: "TABLE_TYPE",
                            label: "Table des maintiens",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {},
                    create: {
                        id: "TABLE_TYPE",
                        label: "Table des maintiens",
                        value: "Maintien des salaires",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        createdBy: "system",
                        description: "Type de table pour le maintien des salaires"
                    }

                })
                await prisma.setting.upsert({
                    where: {
                        id_label_dateStart_dateEnd: {
                            id: "TABLE_TYPE",
                            label: "Table des apprentis",
                            dateStart: new Date("2024-01-01"),
                            dateEnd: new Date("4000-01-01")
                        }
                    },
                    update: {},
                    create: {
                        id: "TABLE_TYPE",
                        label: "Table des apprentis",
                        value: "Pourcentage rémunération des apprentis",
                        dateStart: new Date("2024-01-01"),
                        dateEnd: new Date("4000-01-01"),
                        createdBy: "system",
                        description: "Table de pourcentage de rémunération des apprentis"
                    }

                })
                await prisma.table.upsert({
                    where: {
                        id: "STD_MAINTIEN_0001"
                    },
                    update: {},
                    create: {
                        id: "STD_MAINTIEN_0001",
                        label: "Maintien légal maladie",
                        description: "Table de maintien légal de la maladie",
                        type: "Maintien des salaires",
                        idcc: "9999",
                        Table_Column: {
                            create:
                                [
                                    {
                                        id: "STD_COLONNE_0001",
                                        label: "Debut ancienneté en mois",
                                        Table_Column_Value: {
                                            create: [
                                                {
                                                    id: "STD_COLONNE_0001_ROW_1",
                                                    value: "0",
                                                    row: 1,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_2",
                                                    value: "12",
                                                    row: 2,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_3",
                                                    value: "12",
                                                    row: 3,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_4",
                                                    value: "72",
                                                    row: 4
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_5",
                                                    value: "72",
                                                    row: 5
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_6",
                                                    value: "108",
                                                    row: 6,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_7",
                                                    value: "108",
                                                    row: 7,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_8",
                                                    value: "192",
                                                    row: 8,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_9",
                                                    value: "192",
                                                    row: 9,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_10",
                                                    value: "252",
                                                    row: 10,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_11",
                                                    value: "252",
                                                    row: 11,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_12",
                                                    value: "312",
                                                    row: 12,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_13",
                                                    value: "312",
                                                    row: 13,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_14",
                                                    value: "372",
                                                    row: 14,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_15",
                                                    value: "372",
                                                    row: 15,
                                                },

                                            ]
                                        }

                                    },
                                    {
                                        id: "STD_COLONNE_0002",
                                        label: "Fin ancienneté en mois",
                                        Table_Column_Value: {
                                            create: [
                                                {
                                                    id: "STD_COLONNE_0001_ROW_1",
                                                    value: "12",
                                                    row: 1,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_2",
                                                    value: "72",
                                                    row: 2,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_3",
                                                    value: "72",
                                                    row: 3,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_4",
                                                    value: "108",
                                                    row: 4
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_5",
                                                    value: "108",
                                                    row: 5
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_6",
                                                    value: "192",
                                                    row: 6,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_7",
                                                    value: "192",
                                                    row: 7,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_8",
                                                    value: "252",
                                                    row: 8,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_9",
                                                    value: "252",
                                                    row: 9,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_10",
                                                    value: "312",
                                                    row: 10,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_11",
                                                    value: "312",
                                                    row: 11,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_12",
                                                    value: "372",
                                                    row: 12,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_13",
                                                    value: "372",
                                                    row: 13,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_14",
                                                    value: "9999",
                                                    row: 14,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_15",
                                                    value: "9999",
                                                    row: 15,
                                                },

                                            ]
                                        }
                                    },
                                    {
                                        id: "STD_COLONNE_0003",
                                        label: "carence en jours",
                                        Table_Column_Value: {
                                            create: [
                                                {
                                                    id: "STD_COLONNE_0001_ROW_1",
                                                    value: "0",
                                                    row: 1,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_2",
                                                    value: "0",
                                                    row: 2,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_3",
                                                    value: "7",
                                                    row: 3,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_4",
                                                    value: "7",
                                                    row: 4
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_5",
                                                    value: "0",
                                                    row: 5
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_6",
                                                    value: "0",
                                                    row: 6,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_7",
                                                    value: "0",
                                                    row: 7,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_8",
                                                    value: "0",
                                                    row: 8,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_9",
                                                    value: "0",
                                                    row: 9,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_10",
                                                    value: "0",
                                                    row: 10,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_11",
                                                    value: "0",
                                                    row: 11,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_12",
                                                    value: "0",
                                                    row: 12,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_13",
                                                    value: "0",
                                                    row: 13,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_14",
                                                    value: "0",
                                                    row: 14,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_15",
                                                    value: "9999",
                                                    row: 15,
                                                },

                                            ]
                                        }
                                    },
                                    {
                                        id: "STD_COLONNE_0004",
                                        label: "Taux de maintien",
                                        Table_Column_Value: {
                                            create: [
                                                {
                                                    id: "STD_COLONNE_0001_ROW_1",
                                                    value: "0",
                                                    row: 1,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_2",
                                                    value: "90",
                                                    row: 2,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_3",
                                                    value: "66",
                                                    row: 3,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_4",
                                                    value: "90",
                                                    row: 4
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_5",
                                                    value: "66",
                                                    row: 5
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_6",
                                                    value: "90",
                                                    row: 6,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_7",
                                                    value: "66",
                                                    row: 7,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_8",
                                                    value: "90",
                                                    row: 8,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_9",
                                                    value: "66",
                                                    row: 9,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_10",
                                                    value: "90",
                                                    row: 10,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_11",
                                                    value: "66",
                                                    row: 11,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_12",
                                                    value: "90",
                                                    row: 12,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_13",
                                                    value: "66",
                                                    row: 13,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_14",
                                                    value: "90",
                                                    row: 14,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_15",
                                                    value: "66",
                                                    row: 15,
                                                },

                                            ]
                                        }
                                    },
                                    {
                                        id: "STD_COLONNE_0005",
                                        label: "Durée indemnisation en jours",
                                        Table_Column_Value: {
                                            create: [
                                                {
                                                    id: "STD_COLONNE_0001_ROW_1",
                                                    value: "0",
                                                    row: 1,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_2",
                                                    value: "30",
                                                    row: 2,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_3",
                                                    value: "30",
                                                    row: 3,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_4",
                                                    value: "40",
                                                    row: 4
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_5",
                                                    value: "40",
                                                    row: 5
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_6",
                                                    value: "50",
                                                    row: 6,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_7",
                                                    value: "50",
                                                    row: 7,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_8",
                                                    value: "60",
                                                    row: 8,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_9",
                                                    value: "60",
                                                    row: 9,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_10",
                                                    value: "70",
                                                    row: 10,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_11",
                                                    value: "70",
                                                    row: 11,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_12",
                                                    value: "80",
                                                    row: 12,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_13",
                                                    value: "80",
                                                    row: 13,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_14",
                                                    value: "90",
                                                    row: 14,
                                                },
                                                {
                                                    id: "STD_COLONNE_0001_ROW_15",
                                                    value: "90",
                                                    row: 15,
                                                },

                                            ]

                                        }
                                    }
                                ]


                        }
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

export const tableV0001 = new TableV0001("TABLEA_V0001", "Création de la table maintien maladie droit du travail", 41, "ACCUMULATION_V0001")

