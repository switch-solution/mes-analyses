//source : https://travail-emploi.gouv.fr/droit-du-travail/les-absences-pour-maladie-et-conges-pour-evenements-familiaux/article/l-indemnisation-legale-des-absences-pour-maladie-ou-accident
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

class LegalV0002 extends Seed {
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
                await prisma.table_Keeping_Wage.create({
                    data: {
                        label: "Maintien maladie du droit du travail",
                        dateStart: new Date("2024-01-01"),
                        idcc: "9999",
                        type: "Maladie",
                        slug: "9999_Maintien_Maladie",
                        id: "STD_MAINTIEN_MALADIE_DROIT_TRAVAIL",
                        url: " https://travail-emploi.gouv.fr/droit-du-travail/les-absences-pour-maladie-et-conges-pour-evenements-familiaux/article/l-indemnisation-legale-des-absences-pour-maladie-ou-accident",
                        Table_Keeping_Wage_Row: {
                            create: [
                                {
                                    minMonth: 0,
                                    maxMonth: 11,
                                    pourcentage: 0,
                                    label: "Moins de 1 an",
                                    id: "STD_001",
                                    numberOfDay: 99999,
                                    deficiency: 0,
                                    slug: "Maintien_du_droit_du_travail_row_1",
                                },
                                {
                                    minMonth: 12,
                                    maxMonth: 59,
                                    label: "De 1 à 5 ans",
                                    deficiency: 0,
                                    pourcentage: 90,
                                    id: "STD_002",
                                    numberOfDay: 30,
                                    slug: "Maintien_du_droit_du_travail_row_2",
                                },
                                {
                                    minMonth: 12,
                                    maxMonth: 59,
                                    label: "De 1 à 5 ans",
                                    deficiency: 0,
                                    pourcentage: 66,
                                    id: "STD_003",
                                    numberOfDay: 30,
                                    slug: "Maintien_du_droit_du_travail_row_3",
                                },
                                {
                                    minMonth: 60,
                                    maxMonth: 131,
                                    deficiency: 0,
                                    label: "De 5 à 11 ans",
                                    pourcentage: 90,
                                    id: "STD_004",
                                    numberOfDay: 40,
                                    slug: "Maintien_du_droit_du_travail_row_4",
                                },
                                {
                                    minMonth: 60,
                                    maxMonth: 131,
                                    deficiency: 0,
                                    label: "De 5 à 11 ans",
                                    pourcentage: 66,
                                    id: "STD_005",
                                    numberOfDay: 40,
                                    slug: "Maintien_du_droit_du_travail_row_5",
                                },
                                {
                                    minMonth: 132,
                                    maxMonth: 191,
                                    deficiency: 0,
                                    label: "De 11 à 15 ans",
                                    pourcentage: 90,
                                    id: "STD_006",
                                    numberOfDay: 50,
                                    slug: "Maintien_du_droit_du_travail_row_6",
                                },
                                {
                                    minMonth: 132,
                                    maxMonth: 191,
                                    deficiency: 0,
                                    label: "De 11 à 15 ans",
                                    pourcentage: 66,
                                    id: "STD_007",
                                    numberOfDay: 50,
                                    slug: "Maintien_du_droit_du_travail_row_7",
                                },
                                {
                                    minMonth: 192,
                                    maxMonth: 251,
                                    deficiency: 0,
                                    label: "De 16 à 20 ans",
                                    pourcentage: 90,
                                    id: "STD_008",
                                    numberOfDay: 60,
                                    slug: "Maintien_du_droit_du_travail_row_8",
                                },
                                {
                                    minMonth: 192,
                                    maxMonth: 251,
                                    deficiency: 0,
                                    label: "De 16 à 20 ans",
                                    pourcentage: 66,
                                    id: "STD_009",
                                    numberOfDay: 60,
                                    slug: "Maintien_du_droit_du_travail_row_9",
                                },
                                {
                                    minMonth: 252,
                                    maxMonth: 311,
                                    deficiency: 0,
                                    label: "De 22 à 25 ans",
                                    pourcentage: 90,
                                    id: "STD_010",
                                    numberOfDay: 70,
                                    slug: "Maintien_du_droit_du_travail_row_10",
                                },
                                {
                                    minMonth: 252,
                                    maxMonth: 311,
                                    deficiency: 0,
                                    label: "De 22 à 25 ans",
                                    pourcentage: 66,
                                    id: "STD_011",
                                    numberOfDay: 70,
                                    slug: "Maintien_du_droit_du_travail_row_11",
                                },
                                {
                                    minMonth: 312,
                                    maxMonth: 371,
                                    deficiency: 0,
                                    label: "De 26 à 30 ans",
                                    pourcentage: 90,
                                    id: "STD_012",
                                    numberOfDay: 80,
                                    slug: "Maintien_du_droit_du_travail_row_12",
                                },
                                {
                                    minMonth: 312,
                                    maxMonth: 371,
                                    deficiency: 0,
                                    label: "De 26 à 30 ans",
                                    pourcentage: 66,
                                    id: "STD_013",
                                    numberOfDay: 80,
                                    slug: "Maintien_du_droit_du_travail_row_13",
                                },
                                {
                                    minMonth: 372,
                                    maxMonth: 999,
                                    deficiency: 0,
                                    label: "A partir de 31 ans",
                                    pourcentage: 90,
                                    id: "STD_014",
                                    numberOfDay: 90,
                                    slug: "Maintien_du_droit_du_travail_row_14",
                                },
                                {
                                    minMonth: 372,
                                    maxMonth: 999,
                                    deficiency: 0,
                                    label: "A partir de 31 ans",
                                    pourcentage: 66,
                                    id: "STD_015",
                                    numberOfDay: 90,
                                    slug: "Maintien_du_droit_du_travail_row_15",
                                },


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

export const legalV0002Seed = new LegalV0002("LEGAL_V0002", "Création maintien droit du travail", 8, "LEGAL_V0001")

