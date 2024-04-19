//source :https://www.syntec.fr/convention-collective/deplacements-et-changement-de-residence-en-france-metropolitaine-corse-comprise/#article-9-2
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

class LegalV0003 extends Seed {
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
                        label: "Maintien maladie ETAM SYNTEC",
                        dateStart: new Date("2024-01-01"),
                        idcc: "1486",
                        type: "Maladie",
                        slug: "1496_Maintien_Maladie_ETAM",
                        id: "STD_MAINTIEN_MALADIE_SYNTEC_ETAM",
                        url: "https://www.syntec.fr/convention-collective/deplacements-et-changement-de-residence-en-france-metropolitaine-corse-comprise/#article-9-2",
                        Table_Keeping_Wage_Row: {
                            create: [
                                {
                                    minMonth: 0,
                                    maxMonth: 11,
                                    pourcentage: 0,
                                    label: "Moins de 1 an",
                                    id: "STD_016",
                                    numberOfDay: 99999,
                                    deficiency: 0,
                                    slug: "1496_Maintien_Maladie_ETAM_row_1",

                                },
                                {
                                    minMonth: 12,
                                    maxMonth: 59,
                                    label: "De 1 à 5 ans",
                                    deficiency: 0,
                                    pourcentage: 100,
                                    id: "STD_017",
                                    numberOfDay: 30,
                                    slug: "1496_Maintien_Maladie_ETAM_row_2",
                                },
                                {
                                    minMonth: 12,
                                    maxMonth: 59,
                                    label: "De 1 à 5 ans",
                                    deficiency: 0,
                                    pourcentage: 80,
                                    id: "STD_018",
                                    numberOfDay: 60,
                                    slug: "1496_Maintien_Maladie_ETAM_row_3",
                                },
                                {
                                    minMonth: 60,
                                    maxMonth: 9999,
                                    label: "A partir de 5 ans",
                                    deficiency: 0,
                                    pourcentage: 100,
                                    id: "STD_019",
                                    numberOfDay: 60,
                                    slug: "1496_Maintien_Maladie_ETAM_row_4",
                                },
                                {
                                    minMonth: 60,
                                    maxMonth: 9999,
                                    label: "A partir de 5 ans",
                                    deficiency: 0,
                                    pourcentage: 80,
                                    id: "STD_020",
                                    numberOfDay: 30,
                                    slug: "1496_Maintien_Maladie_ETAM_row_5",
                                },


                            ]
                        }
                    }
                })

                await prisma.table_Keeping_Wage.create({
                    data: {
                        label: "Maintien maladie ingénieurs et cadres SYNTEC",
                        dateStart: new Date("2024-01-01"),
                        idcc: "1486",
                        type: "Maladie",
                        slug: "1496_Maintien_Maladie_Ingenieurs_Cadres",
                        id: "STD_MAINTIEN_MALADIE_SYNTEC_INGENIEURS_CADRES",
                        Table_Keeping_Wage_Row: {
                            create: [
                                {
                                    minMonth: 0,
                                    maxMonth: 11,
                                    pourcentage: 0,
                                    label: "Moins de 1 an",
                                    id: "STD_016",
                                    numberOfDay: 99999,
                                    deficiency: 0,
                                    slug: "1496_Maintien_Maladie_Ingenieurs_Cadres_row_1",

                                },
                                {
                                    minMonth: 12,
                                    maxMonth: 9999,
                                    label: "A partir de 1 an",
                                    deficiency: 0,
                                    pourcentage: 100,
                                    id: "STD_017",
                                    numberOfDay: 90,
                                    slug: "1496_Maintien_Maladie_Ingenieurs_Cadres_row_2",
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

export const legalV0003Seed = new LegalV0003("LegalV0003", "Création convention collective maintien maladie", 35, "LegalV0002")

