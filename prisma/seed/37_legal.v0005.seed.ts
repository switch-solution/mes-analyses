//source :https://www.syntec.fr/wp-content/uploads/2022/11/2022-09-29-avenant-n-2-a-avenant-47-smh-signe.pdf
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

class LegalV0004 extends Seed {
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
                await prisma.table_Wage.create({
                    data: {
                        id: "STD_SALAIRE_ETAM_SYNTEC",
                        idcc: "1486",
                        dateStart: new Date("2022-09-29"),
                        label: "Salaires minima ETAM Syntec",
                        slug: "1486_STD_SALAIRE_ETAM_SYNTEC",
                        extended: true,
                        url: "https://www.syntec.fr/wp-content/uploads/2022/11/2022-09-29-avenant-n-2-a-avenant-47-smh-signe.pdf",
                        Table_Wage_Row: {
                            create: [
                                {
                                    id: "STD_001",
                                    label: "Position 1.1 coefficient 240",
                                    coefficient: "240",
                                    position: "1.1",
                                    value: "1715",
                                    slug: "1486_Salaire_minima_240_position_1.1"
                                },
                                {
                                    id: "STD_002",
                                    label: "Position 1.2 coefficient 250",
                                    coefficient: "250",
                                    position: "1.2",
                                    value: "1745",
                                    slug: "1486_Salaire_minima_250_position_1.2"
                                },
                                {
                                    id: "STD_003",
                                    label: "Position 2.1 coefficient 275",
                                    coefficient: "275",
                                    position: "2.1",
                                    value: "1775",
                                    slug: "1486_Salaire_minima_275_position_2.1"
                                },
                                {
                                    id: "STD_004",
                                    label: "Position 2.2 coefficient 310",
                                    coefficient: "310",
                                    position: "2.2",
                                    value: "1831",
                                    slug: "1486_Salaire_minima_310_position_2.2"
                                },
                                {
                                    id: "STD_005",
                                    label: "Position 2.3 coefficient 355",
                                    coefficient: "355",
                                    position: "2.3",
                                    value: "1971",
                                    slug: "1486_Salaire_minima_355_position_2.3"
                                },
                                {
                                    id: "STD_006",
                                    label: "Position 3.1 coefficient 400",
                                    coefficient: "400",
                                    position: "3.1",
                                    value: "2111",
                                    slug: "1486_Salaire_minima_400_position_3.1"
                                },
                                {
                                    id: "STD_007",
                                    label: "Position 3.2 coefficient 450",
                                    coefficient: "450",
                                    position: "3.2",
                                    value: "2266",
                                    slug: "1486_Salaire_minima_450_position_3.2"
                                },
                                {
                                    id: "STD_008",
                                    label: "Position 3.3 coefficient 500",
                                    coefficient: "450",
                                    position: "3.3",
                                    value: "2415",
                                    slug: "1486_Salaire_minima_500_position_3.3"
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

export const legalV0005Seed = new LegalV0004("LegalV0005", "Syntec salaires", 37, "LegalV0004")

